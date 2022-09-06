import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutWorkEducationComponent } from './user-about-work-education.component';

describe('UserAboutWorkEducationComponent', () => {
  let component: UserAboutWorkEducationComponent;
  let fixture: ComponentFixture<UserAboutWorkEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutWorkEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutWorkEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
