import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutDetailsComponent } from './user-about-details.component';

describe('UserAboutDetailsComponent', () => {
  let component: UserAboutDetailsComponent;
  let fixture: ComponentFixture<UserAboutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
