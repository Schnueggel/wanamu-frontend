import { Module } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';
import { RepeatDirective } from './RepeatDirective';

/**
 * Panel Module is the Basis for the Layout
 */
@Module('wuRepeatModule', {
    controller: [],
    modules : [],
    directives: [RepeatDirective],
    services  : []
})
export class RepeatModule extends BaseModule {
    public static mname : string  = 'wuRepeatModule';
    constructor() {
        super();
    }
}
