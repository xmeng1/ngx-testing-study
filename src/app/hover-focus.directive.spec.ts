import { HoverFocusDirective } from './hover-focus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestHoverFocusComponent } from './testing/test-hover-focus/test-hover-focus.component';
import { DebugElement } from "@angular/core/src/debug/debug_node";
import { By } from '@angular/platform-browser';

describe('HoverFocusDirective', () => {
  it('should create an instance', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });
});

describe('Directive: HoverFocus', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    console.log(inputEl.nativeElement.style.backgroundColor);
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
