import { NgProgressRef } from './ng-progress-ref';
import { NgProgressConfig } from './ng-progress.interface';
export declare class NgProgress {
    /** Store progress bar instances */
    private readonly _instances;
    /** Global config */
    config: NgProgressConfig;
    constructor(config: NgProgressConfig);
    /**
     * Get or Create progress bar by ID
     * @param id
     * @param config
     */
    ref(id?: string, config?: NgProgressConfig): NgProgressRef;
    /**
     * Destroy all progress bar instances
     */
    destroyAll(): void;
    /**
     * A destroyer function for each progress bar instance
     */
    private deleteInstance;
}
