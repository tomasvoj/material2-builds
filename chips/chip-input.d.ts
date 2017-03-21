import { EventEmitter, Renderer, ElementRef } from '@angular/core';
export interface MdChipInputEvent {
    input: HTMLInputElement;
    value: string;
}
export declare class MdChipInput {
    protected _renderer: Renderer;
    protected _elementRef: ElementRef;
    /**
     * Whether or not the chipAdded event will be emitted when the input is blurred.
     *
     * Default `false`.
     */
    addOnBlur: boolean;
    /**
     * The list of key codes that will trigger a chipAdded event.
     *
     * Defaults to `[ENTER]`.
     */
    separatorKeys: number[];
    /** Emitted when a chip is to be added. */
    chipAdded: EventEmitter<MdChipInputEvent>;
    /** The native input element to which this directive is attached. */
    protected _inputElement: HTMLInputElement;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * Utility method to make host definition/tests more clear.
     *
     * @private
     */
    _keydown(event?: KeyboardEvent): void;
    /**
     * Checks to see if the blur should emit the (chipAdded) event.
     *
     * @private
     */
    _blur(): void;
    /**
     * Checks to see if the (chipAdded) event needs to be emitted.
     *
     * @private
     */
    _add(event?: KeyboardEvent): void;
}
