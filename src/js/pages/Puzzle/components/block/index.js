import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
function index(props) {
  const { number, coordinate, emptyBlock, setEmptyBlock } = props;
  const [currentCoordinate, setCurrentCoordinate] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleTranslate = () => {
    const [row, col] = currentCoordinate;
    const [emptyRow, emptyCol] = emptyBlock;
    let delRow = [-1, 0, 1, 0];
    let delCol = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      if (row + delRow[i] == emptyRow && col + delCol[i] == emptyCol) {
        if (delRow[i] == -1 && delCol[i] == 0) {
          //move up
          setTranslateY((prev) => prev + -112);
        } else if (delRow[i] == 0 && delCol[i] == 1) {
          //move right
          setTranslateX((prev) => prev + 112);
        } else if (delRow[i] == 1 && delCol[i] == 0) {
          //move down
          setTranslateY((prev) => prev + 112);
        } else if (delRow[i] == 0 && delCol[i] == -1) {
          //move left
          setTranslateX((prev) => prev + -112);
        }
        setEmptyBlock(currentCoordinate);
        setCurrentCoordinate([row + delRow[i], col + delCol[i]]);
      }
    }
  };

  useEffect(() => {
    setCurrentCoordinate(coordinate);
  }, []);
  useEffect(() => {
    console.log("new Current Coordinate", currentCoordinate);
    console.log(translateX, translateY);
  }, [currentCoordinate]);
  useEffect(() => {
    // console.log("new emptyBlock", emptyBlock);
  }, [emptyBlock]);
  return (
    <>
      <div
        onClick={handleTranslate}
        className={styles.blockDiv}
        style={{
          transform:
            translateX && translateY
              ? `translate(${translateX}px,${translateY}px)`
              : translateX
              ? `translateX(${translateX}px)`
              : translateY
              ? `translateY(${translateY}px)`
              : null,
        }}
      >
        <div id="block" className={styles.block}>
          {number}
        </div>
      </div>
    </>
  );
}

export default index;
