import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddresscheckService {

  constructor() { }

  private subject = new Subject<boolean>();

  onAddressChange(): Observable<boolean> {
    return this.subject.asObservable()
  }

  addressChangeTracker(addressChanged: boolean) {
    this.notify(addressChanged)
  }

  notify(arg0: boolean) {
    this.subject.next(arg0)
  }
}
