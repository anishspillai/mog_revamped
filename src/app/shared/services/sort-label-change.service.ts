import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortLabelChangeService {

  constructor() { }

  private subject = new Subject<boolean>();

  onLabelChange(): Observable<boolean> {
    return this.subject.asObservable()
  }

  private notify(arg0: boolean) {
    this.subject.next(arg0)
  }

  triggerSortEvent(arg0: boolean) {
    this.notify(arg0)
  }
}
