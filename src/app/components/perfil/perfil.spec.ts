import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Perfil } from './perfil';

function crear(propio: boolean) {
  TestBed.configureTestingModule({
    imports: [Perfil],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { data: { propio } },
          paramMap: of(convertToParamMap({ id: '2' })),
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(Perfil);
  fixture.detectChanges();
  return { component: fixture.componentInstance, el: fixture.nativeElement as HTMLElement };
}

describe('Perfil', () => {
  it('perfil propio: muestra todos los artículos con su estado, email y Editar perfil', () => {
    const { component, el } = crear(true);
    expect(component.esPropio).toBe(true);
    expect(el.querySelectorAll('.card').length).toBe(5);
    expect(el.querySelectorAll('.badge').length).toBe(5);
    expect(el.textContent).toContain('Editar perfil');
    expect(el.textContent).toContain('@example.com');
    expect(el.textContent).not.toContain('Reportar usuario');
  });

  it('perfil público: solo publicados, sin email y con Reportar usuario', () => {
    const { component, el } = crear(false);
    expect(component.esPropio).toBe(false);
    expect(component.articulos().every((a) => a.estado === 'PUBLICADO')).toBe(true);
    expect(el.querySelectorAll('.badge').length).toBe(0);
    expect(el.textContent).not.toContain('@');
    expect(el.textContent).not.toContain('Editar perfil');
    expect(el.textContent).toContain('Reportar usuario');
  });
});
