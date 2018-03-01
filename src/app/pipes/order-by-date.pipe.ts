import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  private compare(a,b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  }

  transform(arr) {
    if(!arr) return;
    arr.sort(this.compare);
    return arr;
  }
}
