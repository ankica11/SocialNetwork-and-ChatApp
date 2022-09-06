import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutOverviewComponent } from './user-about-overview.component';

describe('UserAboutOverviewComponent', () => {
  let component: UserAboutOverviewComponent;
  let fixture: ComponentFixture<UserAboutOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
