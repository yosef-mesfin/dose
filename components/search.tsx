'use client';
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from './ui/input';
import { FaSearch } from 'react-icons/fa';

export const Search: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const applyQuery = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = value.trim();
    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, 300);

  return (
    <div className="relative w-[40%]">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </span>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          applyQuery(e.target.value);
        }}
        placeholder="Search..."
        className="pl-10 h-12 bg-primary/30"
      />
    </div>
  );
};
