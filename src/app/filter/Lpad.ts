export function lpad() : Function {
    return function(input : any, len : number, pad : string){
        input = input.toString();
        if(input.length >= len) return input;
        else{
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
}
