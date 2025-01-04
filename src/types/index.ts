export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  color: string;
  category: string;
  tags: string[];
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export type SortOption = 'price-low' | 'price-high' | 'name-asc' | 'name-desc';

export interface ProductFilters {
  category: string;
  search: string;
  sort: SortOption;
  priceRange: [number, number];
} 