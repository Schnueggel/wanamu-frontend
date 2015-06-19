/**
 * Created by Schnueggel on 18.06.2015.
 */
import { Module, Service, ModuleOptions } from '../../decorators/decorators';
import { UserDataSource, TodoDataSource, TodoListDataSource, SettingDataSource} from './datasources';
import { BaseModule } from '../../wanamu/wanamu';

@Module('dataSource', <ModuleOptions>{
    services: [UserDataSource, TodoDataSource, TodoListDataSource, SettingDataSource],
    controller : [],
    modules: []
})
export class DataSourceModule extends BaseModule{
    public static mname: string = 'dataSource';
}
