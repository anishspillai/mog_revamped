import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart-items-sidebar',
  templateUrl: './view-cart-items-sidebar.component.html',
  styleUrls: ['./view-cart-items-sidebar.component.scss']
})
export class ViewCartItemsSidebarComponent {

  constructor(private router: Router) { }

  moveToOrderPlacementPage() {
    this.router.navigate(['order']);
  }

}
