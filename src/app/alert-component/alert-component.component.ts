import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../shared/model/alert';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent implements OnInit, OnDestroy {

  alertSubscription: Subscription;
  alert: Alert[] = []

  constructor(private readonly alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert().subscribe(alert => {
      this.alert.push(alert)
      if (alert.message) {
        setTimeout(() => this.removeAlert(), 3000)
      }
    })
  }

  removeAlert(): void {
    this.alert = []
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe()
  }

}
