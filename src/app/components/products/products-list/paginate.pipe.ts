import { PipeTransform, Pipe } from '@angular/core';
 import { Product } from 'src/app/models/product';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(array: string[], page_size: number | string, page_numbre: number): any {
    if (!array.length) return []

    if(page_size === 'all'){
      return array
    }

    page_size = page_size || 5
    page_numbre = page_numbre || 1
    --page_numbre

//@ts-ignore
    return array.slice(page_numbre * page_size, (page_numbre +1)* page_size)
  }
}
