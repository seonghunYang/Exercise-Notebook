import { useState } from "react";

interface Item {
  icon: string;
  text: string;
  description: string;
}

type DropdownProps = {
  items: Item[];
};

const Dropdown = ({ items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (
      e.key
      // ... 케이스 구문 ...
      // ...  Enter, Space, ArrowDown and ArrowUp 키에 대한 핸들링 ...
    ) {
    }
  };

  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <Trigger
        label={selectedItem ? selectedItem.text : "Select an item..."}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && <DropdownMenu selectedIndex={selectedIndex} items={items} onItemClick={setSelectedItem} />}
    </div>
  );
};

const Trigger = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <div className="trigger" tabIndex={0} onClick={onClick}>
      <span className="selection">{label}</span>
    </div>
  );
};

const DropdownMenu = ({
  items,
  selectedIndex,
  onItemClick,
}: {
  items: Item[];
  selectedIndex: number;

  onItemClick: (item: Item) => void;
}) => {
  return (
    <div className="dropdown-menu" role="listbox">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className="item-container"
        >
          <img src={item.icon} alt={item.text} />
          <div className="details">
            <div>{item.text}</div>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
