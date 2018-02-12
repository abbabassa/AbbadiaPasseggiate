import { Component, OnInit, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';
@Component({
  selector: 'app-luoghi-preview',
  templateUrl: './luoghi-preview.component.html',
  styleUrls: ['./luoghi-preview.component.css']
})
export class LuoghiPreviewComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
 
  details: string;
  sending = false;
 
  constructor(private router: Router) {}

  ngOnInit() {
  }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';
 
    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }
 
  cancel() {
    this.closePopup();
  }
 
  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

}



