import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderById'
})
export class OrderByIdPipe implements PipeTransform {

  private compare(a,b) {
    if (a.$id < b.$id) return -1;
    if (a.$id > b.$id) return 1;
    return 0;
  }

  transform(value) {
    console.log('in OrderByIdPipe pipe!!');
    console.log(value);
    if(!value) return;

    value.sort(this.compare);

    console.log('ordered!!');
    console.log(value);
    return value;
  }

}
