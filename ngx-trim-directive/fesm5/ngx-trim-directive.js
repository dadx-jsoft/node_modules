import { Directive, ElementRef, Optional, Input, HostListener, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxTrimDirective = /** @class */ (function () {
    function NgxTrimDirective(elementRef, ngControl) {
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.trimOnWriteValue = true;
    }
    Object.defineProperty(NgxTrimDirective.prototype, "trim", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trim;
        },
        set: /**
         * @param {?} trimOption
         * @return {?}
         */
        function (trimOption) {
            if (trimOption !== '' && trimOption !== 'blur' && trimOption !== false) {
                console.warn("Note: The value " + JSON.stringify(trimOption) + " is not assignable to the trim attribute.\n        Only blank string (\"\"), \"blur\" or false is allowed.");
                this._trim = false;
                return;
            }
            this._trim = trimOption;
            /** @type {?} */
            var elem = this.elementRef.nativeElement;
            /** @type {?} */
            var eleValue = elem.value;
            if (trimOption !== false && eleValue !== eleValue.trim()) {
                // initially trim the value if needed
                NgxTrimDirective.dispatchEvent(elem, 'blur');
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    NgxTrimDirective.getCaret = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        return {
            start: el.selectionStart,
            end: el.selectionEnd,
        };
    };
    /**
     * @private
     * @param {?} el
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    NgxTrimDirective.setCaret = /**
     * @private
     * @param {?} el
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (el, start, end) {
        el.selectionStart = start;
        el.selectionEnd = end;
        el.focus();
    };
    /**
     * @private
     * @param {?} el
     * @param {?} eventType
     * @return {?}
     */
    NgxTrimDirective.dispatchEvent = /**
     * @private
     * @param {?} el
     * @param {?} eventType
     * @return {?}
     */
    function (el, eventType) {
        /** @type {?} */
        var event = document.createEvent('Event');
        event.initEvent(eventType, false, false);
        el.dispatchEvent(event);
    };
    /**
     * @private
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    NgxTrimDirective.trimValue = /**
     * @private
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) {
        el.value = value.trim();
        NgxTrimDirective.dispatchEvent(el, 'input');
    };
    /**
     * @return {?}
     */
    NgxTrimDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.ngControl) {
            console.warn('Note: The trim directive should be used with one of ngModel, formControl or formControlName directives.');
            return;
        }
        this._valueAccessor = this.ngControl.valueAccessor;
        this._writeValue = this._valueAccessor.writeValue;
        this._valueAccessor.writeValue = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var _value = _this.trim === false || !value || 'function' !== typeof value.trim || !_this.trimOnWriteValue
                ? value
                : value.trim();
            if (_this._writeValue) {
                _this._writeValue.call(_this._valueAccessor, _value);
            }
            if (value !== _value) {
                if (_this._valueAccessor['onChange']) {
                    _this._valueAccessor['onChange'](_value);
                }
                if (_this._valueAccessor['onTouched']) {
                    _this._valueAccessor['onTouched']();
                }
            }
        });
    };
    /**
     * @return {?}
     */
    NgxTrimDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._valueAccessor && this._writeValue) {
            this._valueAccessor.writeValue = this._writeValue;
        }
    };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    NgxTrimDirective.prototype.onBlur = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) {
        if (this.trim === false) {
            return;
        }
        if ((this.trim === '' || 'blur' === this.trim) && 'function' === typeof value.trim && value.trim() !== value) {
            NgxTrimDirective.trimValue(el, value);
            NgxTrimDirective.dispatchEvent(el, 'blur'); // in case updateOn is set to blur
        }
    };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    NgxTrimDirective.prototype.onInput = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) {
        if (this.trim === false) {
            return;
        }
        if (this.trim === '' && 'function' === typeof value.trim && value.trim() !== value) {
            var _a = NgxTrimDirective.getCaret(el), start = _a.start, end = _a.end;
            if (value[0] === ' ' && start === 1 && end === 1) {
                start = 0;
                end = 0;
            }
            NgxTrimDirective.trimValue(el, value);
            NgxTrimDirective.setCaret(el, start, end);
        }
    };
    NgxTrimDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[trim],textarea[trim]',
                },] }
    ];
    /** @nocollapse */
    NgxTrimDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }] }
    ]; };
    NgxTrimDirective.propDecorators = {
        trim: [{ type: Input, args: ['trim',] }],
        trimOnWriteValue: [{ type: Input }],
        onBlur: [{ type: HostListener, args: ['blur', [
                        '$event.target',
                        '$event.target.value',
                    ],] }],
        onInput: [{ type: HostListener, args: ['input', [
                        '$event.target',
                        '$event.target.value',
                    ],] }]
    };
    return NgxTrimDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxTrimDirectiveModule = /** @class */ (function () {
    function NgxTrimDirectiveModule() {
    }
    NgxTrimDirectiveModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [NgxTrimDirective],
                    exports: [NgxTrimDirective],
                },] }
    ];
    return NgxTrimDirectiveModule;
}());

export { NgxTrimDirective, NgxTrimDirectiveModule };
//# sourceMappingURL=ngx-trim-directive.js.map
