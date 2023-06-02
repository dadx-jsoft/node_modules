/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Optional, } from '@angular/core';
import { NgControl, } from '@angular/forms';
export class NgxTrimDirective {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxTrimDirective.prototype._trim;
    /** @type {?} */
    NgxTrimDirective.prototype.trimOnWriteValue;
    /**
     * @type {?}
     * @private
     */
    NgxTrimDirective.prototype._valueAccessor;
    /**
     * @type {?}
     * @private
     */
    NgxTrimDirective.prototype._writeValue;
    /**
     * @type {?}
     * @private
     */
    NgxTrimDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxTrimDirective.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyaW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRyaW0tZGlyZWN0aXZlLyIsInNvdXJjZXMiOlsibmd4LXRyaW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFLeEIsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFnQzNCLFlBQ1UsVUFBc0IsRUFDVixTQUFvQjtRQURoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVBqQyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFTakMsQ0FBQzs7Ozs7SUFqQ0QsSUFDVyxJQUFJLENBQUUsVUFBK0I7UUFDOUMsSUFBSSxVQUFVLEtBQUssRUFBRSxJQUFJLFVBQVUsS0FBSyxNQUFNLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtZQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzs0REFDSixDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7O2NBRWxCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7O2NBQ3BDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSztRQUMzQixJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RCxxQ0FBcUM7WUFDckMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM5QztJQUNI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d0NOLFFBQVE7OzttQkEvQlYsS0FBSyxTQUFDLE1BQU07K0JBd0JaLEtBQUs7cUJBNEZMLFlBQVksU0FBQyxNQUFNLEVBQUU7b0JBQ3BCLGVBQWU7b0JBQ2YscUJBQXFCO2lCQUN0QjtzQkFrQkEsWUFBWSxTQUFDLE9BQU8sRUFBRTtvQkFDckIsZUFBZTtvQkFDZixxQkFBcUI7aUJBQ3RCOzs7Ozs7O0lBN0lELGlDQUFtQzs7SUF5Qm5DLDRDQUFpQzs7Ozs7SUFFakMsMENBQTZDOzs7OztJQUM3Qyx1Q0FBcUM7Ozs7O0lBR25DLHNDQUE4Qjs7Ozs7SUFDOUIscUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5nQ29udHJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFt0cmltXSx0ZXh0YXJlYVt0cmltXScsXG59KVxuZXhwb3J0IGNsYXNzIE5neFRyaW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfdHJpbTogJycgfCAnYmx1cicgfCBmYWxzZTtcbiAgQElucHV0KCd0cmltJylcbiAgcHVibGljIHNldCB0cmltICh0cmltT3B0aW9uOiAnJyB8ICdibHVyJyB8IGZhbHNlKSB7XG4gICAgaWYgKHRyaW1PcHRpb24gIT09ICcnICYmIHRyaW1PcHRpb24gIT09ICdibHVyJyAmJiB0cmltT3B0aW9uICE9PSBmYWxzZSkge1xuICAgICAgY29uc29sZS53YXJuKGBOb3RlOiBUaGUgdmFsdWUgJHtKU09OLnN0cmluZ2lmeSh0cmltT3B0aW9uKX0gaXMgbm90IGFzc2lnbmFibGUgdG8gdGhlIHRyaW0gYXR0cmlidXRlLlxuICAgICAgICBPbmx5IGJsYW5rIHN0cmluZyAoXCJcIiksIFwiYmx1clwiIG9yIGZhbHNlIGlzIGFsbG93ZWQuYCk7XG5cbiAgICAgIHRoaXMuX3RyaW0gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl90cmltID0gdHJpbU9wdGlvbjtcblxuICAgIGNvbnN0IGVsZW0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBlbGVWYWx1ZSA9IGVsZW0udmFsdWU7XG4gICAgaWYgKHRyaW1PcHRpb24gIT09IGZhbHNlICYmIGVsZVZhbHVlICE9PSBlbGVWYWx1ZS50cmltKCkpIHtcbiAgICAgIC8vIGluaXRpYWxseSB0cmltIHRoZSB2YWx1ZSBpZiBuZWVkZWRcbiAgICAgIE5neFRyaW1EaXJlY3RpdmUuZGlzcGF0Y2hFdmVudChlbGVtLCAnYmx1cicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJpbSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaW07XG4gIH1cblxuICBASW5wdXQoKSB0cmltT25Xcml0ZVZhbHVlID0gdHJ1ZTtcblxuICBwcml2YXRlIF92YWx1ZUFjY2Vzc29yOiBDb250cm9sVmFsdWVBY2Nlc3NvcjtcbiAgcHJpdmF0ZSBfd3JpdGVWYWx1ZTogKHZhbHVlKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgKSB7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRDYXJldCAoZWwpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQ6IGVsLnNlbGVjdGlvbkVuZCxcbiAgICB9O1xuXG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBzZXRDYXJldCAoZWwsIHN0YXJ0LCBlbmQpIHtcblxuICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnQ7XG4gICAgZWwuc2VsZWN0aW9uRW5kID0gZW5kO1xuXG4gICAgZWwuZm9jdXMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGF0Y2hFdmVudCAoZWwsIGV2ZW50VHlwZSkge1xuXG4gICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldmVudC5pbml0RXZlbnQoZXZlbnRUeXBlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB0cmltVmFsdWUgKGVsLCB2YWx1ZSkge1xuXG4gICAgZWwudmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cbiAgICBOZ3hUcmltRGlyZWN0aXZlLmRpc3BhdGNoRXZlbnQoZWwsICdpbnB1dCcpO1xuXG4gIH1cblxuICBuZ09uSW5pdCAoKTogdm9pZCB7XG5cbiAgICBpZiAoIXRoaXMubmdDb250cm9sKSB7XG5cbiAgICAgIGNvbnNvbGUud2FybignTm90ZTogVGhlIHRyaW0gZGlyZWN0aXZlIHNob3VsZCBiZSB1c2VkIHdpdGggb25lIG9mIG5nTW9kZWwsIGZvcm1Db250cm9sIG9yIGZvcm1Db250cm9sTmFtZSBkaXJlY3RpdmVzLicpO1xuXG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZUFjY2Vzc29yID0gdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvcjtcblxuICAgIHRoaXMuX3dyaXRlVmFsdWUgPSB0aGlzLl92YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWU7XG4gICAgdGhpcy5fdmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBfdmFsdWUgPVxuICAgICAgICB0aGlzLnRyaW0gPT09IGZhbHNlIHx8ICF2YWx1ZSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2YgdmFsdWUudHJpbSB8fCAhdGhpcy50cmltT25Xcml0ZVZhbHVlXG4gICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgIDogdmFsdWUudHJpbSgpO1xuXG4gICAgICBpZiAodGhpcy5fd3JpdGVWYWx1ZSkge1xuICAgICAgICB0aGlzLl93cml0ZVZhbHVlLmNhbGwodGhpcy5fdmFsdWVBY2Nlc3NvciwgX3ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlICE9PSBfdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQWNjZXNzb3JbJ29uQ2hhbmdlJ10pIHtcbiAgICAgICAgICB0aGlzLl92YWx1ZUFjY2Vzc29yWydvbkNoYW5nZSddKF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdmFsdWVBY2Nlc3Nvclsnb25Ub3VjaGVkJ10pIHtcbiAgICAgICAgICB0aGlzLl92YWx1ZUFjY2Vzc29yWydvblRvdWNoZWQnXSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9O1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSAoKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5fdmFsdWVBY2Nlc3NvciAmJiB0aGlzLl93cml0ZVZhbHVlKSB7XG5cbiAgICAgIHRoaXMuX3ZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZSA9IHRoaXMuX3dyaXRlVmFsdWU7XG5cbiAgICB9XG5cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbXG4gICAgJyRldmVudC50YXJnZXQnLFxuICAgICckZXZlbnQudGFyZ2V0LnZhbHVlJyxcbiAgXSlcbiAgb25CbHVyIChlbDogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy50cmltID09PSBmYWxzZSkge1xuXG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICBpZiAoKHRoaXMudHJpbSA9PT0gJycgfHwgJ2JsdXInID09PSB0aGlzLnRyaW0pICYmICdmdW5jdGlvbicgPT09IHR5cGVvZiB2YWx1ZS50cmltICYmIHZhbHVlLnRyaW0oKSAhPT0gdmFsdWUpIHtcblxuICAgICAgTmd4VHJpbURpcmVjdGl2ZS50cmltVmFsdWUoZWwsIHZhbHVlKTtcbiAgICAgIE5neFRyaW1EaXJlY3RpdmUuZGlzcGF0Y2hFdmVudChlbCwgJ2JsdXInKTsgLy8gaW4gY2FzZSB1cGRhdGVPbiBpcyBzZXQgdG8gYmx1clxuXG4gICAgfVxuXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFtcbiAgICAnJGV2ZW50LnRhcmdldCcsXG4gICAgJyRldmVudC50YXJnZXQudmFsdWUnLFxuICBdKVxuICBvbklucHV0IChlbDogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy50cmltID09PSBmYWxzZSkge1xuXG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy50cmltID09PSAnJyAmJiAnZnVuY3Rpb24nID09PSB0eXBlb2YgdmFsdWUudHJpbSAmJiB2YWx1ZS50cmltKCkgIT09IHZhbHVlKSB7XG5cbiAgICAgIGxldCB7IHN0YXJ0LCBlbmQgfSA9IE5neFRyaW1EaXJlY3RpdmUuZ2V0Q2FyZXQoZWwpO1xuXG4gICAgICBpZiAodmFsdWVbMF0gPT09ICcgJyAmJiBzdGFydCA9PT0gMSAmJiBlbmQgPT09IDEpIHtcblxuICAgICAgICBzdGFydCA9IDA7XG4gICAgICAgIGVuZCA9IDA7XG5cbiAgICAgIH1cblxuICAgICAgTmd4VHJpbURpcmVjdGl2ZS50cmltVmFsdWUoZWwsIHZhbHVlKTtcblxuICAgICAgTmd4VHJpbURpcmVjdGl2ZS5zZXRDYXJldChlbCwgc3RhcnQsIGVuZCk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=