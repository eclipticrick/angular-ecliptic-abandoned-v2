import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(arr) {
    console.log('reversing: ', arr)
    if(!arr) return;
    const copy = arr.slice();
    return copy.reverse();
  }
}
