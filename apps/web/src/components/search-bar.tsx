import { Input } from "@web/components/ui/input";
import React from 'react';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <Input
        type="search"
        placeholder="Rechercher un cours..."
        onChange={handleChange}
        className="max-w-xl"
      />
    </div>
  );
};

export default SearchBar;
