import { Module, Constant } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('custommaterial', {
    controller: [],
    services: [],
    modules: [],
    directives: []
})
export class CustomMaterialModule extends BaseModule {

    public static mname: string = 'custommaterial';

    @Constant
    public $MD_THEME_CSS: string = require('./WU_THEME_CSS.txt').replace(/(\r\n|\n|\r)/gm,"");

}
