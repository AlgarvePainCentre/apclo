import { useId, useLayoutEffect, useMemo, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { specialitiesCategories, treatmentsCategories, resourceCategories } from '../data/navigation';
import './Search.css';

const getAllItems = () => {
  const items = [];

  const processCategories = (categories, type) => {
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        items.push({
          label: item.label,
          path: item.path,
          category: cat.title,
          type,
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

export default function Search({ onNavigate, onToggle, variant = 'nav', containerId, dropdownId }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [popularSearches] = useState(['Head Pain', 'Sciatica', 'Physiotherapy', 'Back Pain']);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const generatedListboxId = useId();
  const listboxId = dropdownId || generatedListboxId;
  const [dropdownPos, setDropdownPos] = useState(() => ({
    left: 0,
    top: 0,
    width: 320,
    placement: 'bottom',
  }));

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const wrapper = wrapperRef.current;
      const dropdown = dropdownRef.current;
      const target = event.target;
      const isInsideWrapper = wrapper && wrapper.contains(target);
      const isInsideDropdown = dropdown && dropdown.contains(target);
      if (!isInsideWrapper && !isInsideDropdown) {
        setIsOpen(false);
      } else {
        resetTimeout();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      resetTimeout();
    };
  }, []);

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleFocus = () => {
    resetTimeout();
    setIsOpen(true);
  };

  const computeDropdownPosition = useMemo(() => {
    return () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const rawWidth = rect.width;
      const width = Math.max(0, Math.min(rawWidth, window.innerWidth - 16));
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      const preferredTop = rect.bottom + 10;
      const dropdownEl = dropdownRef.current;
      const measuredHeight = dropdownEl ? dropdownEl.getBoundingClientRect().height : 320;
      const fitsBelow = preferredTop + measuredHeight <= window.innerHeight - 8;
      const top = fitsBelow ? preferredTop : Math.max(8, rect.top - 10 - measuredHeight);
      setDropdownPos({
        left,
        top,
        width,
        placement: fitsBelow ? 'bottom' : 'top',
      });
    };
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    computeDropdownPosition();
  }, [computeDropdownPosition, isOpen, query, results.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onScrollOrResize = () => computeDropdownPosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [computeDropdownPosition, isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 10);

    setResults(filtered);
    setIsOpen(true);
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  const handleSelect = (item) => {
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
    navigate(item.path);
    if (onNavigate) onNavigate();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
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

  const activeOptionId = activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined;

  return (
    <div
      id={containerId}
      className={`navbar-search navbar-search--${variant} ${isOpen ? 'search-open' : ''}`}
      ref={wrapperRef}
    >
      <div className="navbar-search-input-wrapper" onClick={() => inputRef.current?.focus()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search-icon"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="navbar-search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Search"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={isOpen && activeOptionId ? activeOptionId : undefined}
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={(e) => {
              e.preventDefault();
              setQuery('');
              inputRef.current?.focus();
            }}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Clear search"
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            className={`navbar-search-dropdown navbar-search-dropdown--portal navbar-search-dropdown--${dropdownPos.placement}`}
            id={listboxId}
            role="listbox"
            aria-label="Search suggestions"
            ref={dropdownRef}
            style={{ left: `${dropdownPos.left}px`, top: `${dropdownPos.top}px`, width: `${dropdownPos.width}px` }}
            onMouseDown={(e) => {
              if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                e.preventDefault();
              }
            }}
            onPointerDown={() => resetTimeout()}
          >
            {query === '' && (
              <div className="search-suggestions">
                <h4 className="search-suggestions-title">Popular Searches</h4>
                <ul className="search-suggestions-list">
                  {popularSearches.map((term) => (
                    <li key={term}>
                      <button
                        className="search-suggestion-btn"
                        onClick={() => setQuery(term)}
                        onMouseDown={(e) => e.preventDefault()}
                        type="button"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query !== '' && results.length === 0 && (
              <div className="search-no-results">No results found for &quot;{query}&quot;</div>
            )}

            {results.length > 0 && (
              <ul className="search-results-list">
                {results.map((item, index) => (
                  <li
                    key={item.path}
                    role="option"
                    aria-selected={index === activeIndex}
                    id={`${listboxId}-opt-${index}`}
                    className={`search-result-item ${index === activeIndex ? 'active' : ''}`}
                  >
                    <Link
                      to={item.path}
                      className="search-result-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(item);
                      }}
                    >
                      <span className="search-result-label">{item.label}</span>
                      <span className="search-result-category">
                        {item.category} • {item.type}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
