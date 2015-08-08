import {DateDialogService} from './datedialog/datedialogservice';

export const DialogsModule = angular.module('dialogs', []);

DialogsModule.service('wuDateDialog', DateDialogService);
