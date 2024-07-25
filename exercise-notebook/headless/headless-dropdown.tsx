import React, { RefObject } from "react";
import { DropdownContext, useDropdownContext } from "./dropdown-context";
import { useDropdown } from "./useDropdown";
import { PolymorphicComponentPropsWithoutRef } from "@/polymorphic/type";

export const HeadlessDropdown = <T extends { text: string }>({
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

HeadlessDropdown.Trigger = function Trigger<
  T extends React.ElementType = "button",
>({ as, ...props }: PolymorphicComponentPropsWithoutRef<T>) {
  const { toggleDropdown } = useDropdownContext();
  const Component = as || "button";

  return <Component tabIndex={0} onClick={toggleDropdown} {...props} />;
};

HeadlessDropdown.List = function List<T extends React.ElementType = "ul">({
  as,
  ...props
}: PolymorphicComponentPropsWithoutRef<T>) {
  const { isOpen } = useDropdownContext();
  const Component = as || "ul";
  return isOpen ? <Component {...props} role="listbox" tabIndex={0} /> : null;
};

type OptionProps<T extends { text: string }> = {
  index: number;
  item: T;
};

HeadlessDropdown.Option = function Option<
  P extends { text: string },
  T extends React.ElementType = "li",
>({
  as,
  index,
  item,
  ...props
}: PolymorphicComponentPropsWithoutRef<T, OptionProps<P>>) {
  const { updateSelectedIndex, selectedIndex } = useDropdownContext();
  const Component = as || "li";

  return (
    <Component
      role="option"
      aria-selected={index === selectedIndex}
      key={index}
      onClick={() => updateSelectedIndex(index)}
      {...props}
    >
      {item.text}
    </Component>
  );
};
