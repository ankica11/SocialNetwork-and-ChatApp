import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutContactComponent } from './user-about-contact.component';

describe('UserAboutContactComponent', () => {
  let component: UserAboutContactComponent;
  let fixture: ComponentFixture<UserAboutContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
