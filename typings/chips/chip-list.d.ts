import { AfterContentInit, ElementRef, QueryList, Renderer } from '@angular/core';
import { MdChip } from './chip';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { Dir } from '../core/rtl/dir';
/**
 * A material design chips component (named ChipList for it's similarity to the List component).
 *
 * Example:
 *
 *     <md-chip-list>
 *       <md-chip>Chip 1<md-chip>
 *       <md-chip>Chip 2<md-chip>
 *     </md-chip-list>
 */
export declare class MdChipList implements AfterContentInit {
    protected _renderer: Renderer;
    protected _elementRef: ElementRef;
    protected _dir: Dir;
    /** When a chip is destroyed, we track the index so we can focus the appropriate next chip. */
    protected _destroyedIndex: number;
    /** Track which chips we're listening to for focus/destruction. */
    protected _subscribed: WeakMap<MdChip, boolean>;
    /** Holds our current input if provided. */
    protected _inputElement: HTMLInputElement;
    /** Whether or not the chip list is currently focusable via keyboard interaction. */
    _tabIndex: number;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager;
    /** The chip components contained within this chip list. */
    chips: QueryList<MdChip>;
    constructor(_renderer: Renderer, _elementRef: ElementRef, _dir: Dir);
    ngAfterContentInit(): void;
    /**
     * Associates an HTML input element with this chip list.
     *
     * @param inputElement The input to associate.
     */
    registerInput(inputElement: HTMLInputElement): void;
    /**
     * Programmatically focus the chip list. This in turn focuses the first non-disabled chip in this
     * chip list, or the input if available and there are 0 chips.
     *
     * TODO: ARIA says this should focus the first `selected` chip if any are selected.
     */
    focus(event?: Event): void;
    /** Attempt to focus an input if we have one. */
    focusInput(): void;
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keydown(event: KeyboardEvent): void;
    /**
     * Iterate through the list of chips and add them to our list of
     * subscribed chips.
     *
     * @param chips The list of chips to be subscribed.
     */
    protected _subscribeChips(chips: QueryList<MdChip>): void;
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    protected _checkTabIndex(): void;
    /**
     * Add a specific chip to our subscribed list. If the chip has
     * already been subscribed, this ensures it is only subscribed
     * once.
     *
     * @param chip The chip to be subscribed (or checked for existing
     * subscription).
     */
    protected _addChip(chip: MdChip): void;
    /**
     * Checks to see if a focus chip was recently destroyed so that we can refocus the next closest
     * one.
     */
    protected _checkDestroyedFocus(): void;
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    private _isValidIndex(index);
    /** Utility to check if an input element has no value. */
    private static _isInputEmpty(element);
}
