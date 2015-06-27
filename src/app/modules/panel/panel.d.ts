declare module wanamu.module.panel {

    interface IPanelService {

        repeatopts : repeatpicker.RepeatDirectiveOptions;
        isDateTimePickerOpen: boolean;
        isRepeatPickerOpen:boolean;
        isLoginOpen: boolean;

        dtpopts : dateTimePicker.DateTimePickerOptions;
        isComponentOpen : boolean

        showDateTimePicker (opts : dateTimePicker.DateTimePickerOptions) : angular.IPromise<Date>;
        resolveDateTimePicker() : void;
        rejectDateTimePicker(msg?: string) : void;
        resolveRepeatPicker() : void;
        rejectRepeatPicker(msg?: string) : void;
        showRepeatPicker (opts : repeatpicker.RepeatDirectiveOptions) : angular.IPromise<repeatpicker.RepeatDirectiveOptions>;
        showLogin () : angular.IPromise<model.IUser>;
        hideAll() : void;
        showSimpleToast(message: string) : void;
        showSimpleErrorToast (message : string) : void;
    }
}
