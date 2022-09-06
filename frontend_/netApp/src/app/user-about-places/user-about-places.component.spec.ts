import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutPlacesComponent } from './user-about-places.component';

describe('UserAboutPlacesComponent', () => {
  let component: UserAboutPlacesComponent;
  let fixture: ComponentFixture<UserAboutPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
