export function getDifferenceInPercentage(oldValue:number, newValue:number) {
    console.log(oldValue, newValue)
    return ((newValue - oldValue) / oldValue) * 100;
}