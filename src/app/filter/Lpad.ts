export function lpad() {
    return function(input, len, pad){
        input = input.toString();
        if(input.length >= len) return input;
        else{
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
}
