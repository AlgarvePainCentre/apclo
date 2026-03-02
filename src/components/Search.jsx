import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { specialitiesCategories, treatmentsCategories, resourceCategories } from '../data/navigation';
import './Search.css';

// Flatten categories for search
const getAllItems = () => {
  const items = [];
  
  const processCategories = (categories, type) => {
    categories.forEach(cat => {
      cat.items.forEach(item => {
        items.push({
          label: item.label,
          path: item.path,
          category: cat.title,
          type: type
        });
      });
    });
  };

  processCategories(specialitiesCategories, 'Speciality');
  processCategories(treatmentsCategories, 'Treatment');
  processCategories(resourceCategories, 'Resource');
  
  return items;
};

const searchItems = getAllItems();

export default function Search({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [popularSearches, setPopularSearches] = useState([
    'Head Pain', 'Sciatica', 'Physiotherapy', 'Back Pain'
  ]); // Mock data, can be dynamic
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchItems.filter(item => 
      item.label.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit results

    setResults(filtered);
    setIsOpen(true);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      } else if (results.length > 0) {
         handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item) => {
    setQuery('');
    setIsOpen(false);
    navigate(item.path);
    if (onNavigate) onNavigate();
    // Add to popular searches (simple implementation)
    // setPopularSearches(prev => [item.label, ...prev.filter(i => i !== item.label)].slice(0, 5));
  };

  return (
    <div className="navbar-search" ref={wrapperRef}>
      <div className="navbar-search-input-wrapper">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="navbar-search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        {query && (
           <button 
             className="search-clear-btn" 
             onClick={() => {
               setQuery('');
               inputRef.current?.focus();
             }}
             aria-label="Clear search"
           >
             ×
           </button>
        )}
      </div>

      {isOpen && (
        <div className="navbar-search-dropdown" id="search-results" role="listbox">
          {query === '' && (
            <div className="search-suggestions">
              <h4 className="search-suggestions-title">Popular Searches</h4>
              <ul className="search-suggestions-list">
                {popularSearches.map((term, index) => (
                  <li key={term}>
                    <button 
                      className="search-suggestion-btn"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query !== '' && results.length === 0 && (
            <div className="search-no-results">
              No results found for "{query}"
            </div>
          )}

          {results.length > 0 && (
            <ul className="search-results-list">
              {results.map((item, index) => (
                <li 
                  key={item.path} 
                  role="option" 
                  aria-selected={index === activeIndex}
                  className={`search-result-item ${index === activeIndex ? 'active' : ''}`}
                >
                  <Link 
                    to={item.path} 
                    className="search-result-link"
                    onClick={() => handleSelect(item)}
                  >
                    <span className="search-result-label">{item.label}</span>
                    <span className="search-result-category">{item.category} • {item.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
