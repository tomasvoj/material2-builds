var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Renderer, ElementRef } from '@angular/core';
import { MdChip } from './chip';
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
export var MdChipRemove = (function () {
    function MdChipRemove(_renderer, _elementRef, _parentChip) {
        var _this = this;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._parentChip = _parentChip;
        /** Whether or not the remove icon is visible. */
        this._isVisible = false;
        if (this._parentChip) {
            this._onRemoveChangeSubscription = this._parentChip.onRemovableChange$
                .subscribe(function (value) {
                _this._updateParent(value);
            });
        }
    }
    MdChipRemove.prototype.ngOnInit = function () {
        this._updateParent(true);
    };
    MdChipRemove.prototype.ngOnDestroy = function () {
        this._updateParent(false);
        this._onRemoveChangeSubscription.unsubscribe();
    };
    /** Calls the parent chip's public `remove()` method if applicable. */
    MdChipRemove.prototype._handleClick = function (event) {
        if (this._parentChip.removable) {
            this._parentChip.remove();
        }
    };
    /** Informs the parent chip whether or not it contains a remove icon. */
    MdChipRemove.prototype._updateParent = function (isRemovable) {
        this._isVisible = isRemovable;
        this._parentChip._setHasRemoveIcon(isRemovable);
    };
    MdChipRemove = __decorate([
        Directive({
            selector: '[md-chip-remove], [mat-chip-remove], [mdChipRemove], [matChipRemove]',
            host: {
                '[class.mat-chip-remove]': 'true',
                '[class.mat-chip-remove-hidden]': '!_isVisible',
                '(click)': '_handleClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef, MdChip])
    ], MdChipRemove);
    return MdChipRemove;
}());
//# sourceMappingURL=chip-remove.js.map