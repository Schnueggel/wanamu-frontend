
import { AuthService } from '../auth/AuthService';
import { BaseService } from '../../wanamu/wanamu';
import { InjectC, Service } from '../../decorators/decorators';

@InjectC('$q', 'wuAuthService', 'panelService', 'settingsDataSource')
@Service('wuSettingsService' )
export class SettingsService extends BaseService implements wu.settings.ISettingsService {


    /**
     *
     * @param $q
     * @param auth
     * @param panelService
     * @param todoDataSource
     */
    constructor(public $q : ng.IQService,
                public auth : AuthService,
                public panelService : wu.module.panel.IPanelService,
                public todoDataSource : wu.datasource.ISettingsDatasource
    ){
        super();
    }

}
