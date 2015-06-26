import { Module, InjectM, Controller, Service, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';
import { AuthService } from './AuthService';
import { LoginController } from './login/LoginController';
import { LogoutController } from './logout/LogoutController';
import { LoginDirective } from './login/LoginDirective';
import { IsAuthDirective } from './isauth/IsAuthDirective';
/**
 * Panel Module is the Basis for the Layout
 */
@Module('auth', {
    controller: [LoginController, LogoutController],
    modules : [ 'panel'],
    directives: [ IsAuthDirective, LoginDirective ],
    services  : [ AuthService ]
})
export class AuthModule extends BaseModule {

    public static mname : string = 'auth';

    @Config('$stateProvider')
    config($stateProvider : angular.ui.IStateProvider) {

        $stateProvider
            .state('panel.view.login', {
                url: '/login',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'LoginController as Login',
                        template: require('./login/login.html')
                    }
                }
            }).state('panel.view.logout', {
                url: '/logout',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'LogoutController as Logout'
                    }
                },
                cache: false
            });
    }
}
