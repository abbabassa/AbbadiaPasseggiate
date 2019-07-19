import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-anchor',
  templateUrl: './dynamic-anchor.component.html',
  styleUrls: ['./dynamic-anchor.component.scss']
})
export class DynamicAnchorComponent implements OnInit {

  @Input()
  text : string;

  @Output()
  click = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onClick()
  {
    this.click.emit(true);
  }

}
