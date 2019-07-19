import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAnchorComponent } from './dynamic-anchor.component';

describe('DynamicAnchorComponent', () => {
  let component: DynamicAnchorComponent;
  let fixture: ComponentFixture<DynamicAnchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAnchorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
