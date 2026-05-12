import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from '@wordpress/element';
import { MathfieldElement } from 'mathlive';

import 'mathlive/static.css';
import 'mathlive/fonts.css';

MathfieldElement.fontsDirectory = null;

const getMathML = ( mathfield ) => {
	try {
		return mathfield.getValue( 'math-ml' ) || '';
	} catch {
		return '';
	}
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

		const mathfield = new MathfieldElement();

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

				if ( typeof mathfield.insert === 'function' ) {
					mathfield.insert( nextLatex, {
						insertionMode: 'replaceSelection',
						selectionMode: 'placeholder',
					} );
				} else if ( typeof mathfield.executeCommand === 'function' ) {
					mathfield.executeCommand( [
						'insert',
						nextLatex,
						{
							insertionMode: 'replaceSelection',
							selectionMode: 'placeholder',
						},
					] );
				} else {
					mathfield.value = `${
						mathfield.value || ''
					}${ nextLatex }`;
				}

				emitCurrentValue( mathfield );
				mathfield.focus();
			},
		} ),
		[ emitCurrentValue ]
	);

	return <div ref={ containerRef } />;
}

export default forwardRef( MathFieldControl );
