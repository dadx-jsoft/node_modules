import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
export declare class NgxTrimDirective implements OnInit, OnDestroy {
    private elementRef;
    private ngControl;
    private _trim;
    trim: '' | 'blur' | false;
    trimOnWriteValue: boolean;
    private _valueAccessor;
    private _writeValue;
    constructor(elementRef: ElementRef, ngControl: NgControl);
    private static getCaret;
    private static setCaret;
    private static dispatchEvent;
    private static trimValue;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onBlur(el: any, value: string): void;
    onInput(el: any, value: string): void;
}
