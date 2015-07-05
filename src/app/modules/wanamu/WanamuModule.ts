import { PanelModule } from '../panel/PanelModule';
import { CustomMaterialModule } from '../custommaterial/CustomMaterialModule';
import { AuthModule } from '../auth/AuthModule';
import { ProfileModule } from '../profile/ProfileModule';
import { SettingModule } from '../setting/SettingModule';
import { RegistrationModule } from '../registration/RegistrationModule';
import { MenuModule } from '../menu/MenuModule';
import { DataSourceModule } from '../datasources/DataSourceModule';
import { ColorpickerModule } from '../colorpicker/ColorpickerModule';
import { ConfirmationModule } from '../confirmation/ConfirmationModule';
import { TodosModule } from '../todos/TodosModule';
import { DateTimePickerModule } from '../datetimepicker/datetimepicker';
import { DialogsModule } from '../dialogs/dialogs';
import { BaseModule } from '../../wanamu/wanamu';
import { Module, Config } from '../../decorators/decorators';
import { lpad } from '../../filter/Lpad';

@Module('wanamu',
    {
        modules : [
            'ui.router', 'ngAnimate', 'ngTouch', 'ngMessages', 'ngMaterial', 'pascalprecht.translate',
            require('angular-cache'),
            DataSourceModule.mname,
            CustomMaterialModule.mname,
            PanelModule.mname,
            ConfirmationModule.mname,
            ColorpickerModule.mname,
            ProfileModule.mname,
            SettingModule.mname,
            RegistrationModule.mname,
            AuthModule.mname,
            TodosModule.mname,
            MenuModule.mname,
            DialogsModule.name],
        filter : [{ lpad }],
    }
)
export class WanamuModule extends BaseModule {
    /**
     * @type {string}
     */
    public static mname  : string = 'wanamu';

    @Config('$urlRouterProvider', '$translateProvider', '$logProvider', '$mdThemingProvider', '$httpProvider')
    config ($urlRouterProvider : any,
            $translateProvider : any,
            $logProvider : angular.ILogProvider,
            $mdThemingProvider :any,
            $httpProvider : angular.IHttpProvider) : any {

        //We need credentials on xhr requests
        $httpProvider.defaults.withCredentials = true;

        /*
         * $log provider enable disable on dev environment
         */
        $logProvider.debugEnabled(true);

        // Fallback on unknown state/route
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('grey')
            .warnPalette('red');


        /*
         * translate settings
         */
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/locale-',
            suffix: '.json'
        });

        $translateProvider.determinePreferredLanguage(function () {

            //TODO language determination
            let preferredLangKey = 'en';

            return preferredLangKey;
        });

        $translateProvider.fallbackLanguage('en');
    }
}
