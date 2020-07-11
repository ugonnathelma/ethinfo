import React, { useState, useRef, useEffect } from "react";
import { StyledSelect, StyledOption, Options } from "./styles";

type OptionType = { label: string; value: string | null };

type DropdownProps = {
  options: OptionType[];
  onSelect: (value: string | null) => void;
  selected?: string | null;
  width?: string;
  height?: string;
  fontSize?: string;
  selectText?: string;
};

const Dropdown = ({
  options,
  onSelect,
  selected,
  selectText = "Select option",
  width,
  height,
  fontSize,
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(selected || null);
  const [showOptions, setShowOptions] = useState(false);
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let newOptions = [...options];
  newOptions.unshift({
    label: selectText,
    value: null,
  });

  const handleClick = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (value: string | null) => {
    setShowOptions(false);
    setSelectedOption(value);
    onSelect(value);
  };

  const getLabel = (value: string | null) =>
    newOptions.find((option) => option.value === value)?.label;

  const handleClickOutside = (event: Event) => {
    const eventTarget = event.target as HTMLDivElement;
    if (elemRef.current?.contains(eventTarget)) {
      // inside click
      return;
    }

    setShowOptions(false);
  };

  return (
    <StyledSelect
      width={width}
      height={height}
      fontSize={fontSize}
      ref={elemRef}
    >
      <StyledOption onClick={handleClick} defaultOption={!selectedOption}>
        {getLabel(selectedOption)}
      </StyledOption>

      {showOptions && (
        <Options>
          {newOptions.map(
            ({ label, value }: OptionType, index) =>
              value !== selectedOption && (
                <StyledOption
                  key={index}
                  onClick={() => handleOptionClick(value)}
                  defaultOption={!value}
                >
                  {label}
                </StyledOption>
              )
          )}
        </Options>
      )}
    </StyledSelect>
  );
};

export default Dropdown;
