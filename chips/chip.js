var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { SPACE, BACKSPACE, DELETE } from '../core/keyboard/keycodes';
/**
 * Material design styled Chip component. Used inside the MdChipList component.
 */
export var MdChip = (function () {
    function MdChip(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Whether or not the chip is disabled. Disabled chips cannot be focused. */
        this._disabled = null;
        /** Whether or not the chip is selectable. */
        this._selectable = true;
        /** Whether or not the chip is removable. */
        this._removable = true;
        /** Whether or not the chip is selected. */
        this._selected = false;
        /** The palette color of selected chips. */
        this._color = 'primary';
        /** Whether or not the chip is displaying the remove icon. */
        this._hasRemoveIcon = false;
        /** Emitted when the removable property changes. */
        this._onRemovableChange = new EventEmitter();
        this.onRemovableChange$ = this._onRemovableChange.asObservable();
        /** Emitted when the chip is focused. */
        this.onFocus = new EventEmitter();
        /** Emitted when the chip is selected. */
        this.select = new EventEmitter();
        /** Emitted when the chip is deselected. */
        this.deselect = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroy = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        this.onRemove = new EventEmitter();
    }
    MdChip.prototype.ngOnInit = function () {
        this._addDefaultCSSClass();
        this._updateColor(this._color);
    };
    MdChip.prototype.ngOnDestroy = function () {
        this.destroy.emit({ chip: this });
    };
    Object.defineProperty(MdChip.prototype, "disabled", {
        /** Whether or not the chip is disabled. */
        get: function () {
            return this._disabled;
        },
        /** Sets the disabled state of the chip. */
        set: function (value) {
            this._disabled = coerceBooleanProperty(value) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "_isAriaDisabled", {
        /** A String representation of the current disabled state. */
        get: function () {
            return String(coerceBooleanProperty(this.disabled));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "selectable", {
        /**
         * Whether or not the chips are selectable. When a chip is not selectable,
         * changes to it's selected state are always ignored.
         */
        get: function () {
            return this._selectable;
        },
        set: function (value) {
            this._selectable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "removable", {
        /**
         * Determines whether or not the chip displays the remove styling and emits (remove) events.
         */
        get: function () {
            return this._removable;
        },
        set: function (value) {
            this._removable = coerceBooleanProperty(value);
            this._onRemovableChange.emit(this._removable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdChip.prototype, "selected", {
        /** Whether or not this chip is selected. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = coerceBooleanProperty(value);
            if (this._selected) {
                this.select.emit({ chip: this });
            }
            else {
                this.deselect.emit({ chip: this });
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Toggles the current selected state of this chip. */
    MdChip.prototype.toggleSelected = function () {
        this.selected = !this.selected;
        return this.selected;
    };
    Object.defineProperty(MdChip.prototype, "color", {
        /** The color of the chip. Can be `primary`, `accent`, or `warn`. */
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._updateColor(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Allows for programmatic focusing of the chip. */
    MdChip.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus');
        this.onFocus.emit({ chip: this });
    };
    /**
     * Allows for programmatic removal of the chip. Called by the MdChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Note: This only informs any listeners of the removal request, it does **not** actually remove
     * the chip from the DOM.
     */
    MdChip.prototype.remove = function () {
        if (this.removable) {
            this.onRemove.emit({ chip: this });
        }
    };
    /** Ensures events fire properly upon click. */
    MdChip.prototype._handleClick = function (event) {
        // Check disabled
        if (this._checkDisabled(event)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.focus();
    };
    /** Handle custom key presses. */
    MdChip.prototype._handleKeydown = function (event) {
        if (this._checkDisabled(event)) {
            return;
        }
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                // If we are removable, remove the focused chip
                if (this.removable) {
                    this.onRemove.emit();
                }
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case SPACE:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected();
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
        }
    };
    /**
     * Sets whether or not this chip is displaying a remove icon. Adds/removes the
     * `md-chip-has-remove-icon` class.
     */
    MdChip.prototype._setHasRemoveIcon = function (value) {
        this._hasRemoveIcon = value;
    };
    MdChip.prototype._checkDisabled = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
        return this.disabled;
    };
    /** Initializes the appropriate CSS classes based on the chip type (basic or standard). */
    MdChip.prototype._addDefaultCSSClass = function () {
        var el = this._elementRef.nativeElement;
        // If we are a basic chip, also add the `mat-basic-chip` class for :not() targeting
        if (el.nodeName.toLowerCase() == 'mat-basic-chip' || el.hasAttribute('mat-basic-chip') ||
            el.nodeName.toLowerCase() == 'md-basic-chip' || el.hasAttribute('md-basic-chip')) {
            el.classList.add('mat-basic-chip');
        }
    };
    /** Updates the private _color variable and the native element. */
    MdChip.prototype._updateColor = function (newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    };
    /** Sets the mat-color on the native element. */
    MdChip.prototype._setElementColor = function (color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, "mat-" + color, isAdd);
        }
    };
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "select", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "deselect", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "destroy", void 0);
    __decorate([
        Output('remove'), 
        __metadata('design:type', Object)
    ], MdChip.prototype, "onRemove", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "selectable", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "removable", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], MdChip.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdChip.prototype, "color", null);
    MdChip = __decorate([
        Component({
            selector: "md-basic-chip, [md-basic-chip], md-chip, [md-chip],\n             mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]",
            template: "<ng-content></ng-content><div class=\"md-chip-focus-border\"></div>",
            host: {
                '[class.mat-chip]': 'true',
                'tabindex': '-1',
                'role': 'option',
                '[class.mat-chip-selected]': 'selected',
                '[class.mat-chip-has-remove-icon]': '_hasRemoveIcon',
                '[attr.disabled]': 'disabled',
                '[attr.aria-disabled]': '_isAriaDisabled',
                '(click)': '_handleClick($event)',
                '(keydown)': '_handleKeydown($event)'
            }
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef])
    ], MdChip);
    return MdChip;
}());
//# sourceMappingURL=chip.js.map