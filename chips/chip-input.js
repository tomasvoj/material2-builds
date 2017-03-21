var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Output, EventEmitter, Renderer, ElementRef, Input } from '@angular/core';
import { ENTER } from '../core/keyboard/keycodes';
export var MdChipInput = (function () {
    function MdChipInput(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * Whether or not the chipAdded event will be emitted when the input is blurred.
         *
         * Default `false`.
         */
        this.addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipAdded event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeys = [ENTER];
        /** Emitted when a chip is to be added. */
        this.chipAdded = new EventEmitter();
        this._inputElement = this._elementRef.nativeElement;
    }
    /**
     * Utility method to make host definition/tests more clear.
     *
     * @private
     */
    MdChipInput.prototype._keydown = function (event) {
        this._add(event);
    };
    /**
     * Checks to see if the blur should emit the (chipAdded) event.
     *
     * @private
     */
    MdChipInput.prototype._blur = function () {
        if (this.addOnBlur) {
            this._add();
        }
    };
    /**
     * Checks to see if the (chipAdded) event needs to be emitted.
     *
     * @private
     */
    MdChipInput.prototype._add = function (event) {
        if (!event || this.separatorKeys.indexOf(event.keyCode) > -1) {
            this.chipAdded.emit({ input: this._inputElement, value: this._inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdChipInput.prototype, "addOnBlur", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], MdChipInput.prototype, "separatorKeys", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdChipInput.prototype, "chipAdded", void 0);
    MdChipInput = __decorate([
        Directive({
            selector: '[mdChipInput], [matChipInput]',
            host: {
                '(keydown)': '_keydown($event)',
                '(blur)': '_blur()'
            }
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef])
    ], MdChipInput);
    return MdChipInput;
}());
//# sourceMappingURL=chip-input.js.map