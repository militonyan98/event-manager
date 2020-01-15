import { TestBed } from '@angular/core/testing';

import { BackendConnectService } from './backend-connect.service';

describe('BackendConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendConnectService = TestBed.get(BackendConnectService);
    expect(service).toBeTruthy();
  });
});
