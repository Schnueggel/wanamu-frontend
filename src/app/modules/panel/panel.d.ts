declare module wanamu.module.panel {

    interface IPanelService {

        repeatopts : repeatpicker.RepeatDirectiveOptions;
        isDateTimePickerOpen: boolean;
        isRepeatPickerOpen:boolean;
        isLoginOpen: boolean;
        isColorPickerOpen : boolean;

        dtpopts : dateTimePicker.DateTimePickerOptions;
        isComponentOpen : boolean

        showDateTimePicker (opts : dateTimePicker.DateTimePickerOptions) : ng.IPromise<Date>;
        showColorPicker (color : string) : ng.IPromise<string>;
        resolveDateTimePicker() : void;
        rejectDateTimePicker(msg?: string) : void;
        resolveRepeatPicker() : void;
        rejectRepeatPicker(msg?: string) : void;
        resolveColorPicker() : void;
        rejectColorPicker(msg?: string) : void;
        showRepeatPicker (opts : repeatpicker.RepeatDirectiveOptions) : ng.IPromise<repeatpicker.RepeatDirectiveOptions>;
        showLogin () : ng.IPromise<model.IUser>;
        hideAll() : void;
        showSimpleToast(message: string) : void;
        showSimpleErrorToast (message : string) : void;
    }
}
