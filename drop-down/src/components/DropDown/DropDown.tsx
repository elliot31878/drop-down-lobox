import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import styles from "./DropDown.module.scss";
import { DROP_DOWN_OPT } from "./constants/DROP_DOWN_OPT";
import { useOnceEffect } from "../../hooks/use-once-effect";

export interface Option {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export interface DropDownProps {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
}

export const DropDown = ({
  options = DROP_DOWN_OPT,
  onChange,
  value,
  placeholder,
  disabled = false,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm(option.label);
    setSelectedOption(option);
  };

  useOnceEffect({
    effect: () => {
      const option = options.find((option) => option.value === value);
      if (option) {
        handleSelect(option);
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className={styles.select} ref={dropdownRef}>
      <section
        className={`${styles.select__control} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <section className={styles.select__search}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredOptions.length > 0) {
                const lastOption = filteredOptions[filteredOptions.length - 1];
                handleSelect(lastOption);
              }
            }}
            onFocus={() => {
              if (!disabled) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder || "Search..."}
            className={styles.select__searchInput}
            disabled={disabled}
          />
        </section>
        <ChevronDownIcon
          className={`${styles.select__arrow} ${isOpen ? styles.rotate : ""}`}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        />
      </section>

      {isOpen && (
        <section className={styles.select__menu}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`${styles.select__option} ${
                  option.value === selectedOption?.value ? styles.selected : ""
                }`}
              >
                <span className={styles.select__label}>{option.label}</span>
                {option.icon}
                {option.value === selectedOption?.value && (
                  <CheckIcon className={styles.select__check} />
                )}
              </button>
            ))
          ) : (
            <span className={styles.select__noOptions}>No options found</span>
          )}
        </section>
      )}
    </section>
  );
};
