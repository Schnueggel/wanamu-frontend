import { Module } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';
import { ColorpickerDirective } from './ColorpickerDirective';

/**
 * This module contains the color picker
 */
@Module('wuColorpickerModule', {
    directives: [ColorpickerDirective],
})
export class ColorpickerModule extends BaseModule {
    public static mname : string  = 'wuColorpickerModule';
    constructor() {
        super();
    }
}
