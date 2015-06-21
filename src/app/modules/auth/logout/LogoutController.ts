import { InjectC } from '../../../decorators/decorators';
import { Controller } from '../../../decorators/decorators';

@Controller('LogoutController')
@InjectC('$state', 'wuAuthService')
export class LogoutController {
    constructor (
        public $state : angular.ui.IStateService,
        public auth : wanamu.auth.IAuthService
    ){
        auth
            .logout()
            .then(function () {})
            .catch(function (err : any) {
                console.log(err);
            }).finally(function () {
                $state.go('panel.view.login');
            });
    }
}
