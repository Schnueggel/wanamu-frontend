/**
 * Created by Schnueggel on 14.06.2015.
 */
 import {DateDialogService} from './datedialog/datedialogservice';

export var DialogsModule = angular.module('dialogs', []);

DialogsModule.service('wuDateDialog', DateDialogService);
