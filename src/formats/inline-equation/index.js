import 'mathlive/fonts.css';

import { RichTextToolbarButton } from '@wordpress/block-editor';
import { useCallback, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { math } from '@wordpress/icons';
import {
	getActiveObject,
	insertObject,
	registerFormatType,
	remove,
} from '@wordpress/rich-text';

import EquationPopover from '../../components/EquationPopover';
import {
	INLINE_CLASS,
	INLINE_FORMAT_NAME,
	LATEX_DATA_ATTRIBUTE,
} from '../../constants';
import { getMathMLInnerHTML } from '../../utils/mathml';

/**
 * Builds the rich-text format object inserted into the content for an equation.
 *
 * @param {string} latex  LaTeX source of the equation.
 * @param {string} mathML Serialized MathML for the equation.
 * @return {Object} A rich-text format object of type {@link INLINE_FORMAT_NAME}.
 */
const createInlineEquationFormat = ( latex, mathML ) => ( {
	type: INLINE_FORMAT_NAME,
	attributes: {
		latex,
		display: 'inline',
	},
	innerHTML: getMathMLInnerHTML( mathML ),
} );

/**
 * Toolbar control for inserting and editing inline equations.
 *
 * Renders the toolbar button and, while editing, the equation popover. Popover
 * state captures the selection range and the equation object (if any) being
 * edited so the change can be applied back to the exact same range.
 *
 * @param {Object}   props            Format edit props supplied by WordPress.
 * @param {Object}   props.contentRef Ref to the editable content element (popover anchor).
 * @param {Object}   props.value      Current rich-text value.
 * @param {Function} props.onChange   Commits an updated rich-text value.
 * @return {Element} The toolbar button and optional popover.
 */
function InlineEquationEdit( { contentRef, value, onChange } ) {
	// { start, end, object }: the selection range to write back to, plus the
	// equation object being edited (null when inserting a new equation).
	const [ popoverState, setPopoverState ] = useState( null );

	const activeObject = getActiveObject( value );
	const selectedEquation =
		activeObject?.type === INLINE_FORMAT_NAME ? activeObject : null;
	const isEditing = Boolean( popoverState?.object );

	const anchor = contentRef?.current;

	const openPopover = useCallback( () => {
		const object = getActiveObject( value );

		setPopoverState( {
			start: value.start,
			end: value.end,
			object: object?.type === INLINE_FORMAT_NAME ? object : null,
		} );
	}, [ value ] );

	const closePopover = useCallback( () => {
		setPopoverState( null );
	}, [] );

	const applyEquation = useCallback(
		( { latex, mathML } ) => {
			// Write the equation back to the range captured when the popover opened.
			const start = popoverState?.start;
			const end = popoverState?.end;

			onChange(
				insertObject(
					value,
					createInlineEquationFormat( latex, mathML ),
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

		// Only remove when an actual range was captured, otherwise this is a no-op.
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
				label={ __( 'Equation', 'glyphwell' ) }
				onClick={ openPopover }
				title={ __( 'Equation', 'glyphwell' ) }
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

registerFormatType( INLINE_FORMAT_NAME, {
	title: __( 'Equation', 'glyphwell' ),
	tagName: 'math',
	className: INLINE_CLASS,
	contentEditable: false,
	attributes: {
		latex: LATEX_DATA_ATTRIBUTE,
		display: 'display',
	},
	edit: InlineEquationEdit,
} );
