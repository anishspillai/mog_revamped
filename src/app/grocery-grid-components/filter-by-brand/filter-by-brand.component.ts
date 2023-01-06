import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrandForFiltering } from 'src/app/shared/model/BrandForFiltering';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-filter-by-brand',
  templateUrl: './filter-by-brand.component.html',
  styleUrls: ['./filter-by-brand.component.scss']
})
export class FilterByBrandComponent {

  @Input() brandForFiltering: BrandForFiltering[];
  @Input() groceryData: IndividualGrocery[]
  selectedBrands: string[] = [];
  filteredGroceryData: IndividualGrocery[] = [];
  @Output() newItemEvent = new EventEmitter<IndividualGrocery[]>();


  addUserSelectedCheckBoxNameToChildView(filterBrandNameString: string) {
    //var d1 = this.elementRef.nativeElement.querySelector('.anish');
    //d1.insertAdjacentHTML('beforeend', '<span class="mx-2 badge bg-secondary">fsdfdf</span>');
    //this.filterProduct(filterBrandNameString)
  }

  OnChange(event: any) {
    this.filteredGroceryData = []
    //We are assigning the selected brand products to the product list and if no brand is selected nothing happens
    for (var i = 0; i < this.selectedBrand.length; i++) {
      var lst = this.groceryData.filter(x => x.brandName == this.selectedBrand[i].brandName);
      for (var j = 0; j < lst.length; j++) {
        this.filteredGroceryData.push(lst[j]);
      }
    }
    this.newItemEvent.emit(this.filteredGroceryData)
  }

  get selectedBrand() {
    //Get all the selected brands
    return this.brandForFiltering.filter(opt => opt.checked)
  }
}