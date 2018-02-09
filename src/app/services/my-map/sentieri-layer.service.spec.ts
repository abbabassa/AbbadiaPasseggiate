import { TestBed, inject } from '@angular/core/testing';

import { SentieriLayerService } from './sentieri-layer.service';

describe('SentieriLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentieriLayerService]
    });
  });

  it('should be created', inject([SentieriLayerService], (service: SentieriLayerService) => {
    expect(service).toBeTruthy();
  }));
});
