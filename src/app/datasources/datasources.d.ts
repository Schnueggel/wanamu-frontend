/**
 * Created by Schnueggel on 07.06.2015.
 */

declare module wanamu {
    interface ISettingData {
        id : number;
        color1: string;
        color2: string;
        color3: string;
        color4: string;
        color5: string;
        face: string;
    }

    interface IUserData {
        id : number;
        firstname : string;
        lastname : string;
        email: string;
        TodoLists : ITodoListData[];
        Setting: ISettingData;
        DefaultTodoListId : number;

    }

    interface ITodoListData {
        id : number;
        name : string;
        Todos : ITodoData [];
    }

    interface ITodoData {
        id : number;
        title : string;
        description : string;
        alarm : string;
        repeat : string;
        deleted: boolean;
        color: string;
    }
}
