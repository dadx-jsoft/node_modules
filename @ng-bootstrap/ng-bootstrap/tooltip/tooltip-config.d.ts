import { PlacementArray } from '../util/positioning';
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
export declare class NgbTooltipConfig {
    autoClose: boolean | 'inside' | 'outside';
    placement: PlacementArray;
    triggers: string;
    container: string;
    disableTooltip: boolean;
    tooltipClass: string;
    openDelay: number;
    closeDelay: number;
}
