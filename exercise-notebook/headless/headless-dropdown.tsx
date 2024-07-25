import { RefObject } from "react";
import { DropdownContext } from "./dropdown-context";
import { useDropdown } from "./useDropdown";

const HeadlessDropdown = <T extends { text: string }>({
  children,
  items,
}: {
  children: React.ReactNode;
  items: T[];
}) => {
  const {
    isOpen,
    toggleDropdown,
    handleKeyDown,
    selectedItem,
    selectedIndex,
    dropdownRef,
    getAriaAttributes,
    updateSelectedIndex,
  } = useDropdown(items);

  return (
    <DropdownContext.Provider
      value={{
        getAriaAttributes,
        isOpen,
        dropdownRef,
        toggleDropdown,
        selectedIndex,
        selectedItem,
        updateSelectedIndex,
      }}
    >
      <div
        ref={dropdownRef as RefObject<HTMLDivElement>}
        {...getAriaAttributes()}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
