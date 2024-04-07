import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link',
  standalone: true
})
export class LinkPipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase().split(' ').join('_');
  }

}
