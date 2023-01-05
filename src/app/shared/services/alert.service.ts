import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert';


@Injectable({
  providedIn: 'root'
})
// https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
export class AlertService {

  private subject = new Subject<Alert>();

  onAlert(): Observable<Alert> {
    return this.subject.asObservable()
  }

  successAlert(message: string) {
    this.alert(new Alert({ message, type: AlertType.Success }))
  }

  failurAlert(message: string) {
    this.alert(new Alert({ message, type: AlertType.Error }))
  }

  private alert(arg0: Alert) {
    this.subject.next(arg0)
  }
}
