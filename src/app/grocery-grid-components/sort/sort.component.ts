import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IndexUiState } from 'instantsearch.js';
import { Subscription } from 'rxjs';
import { AddresscheckService } from 'src/app/shared/services/addresscheck.service';
import { IndividualGrocery } from 'src/app/shared/services/individual-grocery';
import { SortLabelChangeService } from 'src/app/shared/services/sort-label-change.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit, OnDestroy {

  @Input() groceryInput: IndividualGrocery[]
  @Output() newItemEvent = new EventEmitter<IndividualGrocery[]>();
  private sortLabeSubsription: Subscription;

  constructor(private readonly addressChecker: SortLabelChangeService) {
  }

  ngOnInit(): void {
    this.sortLabeSubsription = this.addressChecker.onLabelChange().subscribe((val) => {
      this.sortFieldHeader = "Sort Fields"
    })
  }


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

  ngOnDestroy() {
    this.sortLabeSubsription.unsubscribe();
  }
}

interface SortValue {
  name: string;
  code: string;
}