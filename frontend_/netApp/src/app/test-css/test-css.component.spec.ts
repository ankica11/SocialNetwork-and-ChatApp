import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCssComponent } from './test-css.component';

describe('TestCssComponent', () => {
  let component: TestCssComponent;
  let fixture: ComponentFixture<TestCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
