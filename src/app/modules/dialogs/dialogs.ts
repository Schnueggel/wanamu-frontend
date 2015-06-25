import {DateDialogService} from './datedialog/datedialogservice';

export var DialogsModule = angular.module('dialogs', []);

DialogsModule.service('wuDateDialog', DateDialogService);
