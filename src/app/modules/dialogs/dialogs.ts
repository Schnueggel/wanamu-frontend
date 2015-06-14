'use strict';

import {DateDialogService} from './datedialog/datedialogservice';
import {RepeatDialogService} from './repeatdialog/repeatdialogservice';

export var DialogsModule = angular.module('dialogs', []);

DialogsModule.service('wuDateDialog', DateDialogService);
DialogsModule.service('wuRepeatDialog', RepeatDialogService);
