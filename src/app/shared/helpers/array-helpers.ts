/**
 * Move an element from a specific index to another
 * @param arr generic array - Array to modify
 * @param fromIndex number - Start index of the element
 * @param toIndex number - End index of the element
 */
export function arrayMove(arr: any, fromIndex: number, toIndex: number) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
