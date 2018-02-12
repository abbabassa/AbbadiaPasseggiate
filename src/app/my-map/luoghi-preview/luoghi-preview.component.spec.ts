import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuoghiPreviewComponent } from './luoghi-preview.component';

describe('LuoghiPreviewComponent', () => {
  let component: LuoghiPreviewComponent;
  let fixture: ComponentFixture<LuoghiPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuoghiPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuoghiPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
