import { Pipe, PipeTransform } from '@angular/core';
import { filter, reverse } from 'lodash';

@Pipe({
  name: 'reverseToasts'
})
export class ReverseToastsPipe implements PipeTransform {

  transform(value) {
    console.log('in reverseToasts pipe!!');
    console.log(value);
    if(!value) return;

    // make sure dismissed toast messages are not shown
    value = filter(value, ['dismissed', false]);

    return reverse(value);
  }

}
