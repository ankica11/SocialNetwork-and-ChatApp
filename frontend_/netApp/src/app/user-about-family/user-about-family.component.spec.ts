import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutFamilyComponent } from './user-about-family.component';

describe('UserAboutFamilyComponent', () => {
  let component: UserAboutFamilyComponent;
  let fixture: ComponentFixture<UserAboutFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
