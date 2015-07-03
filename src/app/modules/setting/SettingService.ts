import { AuthService } from '../auth/AuthService';
import { BaseService } from '../../wanamu/wanamu';
import { InjectC, Service } from '../../decorators/decorators';

@InjectC('$q', 'wuAuthService', 'panelService', 'userDatasource')
@Service('wuProfileService' )
export class SettingService extends BaseService implements wu.setting.ISettingService {

    /**
     *
     * @param $q
     * @param auth
     * @param panelService
     * @param userDatasource
     */
    constructor(public $q : ng.IQService,
                public auth : AuthService,
                public panelService : wu.module.panel.IPanelService,
                public userDatasource: wu.datasource.IUserDataSource
    ){
        super();
    }

}
