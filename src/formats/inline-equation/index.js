import './editor.scss';
import 'mathlive/fonts.css';

import { RichTextToolbarButton } from '@wordpress/block-editor';
import { useCallback, useMemo, useState } from '@wordpress/element';
import { math } from '@wordpress/icons';
import {
	getActiveObject,
	insertObject,
	registerFormatType,
	remove,
} from '@wordpress/rich-text';

import EquationPopover from '../../components/EquationPopover';

const FORMAT_NAME = 'equation-editor/inline-equation';

const getMathMLInnerHTML = ( mathML ) => {
	if ( ! mathML || typeof window === 'undefined' ) {
		return mathML || '';
	}

	const template = window.document.createElement( 'template' );
	template.innerHTML = mathML.trim();

	const mathElement = template.content.querySelector( 'math' );

	return mathElement ? mathElement.innerHTML : mathML;
};

const createEquationObject = ( latex, mathML ) => ( {
	type: FORMAT_NAME,
	attributes: {
		latex,
		display: 'inline',
	},
	innerHTML: getMathMLInnerHTML( mathML ),
} );

function InlineEquationEdit( { contentRef, value, onChange } ) {
	const [ popoverState, setPopoverState ] = useState( null );

	const activeObject = getActiveObject( value );
	const selectedEquation =
		activeObject?.type === FORMAT_NAME ? activeObject : null;
	const isEditing = Boolean( popoverState?.object );

	const anchor = contentRef?.current;

	const openPopover = useCallback( () => {
		const object = getActiveObject( value );

		setPopoverState( {
			start: value.start,
			end: value.end,
			object: object?.type === FORMAT_NAME ? object : null,
		} );
	}, [ value ] );

	const closePopover = useCallback( () => {
		setPopoverState( null );
	}, [] );

	const applyEquation = useCallback(
		( { latex, mathML } ) => {
			const start = popoverState?.start;
			const end = popoverState?.end;

			onChange(
				insertObject(
					value,
					createEquationObject( latex, mathML ),
					start,
					end
				)
			);

			closePopover();
		},
		[ closePopover, onChange, popoverState, value ]
	);

	const removeEquation = useCallback( () => {
		const start = popoverState?.start;
		const end = popoverState?.end;

		if ( start !== undefined && end !== undefined ) {
			onChange( remove( value, start, end ) );
		}

		closePopover();
	}, [ closePopover, onChange, popoverState, value ] );

	const initialValues = useMemo( () => {
		const object = popoverState?.object;

		return {
			latex: object?.attributes?.latex || '',
			mathML: object?.innerHTML || '',
		};
	}, [ popoverState ] );

	return (
		<>
			<RichTextToolbarButton
				icon={ math }
				isPressed={ Boolean( selectedEquation ) }
				label="Equation"
				onClick={ openPopover }
				title="Equation"
			/>

			{ popoverState && (
				<EquationPopover
					anchor={ anchor }
					initialLatex={ initialValues.latex }
					initialMathML={ initialValues.mathML }
					isEditing={ isEditing }
					onApply={ applyEquation }
					onClose={ closePopover }
					onRemove={ removeEquation }
				/>
			) }
		</>
	);
}

registerFormatType( FORMAT_NAME, {
	title: 'Equation',
	tagName: 'math',
	className: 'equation-editor-inline',
	contentEditable: false,
	attributes: {
		latex: 'data-equation-editor-latex',
		display: 'display',
	},
	edit: InlineEquationEdit,
} );
