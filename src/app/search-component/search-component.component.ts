import { Component } from '@angular/core';
import algoliasearch from "algoliasearch/lite";


import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from '../shared/observables/search.service';
import { IndividualGrocery } from '../shared/services/individual-grocery';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {


  searchClient = algoliasearch(
    'ZT1RBSHBBJ',
    '5f9196688a9e6f87d0c658fdd07623de'
  );

  algoliaIndex = this.searchClient.initIndex("groceries")

  filteredGroceryList: IndividualGrocery[] = []

  paginationConfigParameers: any;
  searchQueryParameter: any
  searchString = ''
  validSearchString = false
  isAwaitingPageLoad = false

  constructor(private readonly searchService: SearchService) {
    this.searchService.onSearchInputObservable().pipe(debounceTime(400), distinctUntilChanged()).subscribe(inputString => {
      this.validSearchString = inputString != undefined && inputString.length > 0
      this.searchString = inputString
      this.paginationConfigParameers.currentPage = 1
      this.searchQueryParameter.page = 0
      this.startFilteringWithUserInput()
    })

    this.paginationConfigParameers = {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10
    };

    this.searchQueryParameter = {
      hitsPerPage: 10,
      page: 0
    }
  }

  private startFilteringWithUserInput() {
    if (this.validSearchString) {
      this.isAwaitingPageLoad = true
      this.algoliaIndex.search(this.searchString, this.searchQueryParameter).then(({ hits, nbHits }) => {
        this.isAwaitingPageLoad = false
        this.paginationConfigParameers.totalItems = nbHits
        this.filteredGroceryList = hits as unknown as IndividualGrocery[]
      }
      )
    }
  }

  fetchNextPage($event: number) {
    this.paginationConfigParameers.currentPage = $event
    this.searchQueryParameter.page = $event - 1
    this.startFilteringWithUserInput()
  }
}
