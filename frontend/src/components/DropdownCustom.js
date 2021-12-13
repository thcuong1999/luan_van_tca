import { useState } from "react";
import styled from "styled-components";

function DropdownCustom({
  data,
  selected,
  onClick,
  dropdownStyles,
  dropdownBtnStyles,
  dropdownItemStyles,
  dropdownContentStyles,
  label,
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Dropdown style={dropdownStyles}>
      <DropdownBtn
        onClick={(e) => setIsActive(!isActive)}
        style={dropdownBtnStyles}
      >
        {selected}
        <span className="fas fa-caret-down"></span>
      </DropdownBtn>
      {isActive && (
        <DropdownContent style={dropdownContentStyles}>
          {label && (
            <DropdownItem
              style={dropdownItemStyles}
              onClick={(e) => {
                onClick(label);
                setIsActive(false);
              }}
            >
              {label}
            </DropdownItem>
          )}
          {data &&
            data.map((item) => (
              <DropdownItem
                style={dropdownItemStyles}
                onClick={(e) => {
                  onClick(item);
                  setIsActive(false);
                }}
              >
                {item}
              </DropdownItem>
            ))}
        </DropdownContent>
      )}
    </Dropdown>
  );
}

const Dropdown = styled.div`
  width: 400px;
  user-select: none;
  position: relative;
`;
const DropdownBtn = styled.div`
  padding: 15px 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  font-weight: 400;
  color: #333;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;
const DropdownContent = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: 400;
  color: #333;
  font-family: "Poppins", sans-serif;
  width: 95%;
  max-height: 200px;
  overflow: auto;
  z-index: 999;
`;
const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #f4f4f4;
  }
`;

export default DropdownCustom;
