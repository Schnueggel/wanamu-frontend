declare module wanamu.module.panel {

    interface IPanelService {

        repeatopts : repeatpicker.RepeatDirectiveOptions;
        isDateTimePickerOpen: boolean;
        isRepeatPickerOpen:boolean;
        isLoginOpen: boolean;
        isColorPickerOpen : boolean;

        dtpopts : dateTimePicker.DateTimePickerOptions;
        isComponentOpen : boolean
        /**
         * Contains Objects that are syncing push any Item inside you want as long as there are one item inside the application is in syncing mode
         * Dont forget to remove the item after syncing finished
         * @type {Array}
         */
        syncpool : any[];

        showDateTimePicker (opts:dateTimePicker.DateTimePickerOptions) : ng.IPromise<Date>;
        showColorPicker (color:string) : ng.IPromise<string>;
        resolveDateTimePicker() : void;
        rejectDateTimePicker(msg?:string) : void;
        resolveRepeatPicker() : void;
        rejectRepeatPicker(msg?:string) : void;
        resolveColorPicker() : void;
        rejectColorPicker(msg?:string) : void;
        showRepeatPicker (opts:repeatpicker.RepeatDirectiveOptions) : ng.IPromise<repeatpicker.RepeatDirectiveOptions>;
        showLogin () : ng.IPromise<model.IUser>;
        hideAll() : void;
        showSimpleToast(message:string) : void;
        showSimpleErrorToast (message:string) : void;

        /**
         * Add any item to the sync pool as long as if the one item in the pool the application is in the syncing mode
         * @param item
         */
        addToSyncPool(item:any) : void;

        /**
         * Remove item from syncpool
         * @param item
         */
        removeFromSyncPool(item:any) : void;
    }
}
