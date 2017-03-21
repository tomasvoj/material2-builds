var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { MdChip } from './chip';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, UP_ARROW, DOWN_ARROW } from '../core/keyboard/keycodes';
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
export var MdChipList = (function () {
    function MdChipList(_renderer, _elementRef, _dir) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._dir = _dir;
        /** When a chip is destroyed, we track the index so we can focus the appropriate next chip. */
        this._destroyedIndex = null;
        /** Track which chips we're listening to for focus/destruction. */
        this._subscribed = new WeakMap();
        /** Whether or not the chip list is currently focusable via keyboard interaction. */
        this._tabIndex = -1;
    }
    MdChipList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new FocusKeyManager(this.chips).withWrap();
        // Go ahead and subscribe all of the initial chips
        this._subscribeChips(this.chips);
        // Make sure we set our tab index at the start
        this._checkTabIndex();
        // When the list changes, re-subscribe
        this.chips.changes.subscribe(function (chips) {
            _this._subscribeChips(chips);
            // If we have 0 chips, attempt to focus an input (if available)
            if (chips.length == 0) {
                _this.focusInput();
            }
            // Check to see if we need to update our tab index
            _this._checkTabIndex();
            // Check to see if we have a destroyed chip and need to refocus
            _this._checkDestroyedFocus();
        });
    };
    /**
     * Associates an HTML input element with this chip list.
     *
     * @param inputElement The input to associate.
     */
    MdChipList.prototype.registerInput = function (inputElement) {
        this._inputElement = inputElement;
    };
    /**
     * Programmatically focus the chip list. This in turn focuses the first non-disabled chip in this
     * chip list, or the input if available and there are 0 chips.
     *
     * TODO: ARIA says this should focus the first `selected` chip if any are selected.
     */
    MdChipList.prototype.focus = function (event) {
        if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this.focusInput();
        }
    };
    /** Attempt to focus an input if we have one. */
    MdChipList.prototype.focusInput = function () {
        if (this._inputElement) {
            this._inputElement.focus();
        }
    };
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    MdChipList.prototype._keydown = function (event) {
        var code = event.keyCode;
        var target = event.target;
        var isInputEmpty = MdChipList._isInputEmpty(target);
        var isRtl = this._dir.value == 'rtl';
        var isPrevKey = (code == (isRtl ? RIGHT_ARROW : LEFT_ARROW));
        var isNextKey = (code == (isRtl ? LEFT_ARROW : RIGHT_ARROW));
        var isBackKey = (code == BACKSPACE || code == DELETE || code == UP_ARROW || isPrevKey);
        var isForwardKey = (code == DOWN_ARROW || isNextKey);
        // If they are on an empty input and hit backspace/delete/left arrow, focus the last chip
        if (isInputEmpty && isBackKey) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
            return;
        }
        // If they are on an empty input and hit the right arrow, wrap focus to the first chip
        if (isInputEmpty && isForwardKey) {
            this._keyManager.setFirstItemActive();
            event.preventDefault();
            return;
        }
        // If they are on a chip, check for space/left/right, otherwise pass to our key manager (like
        // up/down keys)
        if (target && target.classList.contains('mat-chip')) {
            if (isPrevKey) {
                this._keyManager.setPreviousItemActive();
                event.preventDefault();
            }
            else if (isNextKey) {
                this._keyManager.setNextItemActive();
                event.preventDefault();
            }
            else {
                this._keyManager.onKeydown(event);
            }
        }
    };
    /**
     * Iterate through the list of chips and add them to our list of
     * subscribed chips.
     *
     * @param chips The list of chips to be subscribed.
     */
    MdChipList.prototype._subscribeChips = function (chips) {
        var _this = this;
        chips.forEach(function (chip) { return _this._addChip(chip); });
    };
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    MdChipList.prototype._checkTabIndex = function () {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = (this.chips.length == 0 ? -1 : 0);
    };
    /**
     * Add a specific chip to our subscribed list. If the chip has
     * already been subscribed, this ensures it is only subscribed
     * once.
     *
     * @param chip The chip to be subscribed (or checked for existing
     * subscription).
     */
    MdChipList.prototype._addChip = function (chip) {
        var _this = this;
        // If we've already been subscribed to a parent, do nothing
        if (this._subscribed.has(chip)) {
            return;
        }
        // Watch for focus events outside of the keyboard navigation
        chip.onFocus.subscribe(function () {
            var chipIndex = _this.chips.toArray().indexOf(chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveItemIndex(chipIndex);
            }
        });
        // On destroy, remove the item from our list, and setup our destroyed focus check
        chip.destroy.subscribe(function () {
            var chipIndex = _this.chips.toArray().indexOf(chip);
            if (_this._isValidIndex(chipIndex) && _this._keyManager.activeItemIndex == chipIndex) {
                _this._destroyedIndex = chipIndex;
            }
            _this._subscribed.delete(chip);
            chip.destroy.unsubscribe();
        });
        this._subscribed.set(chip, true);
    };
    /**
     * Checks to see if a focus chip was recently destroyed so that we can refocus the next closest
     * one.
     */
    MdChipList.prototype._checkDestroyedFocus = function () {
        var chipsArray = this.chips.toArray();
        var focusChip;
        if (this._destroyedIndex != null && chipsArray.length > 0) {
            // Check whether the destroyed chip was the last item
            if (this._destroyedIndex >= chipsArray.length) {
                this._keyManager.setActiveItem(chipsArray.length - 1);
            }
            else if (this._destroyedIndex >= 0) {
                this._keyManager.setActiveItem(this._destroyedIndex);
            }
            // Focus the chip
            if (focusChip) {
                focusChip.focus();
            }
        }
        // Reset our destroyed index
        this._destroyedIndex = null;
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    MdChipList.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.chips.length;
    };
    /** Utility to check if an input element has no value. */
    MdChipList._isInputEmpty = function (element) {
        if (element && element.nodeName.toLowerCase() == 'input') {
            var input = element;
            return input.value == '' || input.value == null;
        }
        return false;
    };
    MdChipList = __decorate([
        Component({selector: 'md-chip-list, mat-chip-list',
            template: "<div class=\"mat-chip-list-wrapper\"><ng-content></ng-content></div>",
            host: {
                'role': 'listbox',
                '[class.mat-chip-list]': 'true',
                '[attr.tabindex]': '_tabIndex',
                '(focus)': 'focus($event)',
                '(keydown)': '_keydown($event)'
            },
            queries: {
                chips: new ContentChildren(MdChip)
            },
            styles: [".mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:flex-start}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:2.5px}:not(.mat-input-wrapper) .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:0;margin-right:2.5px}[dir=rtl] :not(.mat-input-wrapper) .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:2.5px;margin-right:0}:not(.mat-input-wrapper) .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-left:2.5px;margin-right:0}[dir=rtl] :not(.mat-input-wrapper) .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-left:0;margin-right:2.5px}.mat-chip:not(.mat-basic-chip){display:inline-block;position:relative;padding:6px 10px;border:2px solid transparent;border-radius:20px;font-size:13px;line-height:16px}.mat-chip:not(.mat-basic-chip).mat-chip-has-remove-icon{padding-right:32px}.mat-chip-list-stacked .mat-chip-list-wrapper{display:block}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){display:block;margin:0;margin-bottom:6px}[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:0;margin-bottom:6px}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child,[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-bottom:0}.mat-chip-remove{position:absolute;top:2px;right:4px;width:24px;height:21px;padding-top:3px;font-size:18px;text-align:center;cursor:default}.mat-chip-remove.mat-chip-remove-hidden{display:none}.mat-input-container .mat-chip-list-wrapper input{width:auto;height:38px;margin-left:8px}.mat-input-container mat-chip-list~label.mat-empty{transform:translateY(22px)} /*# sourceMappingURL=chips.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef, Dir])
    ], MdChipList);
    return MdChipList;
}());
//# sourceMappingURL=chip-list.js.map