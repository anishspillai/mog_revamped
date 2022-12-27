import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }


  private searchStringSubject = new Subject<string>

  sendNotificationToTheListener(searchInputText: string) {
    this.searchStringSubject.next(searchInputText)
  }

  onSearchInputObservable(): Observable<any> {
    return this.searchStringSubject.asObservable()
  }
}
