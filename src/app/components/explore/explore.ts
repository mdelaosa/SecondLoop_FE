import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';

type Gender = 'Mujer' | 'Hombre' | 'Unisex';
type FilterName = 'size' | 'gender' | 'category' | 'condition';

interface Product {
  id: number;
  brand: string;
  name: string;
  size: string;
  gender: Gender;
  category: string;
  price: number;
  condition: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Explore {
  readonly products: Product[] = [
    {
      id: 1,
      brand: 'Massimo Dutti',
      name: 'Blazer de lino crudo',
      size: 'M',
      gender: 'Mujer',
      category: 'Trajes y americanas',
      price: 38,
      condition: 'Muy buen estado',
    },
    {
      id: 2,
      brand: 'COS',
      name: 'Abrigo lana camel',
      size: 'L',
      gender: 'Hombre',
      category: 'Chaquetas, abrigos y cazadoras',
      price: 62,
      condition: 'Como nuevo',
    },
    {
      id: 3,
      brand: 'Arket',
      name: 'Chaqueta negra fluida',
      size: 'M',
      gender: 'Mujer',
      category: 'Chaquetas, abrigos y cazadoras',
      price: 45,
      condition: 'Muy buen estado',
    },
    {
      id: 4,
      brand: 'Suitsupply',
      name: 'Traje gris grafito',
      size: 'XL',
      gender: 'Hombre',
      category: 'Trajes y americanas',
      price: 89,
      condition: 'Buen estado',
    },
    {
      id: 5,
      brand: 'Thinking MU',
      name: 'Jersey color block',
      size: 'S',
      gender: 'Mujer',
      category: 'Jerséis, punto y sudaderas',
      price: 24,
      condition: 'Como nuevo',
    },
    {
      id: 6,
      brand: 'Weekday',
      name: 'Gabardina negra',
      size: 'L',
      gender: 'Hombre',
      category: 'Chaquetas, abrigos y cazadoras',
      price: 49,
      condition: 'Muy buen estado',
    },
    {
      id: 7,
      brand: 'Alohas',
      name: 'Vestido midi negro',
      size: 'M',
      gender: 'Mujer',
      category: 'Vestidos y monos (mujer)',
      price: 42,
      condition: 'Muy buen estado',
    },
    {
      id: 8,
      brand: 'Carhartt WIP',
      name: 'Chaqueta workwear',
      size: 'XL',
      gender: 'Hombre',
      category: 'Chaquetas, abrigos y cazadoras',
      price: 55,
      condition: 'Buen estado',
    },
  ];

  readonly sizes = ['XS', 'S', 'M', 'L', 'XL'];
  readonly genders: { value: Gender; label: string }[] = [
    { value: 'Mujer', label: 'Mujer' },
    { value: 'Hombre', label: 'Hombre' },
    { value: 'Unisex', label: 'Unisex' },
  ];
  readonly categoryGroups = [
    {
      label: 'Ropa',
      categories: [
        'Camisetas y tops',
        'Camisas y blusas',
        'Jerséis, punto y sudaderas',
        'Chaquetas, abrigos y cazadoras',
        'Vestidos y monos',
        'Faldas',
        'Pantalones y vaqueros',
        'Shorts y bermudas',
        'Trajes y americanas',
      ],
    },
    {
      label: 'Accesorios',
      categories: [
        'Bolsos y mochilas',
        'Cinturones',
        'Gorros, gorras y sombreros',
        'Bufandas, guantes y pañuelos',
        'Gafas de sol',
        'Joyería y bisutería',
        'Relojes',
      ],
    },
  ];
  readonly conditions = ['Como nuevo', 'Muy buen estado', 'Buen estado'];

  readonly searchTerm = signal('');
  readonly filtersOpen = signal(false);
  readonly openDropdown = signal<FilterName | null>(null);
  readonly dropdownOpensUp = signal(false);
  readonly dropdownMaxHeight = signal('min(240px, 40vh)');
  readonly selectedSize = signal('');
  readonly selectedGender = signal('');
  readonly selectedCategory = signal('');
  readonly selectedCondition = signal('');
  readonly favoriteIds = signal<Set<number>>(new Set());

  readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase('es');
    const size = this.selectedSize();
    const gender = this.selectedGender();
    const category = this.selectedCategory();
    const condition = this.selectedCondition();

    return this.products.filter((product) => {
      const searchableText =
        `${product.brand} ${product.name} ${product.size} ${product.gender} ${product.condition}`.toLocaleLowerCase(
          'es',
        );

      return (
        (!term || searchableText.includes(term)) &&
        (!size || product.size === size) &&
        (!gender || product.gender === gender) &&
        (!category || product.category === category) &&
        (!condition || product.condition === condition)
      );
    });
  });

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  toggleFilters(): void {
    this.filtersOpen.update((open) => !open);
    this.openDropdown.set(null);
  }

  isDropdownOpen(filter: FilterName): boolean {
    return this.openDropdown() === filter;
  }

  toggleDropdown(filter: FilterName, event: MouseEvent): void {
    if (this.openDropdown() === filter) {
      this.openDropdown.set(null);
      return;
    }

    this.openDropdown.set(filter);
    this.setDropdownPosition(event.currentTarget as HTMLElement);
  }

  selectFilter(filter: FilterName, value: string): void {
    switch (filter) {
      case 'size':
        this.selectedSize.set(value);
        break;
      case 'gender':
        this.selectedGender.set(value);
        break;
      case 'category':
        this.selectedCategory.set(value);
        break;
      case 'condition':
        this.selectedCondition.set(value);
        break;
    }

    this.openDropdown.set(null);
  }

  onDropdownKeydown(event: KeyboardEvent, filter: FilterName): void {
    const dropdown = event.currentTarget as HTMLElement;
    const options = Array.from(dropdown.querySelectorAll<HTMLButtonElement>('[role="option"]'));

    if (event.key === 'Escape') {
      event.preventDefault();
      this.openDropdown.set(null);
      dropdown.querySelector<HTMLButtonElement>('.filter-select')?.focus();
      return;
    }

    if (event.key === 'Tab') {
      this.openDropdown.set(null);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();

    if (this.openDropdown() !== filter) {
      this.openDropdown.set(filter);
      this.setDropdownPosition(dropdown.querySelector<HTMLButtonElement>('.filter-select'));
      const selectedIndex = Math.max(
        options.findIndex((option) => option.getAttribute('aria-selected') === 'true'),
        0,
      );
      queueMicrotask(() => this.focusDropdownOption(dropdown, selectedIndex));
      return;
    }

    const activeIndex = options.indexOf(document.activeElement as HTMLButtonElement);
    const selectedIndex = options.findIndex(
      (option) => option.getAttribute('aria-selected') === 'true',
    );
    const currentIndex = activeIndex >= 0 ? activeIndex : Math.max(selectedIndex, 0);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? options.length - 1
          : Math.min(
              Math.max(currentIndex + (event.key === 'ArrowDown' ? 1 : -1), 0),
              options.length - 1,
            );
    this.focusDropdownOption(dropdown, nextIndex);
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: MouseEvent): void {
    const target = event.target;
    if (target instanceof Element && !target.closest('.filter-dropdown')) {
      this.openDropdown.set(null);
    }
  }

  private focusDropdownOption(dropdown: HTMLElement, index: number): void {
    dropdown.querySelectorAll<HTMLButtonElement>('[role="option"]')[index]?.focus();
  }

  private setDropdownPosition(trigger: HTMLElement | null): void {
    if (!trigger || typeof window === 'undefined') {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const availableAbove = Math.max(rect.top - 12, 0);
    const availableBelow = Math.max(window.innerHeight - rect.bottom - 12, 0);
    const maxHeight = Math.min(240, window.innerHeight * 0.4);
    const opensUp = availableBelow < maxHeight && availableAbove > availableBelow;
    const availableSpace = opensUp ? availableAbove : availableBelow;

    this.dropdownOpensUp.set(opensUp);
    this.dropdownMaxHeight.set(`${Math.max(60, Math.min(maxHeight, availableSpace - 8))}px`);
  }

  clearFilters(): void {
    this.selectedSize.set('');
    this.selectedGender.set('');
    this.selectedCategory.set('');
    this.selectedCondition.set('');
  }

  isFavorite(productId: number): boolean {
    return this.favoriteIds().has(productId);
  }

  toggleFavorite(productId: number): void {
    this.favoriteIds.update((favorites) => {
      const nextFavorites = new Set(favorites);
      if (nextFavorites.has(productId)) {
        nextFavorites.delete(productId);
      } else {
        nextFavorites.add(productId);
      }
      return nextFavorites;
    });
  }
}
