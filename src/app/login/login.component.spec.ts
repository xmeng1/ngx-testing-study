import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '../model/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // fixture.detectChanges();

    // UserService provided to the TestBed
    authService = TestBed.get(AuthService);

    // get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*  it('needsLogin returns true when the user is not authenticated', () => {
      // spy service and mock the method to return some value
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      expect(component.needsLoginOld()).toBeTruthy();
      // spy service to verify whether method is executed
      expect(authService.isAuthenticated).toHaveBeenCalled();
    });

    it('needsLogin returns false when the user is authenticated', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(component.needsLoginOld()).toBeFalsy();
      expect(authService.isAuthenticated).toHaveBeenCalled();
    });


    it('login button hidden when the user is authenticated', () => {
      // To being with Angular has not done any change detection so the content is blank.
      expect(el.nativeElement.textContent.trim()).toBe('');
      // Trigger change detection and this lets the template update to the initial value which is Login since by
      // default we are not authenticated
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Login');
      // Change the authentication state to true
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      // The label is still Login! We need changeDetection to run and for angular to update the template.
      expect(el.nativeElement.textContent.trim()).toBe('Login');
      // Which we can trigger via fixture.detectChange()
      fixture.detectChanges();
      // Now the label is Logout
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });*/

  it('Button label via jasmine without done', () => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    fixture.detectChanges();
    // When performing testing like ngOnInit(). Angular won’t do this for us in the test environment.
    // we need to call component lifecycle hooks ourselves,
    expect(el.nativeElement.textContent.trim()).toBe('Login');
  });

  it('Button label via jasmine.done', (done) => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    const spy2 = spyOn(authService,
      'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    spy2.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
      done();
    });
  });

  it('Button label via async() and whenStable()', async(() => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
    component.ngOnInit();
  }));

  it('Button label via fakeAsync() and tick()', fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));

});


class MockAuthService extends AuthService {
  isAuthenticated() {
    // return 'Mocked';
    return Promise.resolve(!!localStorage.getItem('token'));
  }

  isAuthenticatedOld() {
    return !!localStorage.getItem('token');
  }
}

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testBedService: AuthService;
  let componentService: AuthService;
  beforeEach(() => {
// refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
// Configure the component with another set of Providers
    TestBed.overrideComponent(
      LoginComponent,
      {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    );
// create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
// get test component from the fixture
    component = fixture.componentInstance;
// AuthService provided to the TestBed
    testBedService = TestBed.get(AuthService);
// AuthService provided by Component, (should return MockAuthService)
    componentService = fixture.debugElement.injector.get(AuthService);
  });
  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(testBedService);
    })
  )
  ;
  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });
});

describe('Component: Login new', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });


  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });


  it('Entering email and password emits loggedIn event', () => {
    let user: User;
    loginEl.nativeElement.value = 'test@example.com';
    passwordEl.nativeElement.value = '123456';

    component.loggedIn.subscribe((value) => user = value);

    // We could call the component.login(…) function ourselves but for the purposes of
    // this lecture we want to trigger the function from the view.
    submitEl.triggerEventHandler('click', null);

    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('123456');
  });
});
