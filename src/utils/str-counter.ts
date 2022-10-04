export function strCounter(str: string, strMaxLength: number) {
    let strLength = str.length;
    let counter = strMaxLength - strLength;
    return [strLength, counter]
}