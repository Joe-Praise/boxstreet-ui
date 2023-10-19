import React, { useState } from "react";
import "../../styles/select.css";
import { FaChevronRight } from "react-icons/fa";

function Select({ items, onGetHandler, location, value }) {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem("") : setSelectedItem(id);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      {location === true ? (
        <>
          <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem
              ? items.find((item) => item?._id === selectedItem)?.location_id
                  ?.name
              : value}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
              {" "}
              <FaChevronRight />{" "}
            </i>
          </div>
          <div className={`dropdown-body ${isOpen && "open"}`}>
            {items?.map((item, i) => (
              <div
                className="dropdown-item"
                onClick={() => {
                  handleItemClick(item._id);
                  onGetHandler(item);
                }}
                id={item._id}
                key={item._id + i}
              >
                <span
                  className={`dropdown-item-dot ${
                    item._id === selectedItem && "selected"
                  }`}
                >
                  •{" "}
                </span>
                {item.location_id.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem
              ? items.find((item) => item._id === selectedItem).name
              : value}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
              {" "}
              <FaChevronRight />{" "}
            </i>
          </div>
          <div className={`dropdown-body ${isOpen && "open"}`}>
            {items.map((item, i) => (
              <div
                className="dropdown-item"
                onClick={() => {
                  handleItemClick(item._id);
                  onGetHandler(item);
                }}
                id={item._id}
                key={item._id + i}
              >
                <span
                  className={`dropdown-item-dot ${
                    item._id === selectedItem && "selected"
                  }`}
                >
                  •{" "}
                </span>
                {item.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Select;
