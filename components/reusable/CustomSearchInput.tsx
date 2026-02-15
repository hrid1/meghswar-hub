'use client'

// SimpleSearchInput.tsx
import { Search } from 'lucide-react';
import React from 'react';

interface SimpleSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const CustomSearchInput: React.FC<SimpleSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder={placeholder}
        className={`pl-10 pr-4 py-2.5 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
          disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'bg-white'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSearchInput;


