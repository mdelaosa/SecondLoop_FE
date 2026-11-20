import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ArticuloDetalle } from './articulo-detalle';

describe('ArticuloDetalle', () => {
  let fixture: ComponentFixture<ArticuloDetalle>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloDetalle],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticuloDetalle);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('muestra el título y el precio del artículo', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Chaqueta denim vintage');
    expect(el.querySelector('.info__precio')?.textContent?.replace(/\s/g, ' ')).toContain('38 €');
  });

  it('cambia la imagen principal al pulsar una miniatura', async () => {
    const miniaturas = el.querySelectorAll<HTMLButtonElement>('.miniatura');
    miniaturas[2].click();
    await fixture.whenStable();

    expect(el.querySelector('.galeria__contador')?.textContent).toContain('3 / 4');
    expect(miniaturas[2].classList).toContain('miniatura--activa');
  });

  it('alterna el estado de favorito', async () => {
    const boton = el.querySelector<HTMLButtonElement>('.galeria__favorito')!;
    boton.click();
    await fixture.whenStable();

    expect(boton.getAttribute('aria-pressed')).toBe('true');
  });
});
