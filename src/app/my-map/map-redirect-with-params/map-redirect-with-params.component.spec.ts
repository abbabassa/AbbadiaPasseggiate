import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRedirectWithParamsComponent } from './map-redirect-with-params.component';

describe('MapRedirectWithParamsComponent', () => {
  let component: MapRedirectWithParamsComponent;
  let fixture: ComponentFixture<MapRedirectWithParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRedirectWithParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRedirectWithParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
