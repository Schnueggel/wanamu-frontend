/**
 * Pads a string on the left site with the pad string To the max length
 *
 * E.g:
 * input: test
 * len: 10
 * pad: +
 * result: ++++++test
 *
 * If pad string is not a char the resulting string will be longer then len
 *
 * If input is longer then len. Input will be returned
 *
 * Default pad string is 0
 * @returns {function(any, number, string): (string)}
 */
export function lpad() : Function {
    return function(input : any, len : number, pad : string){
        // Whatever input comes we need a string, on null or undefined we fail but that is good
        input = input.toString();
        // If input is longer then len, nothing to do
        if(input.length >= len) {
            return input;
        } else {
            // Check is pad string is given else take 0
            pad = (pad || 0).toString();
            // We use arry join to concat the pad string to its total length
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
}
