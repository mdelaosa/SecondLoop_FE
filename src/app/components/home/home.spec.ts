import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the home hero and community impact', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#home-title')?.textContent).toContain('Lo bueno');
    expect(fixture.nativeElement.querySelector('.impact-card strong')?.textContent).toBe('2.840');
    expect(fixture.nativeElement.querySelector('.hero-image-placeholder')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('header')).toBeFalsy();
  });
});
