import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from '@wordpress/element';
import { MathfieldElement } from 'mathlive';

const getMathML = ( mathfield ) => {
	try {
		return mathfield.getValue( 'math-ml' ) || '';
	} catch {
		return '';
	}
};

const getStyleSheetText = ( styleSheet ) => {
	try {
		return Array.from( styleSheet.cssRules )
			.map( ( rule ) => rule.cssText )
			.join( '\n' );
	} catch {
		return '';
	}
};

const getShadowStyleTexts = ( mathfield ) => {
	const shadowRoot = mathfield.shadowRoot;

	if ( ! shadowRoot || ! shadowRoot.adoptedStyleSheets ) {
		return [];
	}

	return Array.from( shadowRoot.adoptedStyleSheets )
		.map( getStyleSheetText )
		.filter( Boolean );
};

const restoreShadowStylesForDocument = (
	mathfield,
	ownerDocument,
	styleTexts
) => {
	const shadowRoot = mathfield.shadowRoot;

	if ( ! shadowRoot || ! styleTexts.length ) {
		return;
	}

	const ownerWindow = ownerDocument.defaultView;

	if ( ownerWindow?.CSSStyleSheet && 'adoptedStyleSheets' in shadowRoot ) {
		try {
			shadowRoot.adoptedStyleSheets = styleTexts.map( ( cssText ) => {
				const styleSheet = new ownerWindow.CSSStyleSheet();
				styleSheet.replaceSync( cssText );

				return styleSheet;
			} );

			return;
		} catch {
			// Fall back to style tags below.
		}
	}

	styleTexts.forEach( ( cssText ) => {
		const style = ownerDocument.createElement( 'style' );
		style.textContent = cssText;
		shadowRoot.prepend( style );
	} );
};

function MathFieldControl(
	{ className = '', latex = '', onLatexChange, onMathMLChange },
	ref
) {
	const callbacksRef = useRef( { onLatexChange, onMathMLChange } );
	const containerRef = useRef( null );
	const initialLatexRef = useRef( latex || '' );
	const lastLatexRef = useRef( latex || '' );
	const mathfieldRef = useRef( null );

	useEffect( () => {
		callbacksRef.current = { onLatexChange, onMathMLChange };
	}, [ onLatexChange, onMathMLChange ] );

	const emitCurrentValue = useCallback( ( mathfield ) => {
		const nextLatex = mathfield.value || '';
		const callbacks = callbacksRef.current;

		lastLatexRef.current = nextLatex;

		if ( typeof callbacks.onLatexChange === 'function' ) {
			callbacks.onLatexChange( nextLatex );
		}

		if ( typeof callbacks.onMathMLChange === 'function' ) {
			callbacks.onMathMLChange( getMathML( mathfield ) );
		}
	}, [] );

	useEffect( () => {
		const container = containerRef.current;

		if ( ! container ) {
			return undefined;
		}

		const ownerDocument = container.ownerDocument;
		const mathfield = new MathfieldElement();

		const shadowStyleTexts = getShadowStyleTexts( mathfield );

		mathfield.setAttribute( 'aria-label', 'Equation editor' );
		mathfield.className = [ 'equation-editor-math-field', className ]
			.filter( Boolean )
			.join( ' ' );

		mathfield.mathVirtualKeyboardPolicy = 'manual';
		mathfield.smartFence = true;
		mathfield.value = initialLatexRef.current;

		mathfieldRef.current = mathfield;
		lastLatexRef.current = initialLatexRef.current;

		container.appendChild( mathfield );

		restoreShadowStylesForDocument(
			mathfield,
			ownerDocument,
			shadowStyleTexts
		);

		if ( typeof callbacksRef.current.onMathMLChange === 'function' ) {
			callbacksRef.current.onMathMLChange( getMathML( mathfield ) );
		}

		const handleInput = () => {
			emitCurrentValue( mathfield );
		};

		mathfield.addEventListener( 'input', handleInput );

		return () => {
			mathfield.removeEventListener( 'input', handleInput );
			mathfield.remove();

			if ( mathfieldRef.current === mathfield ) {
				mathfieldRef.current = null;
			}
		};
	}, [ className, emitCurrentValue ] );

	useEffect( () => {
		const mathfield = mathfieldRef.current;
		const nextLatex = latex || '';

		if ( ! mathfield || nextLatex === lastLatexRef.current ) {
			return;
		}

		mathfield.value = nextLatex;
		lastLatexRef.current = nextLatex;

		if ( typeof callbacksRef.current.onMathMLChange === 'function' ) {
			callbacksRef.current.onMathMLChange( getMathML( mathfield ) );
		}
	}, [ latex ] );

	useImperativeHandle(
		ref,
		() => ( {
			focus() {
				mathfieldRef.current?.focus();
			},
			insertLatex( nextLatex ) {
				const mathfield = mathfieldRef.current;

				if ( ! mathfield ) {
					return;
				}

				mathfield.focus();

				mathfield.insert( nextLatex, {
					insertionMode: 'replaceSelection',
					selectionMode: 'placeholder',
				} );

				emitCurrentValue( mathfield );
				mathfield.focus();
			},
		} ),
		[ emitCurrentValue ]
	);

	return (
		<div
			ref={ containerRef }
			className="equation-editor-math-field-container"
		/>
	);
}

export default forwardRef( MathFieldControl );
