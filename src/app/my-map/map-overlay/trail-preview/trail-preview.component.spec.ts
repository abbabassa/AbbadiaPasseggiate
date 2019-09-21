import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailPreviewComponent } from './trail-preview.component';

describe('TrailPreviewComponent', () => {
  let component: TrailPreviewComponent;
  let fixture: ComponentFixture<TrailPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
