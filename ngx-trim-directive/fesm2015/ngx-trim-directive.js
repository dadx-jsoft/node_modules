import { Directive, ElementRef, Optional, Input, HostListener, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTrimDirective {
    /**
     * @param {?} elementRef
     * @param {?} ngControl
     */
    constructor(elementRef, ngControl) {
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.trimOnWriteValue = true;
    }
    /**
     * @param {?} trimOption
     * @return {?}
     */
    set trim(trimOption) {
        if (trimOption !== '' && trimOption !== 'blur' && trimOption !== false) {
            console.warn(`Note: The value ${JSON.stringify(trimOption)} is not assignable to the trim attribute.
        Only blank string (""), "blur" or false is allowed.`);
            this._trim = false;
            return;
        }
        this._trim = trimOption;
        /** @type {?} */
        const elem = this.elementRef.nativeElement;
        /** @type {?} */
        const eleValue = elem.value;
        if (trimOption !== false && eleValue !== eleValue.trim()) {
            // initially trim the value if needed
            NgxTrimDirective.dispatchEvent(elem, 'blur');
        }
    }
    /**
     * @return {?}
     */
    get trim() {
        return this._trim;
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static getCaret(el) {
        return {
            start: el.selectionStart,
            end: el.selectionEnd,
        };
    }
    /**
     * @private
     * @param {?} el
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    static setCaret(el, start, end) {
        el.selectionStart = start;
        el.selectionEnd = end;
        el.focus();
    }
    /**
     * @private
     * @param {?} el
     * @param {?} eventType
     * @return {?}
     */
    static dispatchEvent(el, eventType) {
        /** @type {?} */
        const event = document.createEvent('Event');
        event.initEvent(eventType, false, false);
        el.dispatchEvent(event);
    }
    /**
     * @private
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    static trimValue(el, value) {
        el.value = value.trim();
        NgxTrimDirective.dispatchEvent(el, 'input');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
        (value) => {
            /** @type {?} */
            const _value = this.trim === false || !value || 'function' !== typeof value.trim || !this.trimOnWriteValue
                ? value
                : value.trim();
            if (this._writeValue) {
                this._writeValue.call(this._valueAccessor, _value);
            }
            if (value !== _value) {
                if (this._valueAccessor['onChange']) {
                    this._valueAccessor['onChange'](_value);
                }
                if (this._valueAccessor['onTouched']) {
                    this._valueAccessor['onTouched']();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._valueAccessor && this._writeValue) {
            this._valueAccessor.writeValue = this._writeValue;
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    onBlur(el, value) {
        if (this.trim === false) {
            return;
        }
        if ((this.trim === '' || 'blur' === this.trim) && 'function' === typeof value.trim && value.trim() !== value) {
            NgxTrimDirective.trimValue(el, value);
            NgxTrimDirective.dispatchEvent(el, 'blur'); // in case updateOn is set to blur
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    onInput(el, value) {
        if (this.trim === false) {
            return;
        }
        if (this.trim === '' && 'function' === typeof value.trim && value.trim() !== value) {
            let { start, end } = NgxTrimDirective.getCaret(el);
            if (value[0] === ' ' && start === 1 && end === 1) {
                start = 0;
                end = 0;
            }
            NgxTrimDirective.trimValue(el, value);
            NgxTrimDirective.setCaret(el, start, end);
        }
    }
}
NgxTrimDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[trim],textarea[trim]',
            },] }
];
/** @nocollapse */
NgxTrimDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTrimDirectiveModule {
}
NgxTrimDirectiveModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [NgxTrimDirective],
                exports: [NgxTrimDirective],
            },] }
];

export { NgxTrimDirective, NgxTrimDirectiveModule };
//# sourceMappingURL=ngx-trim-directive.js.map
