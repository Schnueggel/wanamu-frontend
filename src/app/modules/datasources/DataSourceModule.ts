/**
 * Created by Schnueggel on 18.06.2015.
 */
import { Module, Service } from '../../decorators/decorators';
import {SettingDataSource, TodoDataSource, TodoListDataSource, UserDataSource} from './datasources';

@Module('dataSourceModule')
@Service('userDataSource', UserDataSource)
@Service('settingDataSource', SettingDataSource)
@Service('todoDataSource', TodoDataSource)
@Service('todoListDataSource', TodoListDataSource)
export class DataSourceModule {
    public name: string = 'dataSourceModule';
    public ngModule : angular.IModule;

    constructor(...args : string[]) {
        this.ngModule = angular.module(this.name,[]);
    }
}
