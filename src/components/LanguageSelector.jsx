import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import 'flag-icons/css/flag-icons.min.css';

const languageGroups = [
  {
    title: null,
    languages: [
      { code: 'en-US', name: 'English', countryCode: 'us' },
      { code: 'fr-FR', name: 'French', countryCode: 'fr' },
      { code: 'de-DE', name: 'German', countryCode: 'de' },
      { code: 'es-ES', name: 'Spanish', countryCode: 'es' },
      { code: 'pt-PT', name: 'Portuguese', countryCode: 'pt' },
      { code: 'it-IT', name: 'Italian', countryCode: 'it' },
      { code: 'nl-NL', name: 'Dutch', countryCode: 'nl' },
    ],
  },
  {
    languages: [
      { code: 'da-DK', name: 'Danish', countryCode: 'dk' },
      { code: 'sv-SE', name: 'Swedish', countryCode: 'se' },
      { code: 'no-NO', name: 'Norwegian', countryCode: 'no' },
      { code: 'is-IS', name: 'Icelandic', countryCode: 'is' },
      { code: 'fi-FI', name: 'Finnish', countryCode: 'fi' },
    ],
  },
];

const allLanguages = languageGroups.flatMap((group) => group.languages);

const LanguageSelector = ({
  selectedLanguage = 'en-US',
  onLanguageChange,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen]         = useState(false);
  const [search, setSearch]         = useState('');
  const [focused, setFocused]       = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const triggerRef   = useRef(null);
  const searchRef    = useRef(null);
  const listRef      = useRef(null);
  const containerRef = useRef(null);

  const selectedLang = allLanguages.find((l) => l.code === selectedLanguage) || allLanguages[0];

  const filteredLanguages = search.trim()
    ? allLanguages.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.code.toLowerCase().includes(search.toLowerCase())
      )
    : allLanguages;

  const visibleGroups = search.trim()
    ? [{ title: null, languages: filteredLanguages }]
    : languageGroups;

  const languageIndexByCode = new Map(
    filteredLanguages.map((language, index) => [language.code, index])
  );

  /* ── Compute fixed position from trigger's bounding rect ── */
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect       = triggerRef.current.getBoundingClientRect();
    const dropdownH  = 280;
    const spaceBelow = window.innerHeight - rect.bottom;
    const goUp       = spaceBelow < dropdownH && rect.top > spaceBelow;

    setDropdownStyle({
      position : 'fixed',
      left     : rect.left,
      width    : Math.max(rect.width, 224),
      zIndex   : 9999,
      ...(goUp
        ? { bottom: window.innerHeight - rect.top + 8 }
        : { top   : rect.bottom + 8 }),
    });
  }, []);

  const openDropdown = useCallback(() => {
    updatePosition();
    setIsOpen(true);
    setFocused(-1);
  }, [updatePosition]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setFocused(-1);
  }, []);

  const selectLang = useCallback((code) => {
    onLanguageChange?.(code);
    closeDropdown();
  }, [onLanguageChange, closeDropdown]);

  /* ── Focus search when dropdown opens ── */
  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [isOpen]);

  /* ── Scroll keyboard-focused item into view ── */
  useEffect(() => {
    if (focused >= 0 && listRef.current) {
      listRef.current
        .querySelector(`[data-focus-index="${focused}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [focused]);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const clickedTrigger  = containerRef.current?.contains(e.target);
      const clickedDropdown = e.target.closest('[data-lang-dropdown]');
      if (!clickedTrigger && !clickedDropdown) closeDropdown();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, closeDropdown]);

  /* ── Reposition on scroll / resize ── */
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocused((f) => Math.min(f + 1, filteredLanguages.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocused((f) => Math.max(f - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (focused >= 0 && filteredLanguages[focused]) selectLang(filteredLanguages[focused].code);
        break;
      case 'Escape':
      case 'Tab':
        e.preventDefault();
        closeDropdown();
        break;
      default:
        break;
    }
  };

  /* ── Portal dropdown — renders directly into <body>, bypasses overflow:hidden ── */
  const dropdown = isOpen
    ? createPortal(
        <div
          data-lang-dropdown
          style={dropdownStyle}
          className="rounded-xl overflow-hidden bg-gray-900/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50"
        >
          {/* Search */}
          <div className="p-2 border-b border-white/10">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setFocused(0); }}
              onKeyDown={handleKeyDown}
              placeholder="Search language…"
              aria-label="Search languages"
              className="w-full bg-white/8 text-white text-sm placeholder-white/35 px-3 py-2 rounded-lg outline-none border border-white/10 focus:border-white/30 focus:bg-white/12 transition-all duration-150"
            />
          </div>

          {/* Language list */}
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Select language"
            className="overflow-y-auto overscroll-contain py-1"
            style={{ maxHeight: '220px' }}
          >
            {filteredLanguages.length === 0 ? (
              <li className="px-4 py-3 text-sm text-white/40 text-center select-none">
                No languages found
              </li>
            ) : (
              visibleGroups.map((group) => (
                <li key={group.title || 'base'}>
                  {group.title && (
                    <div className="px-3 pt-3 pb-1 text-[11px] uppercase tracking-[0.08em] text-white/45 select-none">
                      {group.title}
                    </div>
                  )}
                  <ul>
                    {group.languages.map((lang) => {
                      const currentIndex = languageIndexByCode.get(lang.code);
                      const isSelected = lang.code === selectedLanguage;
                      const isFocused = currentIndex === focused;

                      return (
                        <li
                          key={lang.code}
                          role="option"
                          aria-selected={isSelected}
                          data-focus-index={currentIndex}
                          onClick={() => selectLang(lang.code)}
                          onMouseEnter={() => setFocused(currentIndex)}
                          className={[
                            'flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-100 select-none',
                            isFocused || isSelected ? 'bg-white/10' : 'hover:bg-white/8',
                          ].join(' ')}
                        >
                          <span className={`fi fi-${lang.countryCode} inline-block h-4 w-5 rounded-[2px] shadow-sm`} />
                          <span className={`flex-1 text-sm ${isSelected ? 'text-white font-medium' : 'text-white/80'}`}>
                            {lang.name}
                          </span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-white/70 shrink-0" />}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${selectedLang.name}`}
        className={[
          'flex items-center gap-2.5 px-4 py-2.5 rounded-xl',
          'bg-white/10 backdrop-blur-md border border-white/20 text-white',
          'transition-all duration-200 select-none outline-none',
          'hover:bg-white/20 hover:border-white/30',
          'focus-visible:ring-2 focus-visible:ring-white/50',
          'active:scale-[0.98]',
          isOpen   && 'bg-white/20 border-white/30',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        ].filter(Boolean).join(' ')}
      >
        <span className={`fi fi-${selectedLang.countryCode} inline-block h-4 w-5 rounded-[2px] shadow-sm`} />
        <span className="text-sm font-medium tracking-wide whitespace-nowrap">
          {selectedLang.name}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {dropdown}
    </div>
  );
};

export default LanguageSelector;