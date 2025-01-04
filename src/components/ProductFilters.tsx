import React from 'react';
import { motion } from 'framer-motion';
import type { ProductFilters, SortOption } from '../types';
import { categories } from '../constants/products';
import { FaSearch, FaSort } from 'react-icons/fa';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
];

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search products..."
            className="w-full bg-white/10 text-white placeholder-white/60 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange({ category })}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filters.category === category
                  ? 'bg-primary-green text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative">
          <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange({ sort: e.target.value as SortOption })}
            className="w-full bg-white/10 text-white rounded-lg pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-green"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-6">
        <label className="text-white mb-2 block">Price Range</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={0}
            max={100}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange({
                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
              })
            }
            className="w-full"
          />
          <span className="text-white whitespace-nowrap">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFilters; 