import React, { useState } from "react";
import '../../styles/select.css'
import { FaChevronRight } from "react-icons/fa";

const data = [
  { id: 0, option: "Jabi" },
  { id: 1, option: "Maitama" },
  { id: 2, option: "Asokoro" },
  { id: 3, option: "Lugbe" },
  { id: 4, option: "Apo" },
  { id: 5, option: "Katampe" },
  { id: 6, option: "Kubwa" },
];

const theater = [
  { id: 0, cTheater: "Silverbird" },
  { id: 1, cTheater: "FilmBox" },
  { id: 2, cTheater: "Boxstreet Cinema" },
  { id: 3, cTheater: "Genesis Cinema" },
];

function Select() {
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cinema, setCinema] = useState(theater)
  
    const toggleDropdown = () => setOpen(!isOpen);
  
    const handleItemClick = (id) => {
      selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
      setOpen(false);
    };
  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item) => item.id == selectedItem).option
          : "Select your destination"}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
          {" "}
          <FaChevronRight />{" "}
        </i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <div
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
