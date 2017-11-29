import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHoverFocusComponent } from './test-hover-focus.component';

describe('TestHoverFocusComponent', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHoverFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
