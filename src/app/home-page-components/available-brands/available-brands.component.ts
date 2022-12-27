import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-brands',
  templateUrl: './available-brands.component.html',
  styleUrls: ['./available-brands.component.scss']
})
export class AvailableBrandsComponent implements OnInit {
  ngOnInit(): void {

    let items = document.querySelectorAll('.justify-content-center .carousel .carousel-item')
    items.forEach((el) => {
      const minPerSlide = 6
      let next = el.nextElementSibling
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.childNodes[0])
        next = next.nextElementSibling
      }
    })
  }
}


