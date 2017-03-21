import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Focusable } from '../core/a11y/focus-key-manager';
export interface MdChipEvent {
    chip: MdChip;
}
/**
 * Material design styled Chip component. Used inside the MdChipList component.
 */
export declare class MdChip implements Focusable, OnInit, OnDestroy {
    protected _renderer: Renderer;
    protected _elementRef: ElementRef;
    /** Whether or not the chip is disabled. Disabled chips cannot be focused. */
    protected _disabled: boolean;
    /** Whether or not the chip is selectable. */
    protected _selectable: boolean;
    /** Whether or not the chip is removable. */
    protected _removable: boolean;
    /** Whether or not the chip is selected. */
    protected _selected: boolean;
    /** The palette color of selected chips. */
    protected _color: string;
    /** Whether or not the chip is displaying the remove icon. */
    _hasRemoveIcon: boolean;
    /** Emitted when the removable property changes. */
    private _onRemovableChange;
    onRemovableChange$: Observable<boolean>;
    /** Emitted when the chip is focused. */
    onFocus: EventEmitter<MdChipEvent>;
    /** Emitted when the chip is selected. */
    select: EventEmitter<MdChipEvent>;
    /** Emitted when the chip is deselected. */
    deselect: EventEmitter<MdChipEvent>;
    /** Emitted when the chip is destroyed. */
    destroy: EventEmitter<MdChipEvent>;
    /** Emitted when a chip is to be removed. */
    onRemove: EventEmitter<MdChipEvent>;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Whether or not the chip is disabled. */
    /** Sets the disabled state of the chip. */
    disabled: boolean;
    /** A String representation of the current disabled state. */
    readonly _isAriaDisabled: string;
    /**
     * Whether or not the chips are selectable. When a chip is not selectable,
     * changes to it's selected state are always ignored.
     */
    selectable: boolean;
    /**
     * Determines whether or not the chip displays the remove styling and emits (remove) events.
     */
    removable: boolean;
    /** Whether or not this chip is selected. */
    selected: boolean;
    /** Toggles the current selected state of this chip. */
    toggleSelected(): boolean;
    /** The color of the chip. Can be `primary`, `accent`, or `warn`. */
    color: string;
    /** Allows for programmatic focusing of the chip. */
    focus(): void;
    /**
     * Allows for programmatic removal of the chip. Called by the MdChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Note: This only informs any listeners of the removal request, it does **not** actually remove
     * the chip from the DOM.
     */
    remove(): void;
    /** Ensures events fire properly upon click. */
    _handleClick(event: Event): void;
    /** Handle custom key presses. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Sets whether or not this chip is displaying a remove icon. Adds/removes the
     * `md-chip-has-remove-icon` class.
     */
    _setHasRemoveIcon(value: boolean): void;
    protected _checkDisabled(event: Event): boolean;
    /** Initializes the appropriate CSS classes based on the chip type (basic or standard). */
    private _addDefaultCSSClass();
    /** Updates the private _color variable and the native element. */
    private _updateColor(newColor);
    /** Sets the mat-color on the native element. */
    private _setElementColor(color, isAdd);
}
