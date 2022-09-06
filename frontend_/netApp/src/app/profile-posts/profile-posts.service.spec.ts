import { TestBed } from '@angular/core/testing';

import { ProfilePostsService } from './profile-posts.service';

describe('ProfilePostsService', () => {
  let service: ProfilePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
