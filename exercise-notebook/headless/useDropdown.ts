import { useRef, useState } from "react";

export const useDropdown = <T extends { text: string }>(items: T[]) => {
  // ... 상태 변수 ...
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const selectedItem = items[selectedIndex] || null;

  // 헬퍼 함수는 UI에 대한 일부 aria 속성을 반환할 수 있습니다.
  const getAriaAttributes = () => ({
    role: "combobox",
    "aria-expanded": isOpen,
    "aria-activedescendant": selectedItem ? selectedItem.text : undefined,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (
      e.key
      // ... 케이스 구문 ...
      // ...  Enter, Space, ArrowDown and ArrowUp 키에 대한 핸들링 ...
    ) {
    }
  };

  const updateSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
    handleKeyDown,
    selectedItem,
    updateSelectedIndex,
    selectedIndex,
    getAriaAttributes,
  };
};
