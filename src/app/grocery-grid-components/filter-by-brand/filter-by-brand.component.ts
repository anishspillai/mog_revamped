import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-by-brand',
  templateUrl: './filter-by-brand.component.html',
  styleUrls: ['./filter-by-brand.component.scss']
})
export class FilterByBrandComponent {

  @Input() brandNamesWithCountMap: Map<string, number> = new Map();

  addUserSelectedCheckBoxNameToChildView(filterBrandNameString: string) {
    //var d1 = this.elementRef.nativeElement.querySelector('.anish');
    //d1.insertAdjacentHTML('beforeend', '<span class="mx-2 badge bg-secondary">fsdfdf</span>');
    //this.filterProduct(filterBrandNameString)
  }
}
