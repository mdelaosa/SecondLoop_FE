import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './navbar';

@Component({ template: '' })
class TestRoute {}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([{ path: '**', component: TestRoute }])],
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
    for (const role of ['USUARIO', 'MODERADOR', 'ADMINISTRADOR'] as const) {
      const roleFixture = TestBed.createComponent(Navbar);
      roleFixture.componentRef.setInput('userRole', role);
      roleFixture.detectChanges();

      expect(roleFixture.nativeElement.textContent).toContain('Desconectarse');
      roleFixture.destroy();
    }

    expect(fixture.nativeElement.textContent).not.toContain('Desconectarse');
  });

  it('should show the common shopping links only to regular users', () => {
    const userFixture = TestBed.createComponent(Navbar);
    userFixture.componentRef.setInput('userRole', 'USUARIO');
    userFixture.detectChanges();
    const userLinks = Array.from(
      (userFixture.nativeElement as HTMLElement).querySelectorAll('a'),
    ).map((link) => link.getAttribute('routerLink'));
    expect(userLinks).toContain('/articulos');
    expect(userLinks).toContain('/mensajes');
    expect(userLinks).toContain('/perfil');
    expect(userLinks).toContain('/articulos/nuevo');
    userFixture.destroy();

    for (const role of ['MODERADOR', 'ADMINISTRADOR'] as const) {
      const roleFixture = TestBed.createComponent(Navbar);
      roleFixture.componentRef.setInput('userRole', role);
      roleFixture.detectChanges();
      const links = Array.from(
        (roleFixture.nativeElement as HTMLElement).querySelectorAll('a'),
      ).map((link) => link.getAttribute('routerLink'));
      expect(links).toContain('/articulos');
      expect(links).not.toContain('/mensajes');
      expect(links).not.toContain('/perfil');
      expect(links).not.toContain('/articulos/nuevo');
      expect(links).toContain('/moderacion');
      expect(links.includes('/administracion')).toBe(role === 'ADMINISTRADOR');
      roleFixture.destroy();
    }
  });

  it('should offer auth routes to guests and close the mobile menu after navigation', () => {
    const componentFixture = TestBed.createComponent(Navbar);
    componentFixture.detectChanges();

    const links = Array.from(
      (componentFixture.nativeElement as HTMLElement).querySelectorAll('a'),
    );
    expect(links.map((link) => link.getAttribute('routerLink'))).toContain('/login');
    expect(links.map((link) => link.getAttribute('routerLink'))).toContain('/registro');

    componentFixture.componentInstance.menuOpen = true;
    links.find((link) => link.getAttribute('routerLink') === '/login')?.click();
    expect(componentFixture.componentInstance.menuOpen).toBe(false);
  });

  it('should close the menu when disconnecting', () => {
    const roleFixture = TestBed.createComponent(Navbar);
    roleFixture.componentRef.setInput('userRole', 'USUARIO');
    roleFixture.componentInstance.menuOpen = true;
    roleFixture.detectChanges();

    const disconnect = Array.from(
      (roleFixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ).find((button) => button.textContent?.trim() === 'Desconectarse');
    disconnect?.click();

    expect(roleFixture.componentInstance.menuOpen).toBe(false);
    expect(roleFixture.componentInstance.userRole()).toBe('USUARIO');
    roleFixture.destroy();
  });
});
