import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IndexUiState } from 'instantsearch.js';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {

  @Input() groceryInput: IndividualGrocery[]
  @Output() newItemEvent = new EventEmitter<IndividualGrocery[]>();

  sortValues: SortValue[] = [{ name: 'Sort By Brand Type', code: 'brandName' },
  { name: 'Price: Low to High', code: 'lowPrice' },
  { name: 'Price: High to Low', code: 'highPrice' },
  { name: 'Sort By Grocery Type', code: 'type' },
  { name: 'Sort By Weight', code: 'weight' }
  ]

  sortFieldHeader = "Sort Fields"

  performSorting(sortField: SortValue) {
    if (this.groceryInput) {
      if (sortField.code === "lowPrice") {
        this.groceryInput.sort((a, b) => a.actualPrice! - b.actualPrice!)
      } else if (sortField.code === "highPrice") {
        this.groceryInput.sort((a, b) => b.actualPrice! - a.actualPrice!)
      } else if (sortField.code === "brandName") {
        this.groceryInput.sort((a, b) => a.brandName!.localeCompare(b.brandName!))
      } else if (sortField.code === "type") {
        this.groceryInput.sort((a, b) => a.type!.localeCompare(b.type!))
      } else if (sortField.code === "weight") {
        this.groceryInput.sort((a, b) => a.weight! - b.weight!)
      }
      this.sortFieldHeader = sortField.name
    }
    this.newItemEvent.emit(this.groceryInput)
  }
}


interface SortValue {
  name: string;
  code: string;
}