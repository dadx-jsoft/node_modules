import { OnChanges, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NgProgress } from './ng-progress.service';
import { NgProgressRef } from './ng-progress-ref';
export declare class NgProgressComponent implements OnInit, OnChanges, OnDestroy {
    private _ngProgress;
    private _started;
    private _completed;
    /** Progress bar worker */
    progressRef: NgProgressRef;
    /** Stream that emits progress state */
    state$: Observable<{
        active: boolean;
        transform: string;
    }>;
    /** Creates a new instance if id is not already exists */
    id: string;
    /** Initializes inputs from the global config */
    min: number;
    max: number;
    ease: string;
    color: string;
    speed: number;
    thick: boolean;
    fixed: boolean;
    meteor: boolean;
    spinner: boolean;
    trickleSpeed: number;
    debounceTime: number;
    trickleFunc: (n: number) => number;
    spinnerPosition: 'left' | 'right';
    direction: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
    started: EventEmitter<{}>;
    completed: EventEmitter<{}>;
    readonly isStarted: boolean;
    constructor(_ngProgress: NgProgress);
    ngOnChanges(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    start(): void;
    complete(): void;
    inc(n?: number): void;
    set(n: number): void;
}
