import { BaseController } from './BaseController';

export class BaseDirective {

    public controller: Function ;
    public controllerAs: string;
    public bindToController: Object;
    public scope: boolean = true;
    public replace: boolean = false;
    public restrict: string = 'E';
    public link: Function;

}
