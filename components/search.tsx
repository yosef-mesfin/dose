'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { FaSearch } from 'react-icons/fa';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-[40%]">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </span>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="pl-10 h-12 bg-primary/30"
      />
    </div>
  );
};
