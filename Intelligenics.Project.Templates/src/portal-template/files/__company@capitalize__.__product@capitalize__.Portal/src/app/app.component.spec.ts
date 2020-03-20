import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FrameworkModule } from '@intelligenics/application-framework';

describe('When using the AppComponent component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FrameworkModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('I should be able to create it', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`I should be able to get the title 'portal`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent  = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('portal');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to portal!');
  // });
});
