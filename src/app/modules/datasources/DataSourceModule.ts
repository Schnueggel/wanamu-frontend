/**
 * Created by Schnueggel on 18.06.2015.
 */
import { Module, Service } from '../../decorators/decorators';
import { UserDataSource, TodoDataSource, TodoListDataSource, SettingDataSource,
    ProfileDataSource, RegistrationDataSource, FriendsDataSource } from './datasources';
import { BaseModule } from '../../wanamu/wanamu';

@Module('dataSource', {
    services: [UserDataSource, TodoDataSource, TodoListDataSource,
        SettingDataSource, ProfileDataSource, RegistrationDataSource, FriendsDataSource
    ]
})
export class DataSourceModule extends BaseModule {
    public static mname: string = 'dataSource';

    constructor() {
        super();
    }
}
