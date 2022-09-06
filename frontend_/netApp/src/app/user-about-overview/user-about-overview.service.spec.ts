import { TestBed } from '@angular/core/testing';

import { UserAboutOverviewService } from './user-about-overview.service';

describe('UserAboutOverviewService', () => {
  let service: UserAboutOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAboutOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
