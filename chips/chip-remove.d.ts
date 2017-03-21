import { Renderer, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MdChip } from './chip';
import { Subscription } from 'rxjs';
/**
 * Applies proper (click) support and adds styling for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     <md-chip>
 *       <md-icon mdChipRemove>clear</md-icon>
 *     </md-chip>
 *
 * You *may* use a custom icon, but you may need to override the `md-chip-remove` positioning styles
 * to properly center the icon within the chip.
 */
export declare class MdChipRemove implements OnInit, OnDestroy {
    protected _renderer: Renderer;
    protected _elementRef: ElementRef;
    protected _parentChip: MdChip;
    /** Whether or not the remove icon is visible. */
    _isVisible: boolean;
    /** Subscription for our onRemoveChange Observable */
    _onRemoveChangeSubscription: Subscription;
    constructor(_renderer: Renderer, _elementRef: ElementRef, _parentChip: MdChip);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Calls the parent chip's public `remove()` method if applicable. */
    _handleClick(event: Event): void;
    /** Informs the parent chip whether or not it contains a remove icon. */
    _updateParent(isRemovable: boolean): void;
}
