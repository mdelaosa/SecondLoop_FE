import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu and update its accessible state', () => {
    const toggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.nav-actions').classList).toContain('is-open');
  });

  it('should show the disconnect button only for authenticated roles', () => {
    for (const role of ['user', 'moderator', 'admin'] as const) {
      const roleFixture = TestBed.createComponent(Navbar);
      roleFixture.componentInstance.userRole = role;
      roleFixture.detectChanges();

      expect(roleFixture.nativeElement.textContent).toContain('Desconectarse');
      roleFixture.destroy();
    }

    expect(fixture.nativeElement.textContent).not.toContain('Desconectarse');
  });
});
