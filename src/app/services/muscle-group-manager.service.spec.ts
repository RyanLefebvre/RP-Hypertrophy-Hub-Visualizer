import { TestBed } from '@angular/core/testing';

import { MuscleGroupManagerService } from './muscle-group-manager.service';

describe('MuscleGroupManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuscleGroupManagerService = TestBed.get(MuscleGroupManagerService);
    expect(service).toBeTruthy();
  });
});
