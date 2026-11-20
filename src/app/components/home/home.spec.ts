import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //it('should render the navbar inside the home header', () => {
    // Buscar dentro del HTML de HOME el elemento <header>
    //const header = fixture.nativeElement.querySelector('header');

    // Comprueba que dentro del header esté <nav> 
    //expect(header.querySelector('nav[aria-label="Navegación principal"]')).toBeTruthy();
  //});
});
