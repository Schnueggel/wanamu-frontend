import { FriendsController } from './FriendsController';
import { FriendsHeaderController } from './headertoolbar/FriendsHeaderController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('friends', <wu.decorators.IModuleOptions>{
    controller: [FriendsController, FriendsHeaderController],
    modules: ['friends']
})
export class FriendsModule extends BaseModule {
    public static mname: string = 'friends';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.friends', {
                url: '/friends',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'FriendsController as Friend',
                        template: require('./friends.html')
                    },
                    'headertoolbar@panel.view': {
                        controller: 'FriendsHeaderController as Ctrl',
                        template: require('./headertoolbar/friendsheadertoolbar.html')
                    }
                },
                data : {
                    pagename : 'Friends'
                }
            });
    }
}
