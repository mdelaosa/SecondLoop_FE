import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Explore } from './explore';

describe('Explore', () => {
  let component: Explore;
  let fixture: ComponentFixture<Explore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Explore],
    }).compileComponents();

    fixture = TestBed.createComponent(Explore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the search screen with eight placeholder cards', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.product-card').length).toBe(8);
    expect(fixture.nativeElement.querySelector('.search-icon')?.getAttribute('src')).toBe(
      '/assets/icon-lupa.svg',
    );
    expect(fixture.nativeElement.querySelector('app-navbar')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeFalsy();
  });

  it('should filter products by the search term', () => {
    const search = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    search.value = 'chaqueta';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.product-card').length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Chaqueta negra fluida');
    expect(fixture.nativeElement.textContent).toContain('Chaqueta workwear');
  });

  it('should filter by size and allow clearing filters', () => {
    component.selectedSize.set('S');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.product-card').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Jersey color block');

    component.clearFilters();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.product-card').length).toBe(8);
  });

  it('should provide the requested sizes, genders, and grouped categories', () => {
    component.filtersOpen.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const sizeCombobox = element.querySelector<HTMLButtonElement>(
      '[role="combobox"][aria-label="Talla"]',
    );
    sizeCombobox?.click();
    fixture.detectChanges();
    const sizeOptions = Array.from(
      element.querySelectorAll<HTMLElement>('#size-options [role="option"]'),
    ).map((option) => option.textContent?.trim());

    const genderCombobox = element.querySelector<HTMLButtonElement>(
      '[role="combobox"][aria-label="Género"]',
    );
    genderCombobox?.click();
    fixture.detectChanges();
    const genderOptions = Array.from(
      element.querySelectorAll<HTMLElement>('#gender-options [role="option"]'),
    ).map((option) => option.textContent?.trim());

    const categoryCombobox = element.querySelector<HTMLButtonElement>(
      '[role="combobox"][aria-label="Categoría"]',
    );
    categoryCombobox?.click();
    fixture.detectChanges();
    const categoryOptions = Array.from(
      element.querySelectorAll<HTMLElement>('#category-options [role="option"]'),
    ).map((option) => option.textContent?.trim());

    expect(sizeOptions).toEqual(['Todas', 'XS', 'S', 'M', 'L', 'XL']);
    expect(genderOptions).toEqual(['Todas', 'Mujer', 'Hombre', 'Unisex']);
    expect(element.querySelector('#category-options [aria-label="Ropa"]')).toBeTruthy();
    expect(element.querySelector('#category-options [aria-label="Accesorios"]')).toBeTruthy();
    expect(categoryOptions).toHaveLength(17);
    expect(sizeOptions.some((size) => Number.isInteger(Number(size)))).toBe(false);
  });

  it('should filter by category', () => {
    component.filtersOpen.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const categoryCombobox = element.querySelector<HTMLButtonElement>(
      '[role="combobox"][aria-label="Categoría"]',
    );
    categoryCombobox?.click();
    fixture.detectChanges();

    const suitOption = Array.from(
      element.querySelectorAll<HTMLButtonElement>('#category-options [role="option"]'),
    ).find((option) => option.textContent?.trim() === 'Trajes y americanas');
    expect(suitOption).toBeTruthy();
    suitOption?.click();
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('Trajes y americanas');
    expect(component.openDropdown()).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.product-card').length).toBe(2);
  });

  it('should toggle a favorite placeholder state', () => {
    const favorite = fixture.nativeElement.querySelector('.favorite-toggle') as HTMLButtonElement;

    expect(favorite.getAttribute('aria-pressed')).toBe('false');
    favorite.click();
    fixture.detectChanges();

    expect(favorite.getAttribute('aria-pressed')).toBe('true');
  });
});
