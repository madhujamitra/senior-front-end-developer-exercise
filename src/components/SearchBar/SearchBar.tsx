import React, { useState, useRef } from 'react';

interface SearchState {
  location: string;
}

interface SearchBarProps {
  search: SearchState;
  setSearch: (search: SearchState) => void;
}

const exampleCities = [
  'Vancouver',
  'Toronto',
  'Montreal',
  'Ottawa',
];

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, location: e.target.value });
    setDropdownOpen(true);
  };

  const handleFocus = () => setDropdownOpen(true);
  const handleBlur = () => setTimeout(() => setDropdownOpen(false), 150);

  const handleCityClick = (city: string) => {
    setSearch({ ...search, location: city });
    setDropdownOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div style={{ position: 'relative', width: 320, margin: '1rem 0' }}>
      <input
        ref={inputRef}
        type="text"
        name="location"
        placeholder="Search rentals by city, neighbourhood..."
        value={search.location}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: '100%',
          padding: '0.75rem 2.5rem 0.75rem 2.5rem',
          borderRadius: '6px',
          border: '1.5px solid #e0bdbd',
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#b82528', fontSize: 20 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </span>
      {dropdownOpen && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          width: '100%',
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          zIndex: 10,
          padding: '1rem 0',
        }}>
          <div style={{ fontSize: 13, color: '#888', fontWeight: 600, padding: '0 1.5rem 0.5rem 2.5rem' }}>POPULAR CITIES</div>
          {exampleCities.map(city => (
            <div
              key={city}
              onMouseDown={() => handleCityClick(city)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.5rem 1.5rem 0.5rem 2.5rem',
                cursor: 'pointer',
                fontSize: 16,
                color: '#222',
                transition: 'background 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#f9f6f1')}
              onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="18" height="18" fill="none" stroke="#b82528" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>{city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 