import React from "react";
import styled from "styled-components";

const StepperMaterial = ({
  dl1success,
  dl2success,
  hdsuccess,
  onClickDl1,
  onClickDl2,
  onClickHd,
  numOfPhanquyen,
}) => {
  return (
    <Wrapper>
      <ul>
        {numOfPhanquyen === 3 ? (
          <>
            <li>
              <i
                class={dl1success ? "fas fa-check" : "fas fa-sync-alt"}
                onClick={dl1success ? onClickDl1 : undefined}
              ></i>
              <div>Đại lý cấp 1</div>
            </li>

            <li>
              <i
                class={dl2success ? "fas fa-check" : "fas fa-sync-alt"}
                onClick={dl2success ? onClickDl2 : undefined}
              ></i>
              <div>Đại lý cấp 2</div>
            </li>

            <li>
              <i
                class={hdsuccess ? "fas fa-check" : "fas fa-sync-alt"}
                onClick={hdsuccess ? onClickHd : undefined}
              ></i>
              <div>Hộ dân</div>
            </li>
          </>
        ) : numOfPhanquyen === 2 ? (
          <>
            <li>
              <i
                class={dl2success ? "fas fa-check" : "fas fa-sync-alt"}
                onClick={dl2success ? onClickDl2 : undefined}
              ></i>
              <div>Đại lý cấp 2</div>
            </li>

            <li>
              <i
                class={hdsuccess ? "fas fa-check" : "fas fa-sync-alt"}
                onClick={hdsuccess ? onClickHd : undefined}
              ></i>
              <div>Hộ dân</div>
            </li>
          </>
        ) : (
          <li className="single">
            <i
              class={hdsuccess ? "fas fa-check" : "fas fa-sync-alt"}
              onClick={hdsuccess ? onClickHd : undefined}
            ></i>
            <div>Hộ dân</div>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: inline-block;
    width: 300px;
    text-align: center;
    position: relative;
    z-index: 1;
    i {
      font-size: 18px;
      background-color: #ccc;
      color: #fff;
      padding: 8px;
      border-radius: 50%;
      margin-bottom: 10px;
      &::after {
        content: "";
        position: absolute;
        height: 4px;
        width: 100%;
        background-color: #ccc;
        left: 0;
        top: 14px;
        z-index: -1;
      }
      &.fa-check {
        background-color: #148e14;
        cursor: pointer;
      }
      &.fa-check::after {
        background-color: #148e14;
      }
    }

    &:first-child {
      i::after {
        width: 50%;
        left: 50%;
      }
    }
    &:last-child {
      i::after {
        width: 50%;
        right: 50%;
      }
    }
    div {
      font-size: 16px;
      color: #555;
    }
  }
  li.single {
    i {
      &::after {
        width: 0;
      }
    }
  }
`;

export default StepperMaterial;
