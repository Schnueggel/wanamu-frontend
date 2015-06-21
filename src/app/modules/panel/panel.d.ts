declare module wanamu.module.panel {

    interface PanelService {

        repeatopts : repeatpicker.RepeatDirectiveOptions;
        isDateTimePickerOpen: boolean;
        isRepeatPickerOpen:boolean;
        dtpopts : dateTimePicker.DateTimePickerOptions;
        isComponentOpen : boolean

        showDateTimePicker (opts : dateTimePicker.DateTimePickerOptions) : angular.IPromise<Date>;
        resolveDateTimePicker() : void;
        rejectDateTimePicker(msg?: string) : void;
        resolveRepeatPicker() : void;
        rejectRepeatPicker(msg?: string) : void;
        showRepeatPicker (opts : repeatpicker.RepeatDirectiveOptions) : angular.IPromise<repeatpicker.RepeatDirectiveOptions>;
        hideAll() : void;
        showSimpleToast(message: string) : void;
    }
}
