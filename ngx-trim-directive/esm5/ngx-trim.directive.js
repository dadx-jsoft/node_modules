/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Optional, } from '@angular/core';
import { NgControl, } from '@angular/forms';
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
export { NgxTrimDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyaW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRyaW0tZGlyZWN0aXZlLyIsInNvdXJjZXMiOlsibmd4LXRyaW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsU0FBUyxHQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEI7SUFtQ0UsMEJBQ1UsVUFBc0IsRUFDVixTQUFvQjtRQURoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVBqQyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFTakMsQ0FBQztJQWpDRCxzQkFDVyxrQ0FBSTs7OztRQW1CZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQXRCRCxVQUNpQixVQUErQjtZQUM5QyxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksVUFBVSxLQUFLLE1BQU0sSUFBSSxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQywrR0FDSixDQUFDLENBQUM7Z0JBRXhELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQzs7Z0JBRWxCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7O2dCQUNwQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDM0IsSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3hELHFDQUFxQztnQkFDckMsZ0JBQWdCLENBQUMs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LFVBQVU7Z0JBU1YsU0FBUyx1QkF3Q04sUUFBUTs7O3VCQS9CVixLQUFLLFNBQUMsTUFBTTttQ0F3QlosS0FBSzt5QkE0RkwsWUFBWSxTQUFDLE1BQU0sRUFBRTt3QkFDcEIsZUFBZTt3QkFDZixxQkFBcUI7cUJBQ3RCOzBCQWtCQSxZQUFZLFNBQUMsT0FBTyxFQUFFO3dCQUNyQixlQUFlO3dCQUNmLHFCQUFxQjtxQkFDdEI7O0lBNEJILHVCQUFDO0NBQUEsQUE5S0QsSUE4S0M7U0EzS1ksZ0JBQWdCOzs7Ozs7SUFFM0IsaUNBQW1DOztJQXlCbkMsNENBQWlDOzs7OztJQUVqQywwQ0FBNkM7Ozs7O0lBQzdDLHVDQUFxQzs7Ozs7SUFHbkMsc0NBQThCOzs7OztJQUM5QixxQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdDb250cm9sLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W3RyaW1dLHRleHRhcmVhW3RyaW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHJpbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF90cmltOiAnJyB8ICdibHVyJyB8IGZhbHNlO1xuICBASW5wdXQoJ3RyaW0nKVxuICBwdWJsaWMgc2V0IHRyaW0gKHRyaW1PcHRpb246ICcnIHwgJ2JsdXInIHwgZmFsc2UpIHtcbiAgICBpZiAodHJpbU9wdGlvbiAhPT0gJycgJiYgdHJpbU9wdGlvbiAhPT0gJ2JsdXInICYmIHRyaW1PcHRpb24gIT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE5vdGU6IFRoZSB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KHRyaW1PcHRpb24pfSBpcyBub3QgYXNzaWduYWJsZSB0byB0aGUgdHJpbSBhdHRyaWJ1dGUuXG4gICAgICAgIE9ubHkgYmxhbmsgc3RyaW5nIChcIlwiKSwgXCJibHVyXCIgb3IgZmFsc2UgaXMgYWxsb3dlZC5gKTtcblxuICAgICAgdGhpcy5fdHJpbSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3RyaW0gPSB0cmltT3B0aW9uO1xuXG4gICAgY29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGVsZVZhbHVlID0gZWxlbS52YWx1ZTtcbiAgICBpZiAodHJpbU9wdGlvbiAhPT0gZmFsc2UgJiYgZWxlVmFsdWUgIT09IGVsZVZhbHVlLnRyaW0oKSkge1xuICAgICAgLy8gaW5pdGlhbGx5IHRyaW0gdGhlIHZhbHVlIGlmIG5lZWRlZFxuICAgICAgTmd4VHJpbURpcmVjdGl2ZS5kaXNwYXRjaEV2ZW50KGVsZW0sICdibHVyJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCB0cmltICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpbTtcbiAgfVxuXG4gIEBJbnB1dCgpIHRyaW1PbldyaXRlVmFsdWUgPSB0cnVlO1xuXG4gIHByaXZhdGUgX3ZhbHVlQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yO1xuICBwcml2YXRlIF93cml0ZVZhbHVlOiAodmFsdWUpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IgKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sLFxuICApIHtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldENhcmV0IChlbCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBlbC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kLFxuICAgIH07XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNldENhcmV0IChlbCwgc3RhcnQsIGVuZCkge1xuXG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICBlbC5zZWxlY3Rpb25FbmQgPSBlbmQ7XG5cbiAgICBlbC5mb2N1cygpO1xuXG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkaXNwYXRjaEV2ZW50IChlbCwgZXZlbnRUeXBlKSB7XG5cbiAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LmluaXRFdmVudChldmVudFR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHRyaW1WYWx1ZSAoZWwsIHZhbHVlKSB7XG5cbiAgICBlbC52YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblxuICAgIE5neFRyaW1EaXJlY3RpdmUuZGlzcGF0Y2hFdmVudChlbCwgJ2lucHV0Jyk7XG5cbiAgfVxuXG4gIG5nT25Jbml0ICgpOiB2b2lkIHtcblxuICAgIGlmICghdGhpcy5uZ0NvbnRyb2wpIHtcblxuICAgICAgY29uc29sZS53YXJuKCdOb3RlOiBUaGUgdHJpbSBkaXJlY3RpdmUgc2hvdWxkIGJlIHVzZWQgd2l0aCBvbmUgb2YgbmdNb2RlbCwgZm9ybUNvbnRyb2wgb3IgZm9ybUNvbnRyb2xOYW1lIGRpcmVjdGl2ZXMuJyk7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlQWNjZXNzb3IgPSB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yO1xuXG4gICAgdGhpcy5fd3JpdGVWYWx1ZSA9IHRoaXMuX3ZhbHVlQWNjZXNzb3Iud3JpdGVWYWx1ZTtcbiAgICB0aGlzLl92YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IF92YWx1ZSA9XG4gICAgICAgIHRoaXMudHJpbSA9PT0gZmFsc2UgfHwgIXZhbHVlIHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiB2YWx1ZS50cmltIHx8ICF0aGlzLnRyaW1PbldyaXRlVmFsdWVcbiAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgOiB2YWx1ZS50cmltKCk7XG5cbiAgICAgIGlmICh0aGlzLl93cml0ZVZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlVmFsdWUuY2FsbCh0aGlzLl92YWx1ZUFjY2Vzc29yLCBfdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgIT09IF92YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fdmFsdWVBY2Nlc3Nvclsnb25DaGFuZ2UnXSkge1xuICAgICAgICAgIHRoaXMuX3ZhbHVlQWNjZXNzb3JbJ29uQ2hhbmdlJ10oX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUFjY2Vzc29yWydvblRvdWNoZWQnXSkge1xuICAgICAgICAgIHRoaXMuX3ZhbHVlQWNjZXNzb3JbJ29uVG91Y2hlZCddKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH07XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95ICgpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLl92YWx1ZUFjY2Vzc29yICYmIHRoaXMuX3dyaXRlVmFsdWUpIHtcblxuICAgICAgdGhpcy5fdmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlID0gdGhpcy5fd3JpdGVWYWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFtcbiAgICAnJGV2ZW50LnRhcmdldCcsXG4gICAgJyRldmVudC50YXJnZXQudmFsdWUnLFxuICBdKVxuICBvbkJsdXIgKGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLnRyaW0gPT09IGZhbHNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIGlmICgodGhpcy50cmltID09PSAnJyB8fCAnYmx1cicgPT09IHRoaXMudHJpbSkgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHZhbHVlLnRyaW0gJiYgdmFsdWUudHJpbSgpICE9PSB2YWx1ZSkge1xuXG4gICAgICBOZ3hUcmltRGlyZWN0aXZlLnRyaW1WYWx1ZShlbCwgdmFsdWUpO1xuICAgICAgTmd4VHJpbURpcmVjdGl2ZS5kaXNwYXRjaEV2ZW50KGVsLCAnYmx1cicpOyAvLyBpbiBjYXNlIHVwZGF0ZU9uIGlzIHNldCB0byBibHVyXG5cbiAgICB9XG5cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgW1xuICAgICckZXZlbnQudGFyZ2V0JyxcbiAgICAnJGV2ZW50LnRhcmdldC52YWx1ZScsXG4gIF0pXG4gIG9uSW5wdXQgKGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGlmICh0aGlzLnRyaW0gPT09IGZhbHNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLnRyaW0gPT09ICcnICYmICdmdW5jdGlvbicgPT09IHR5cGVvZiB2YWx1ZS50cmltICYmIHZhbHVlLnRyaW0oKSAhPT0gdmFsdWUpIHtcblxuICAgICAgbGV0IHsgc3RhcnQsIGVuZCB9ID0gTmd4VHJpbURpcmVjdGl2ZS5nZXRDYXJldChlbCk7XG5cbiAgICAgIGlmICh2YWx1ZVswXSA9PT0gJyAnICYmIHN0YXJ0ID09PSAxICYmIGVuZCA9PT0gMSkge1xuXG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgICAgZW5kID0gMDtcblxuICAgICAgfVxuXG4gICAgICBOZ3hUcmltRGlyZWN0aXZlLnRyaW1WYWx1ZShlbCwgdmFsdWUpO1xuXG4gICAgICBOZ3hUcmltRGlyZWN0aXZlLnNldENhcmV0KGVsLCBzdGFydCwgZW5kKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==