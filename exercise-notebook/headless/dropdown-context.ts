import { createContext, RefObject, useContext } from "react";

type DropdownContextType<T> = {
  isOpen: boolean;
  toggleDropdown: () => void;
  selectedIndex: number;
  selectedItem: T | null;
  updateSelectedIndex: (index: number) => void;
  getAriaAttributes: () => any;
  dropdownRef: RefObject<HTMLElement>;
};

function createDropdownContext<T>() {
  return createContext<DropdownContextType<T> | null>(null);
}

export const DropdownContext = createDropdownContext();

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("컴포넌트는 <Dropdown/> 내에서 사용해야 합니다.");
  }
  return context;
};
