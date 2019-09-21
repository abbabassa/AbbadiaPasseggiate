import { TestBed } from '@angular/core/testing';

import { TrailsService } from './trails.service';

describe('TrailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrailsService = TestBed.get(TrailsService);
    expect(service).toBeTruthy();
  });
});
