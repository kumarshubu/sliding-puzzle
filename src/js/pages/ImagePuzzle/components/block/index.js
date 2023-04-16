import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
function index(props) {
  const { number, coordinate, emptyBlock, setEmptyBlock, setVirtualMatrix } =
    props;
  const [currentCoordinate, setCurrentCoordinate] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const [mapping, setMapping] = useState({
    1: [0, 0],
    2: [33.3333, 0],
    3: [66.6667, 0],
    4: [100, 0],
    5: [0, 33.3333],
    6: [33.3333, 33.3333],
    7: [66.6667, 33.3333],
    8: [100, 33.3333],
    9: [0, 66.6667],
    10: [33.3333, 66.6667],
    11: [66.6667, 66.6667],
    12: [100, 66.6667],
    13: [0, 100],
    14: [33.3333, 100],
    15: [66.6667, 100],
    16: [100, 100],
  });
  const swapBlocks = (a, b, i, j, arr) => {
    let temp = arr[a][b];
    arr[a][b] = arr[i][j];
    arr[i][j] = temp;
    return arr;
  };
  const handleTranslate = () => {
    const [row, col] = currentCoordinate;
    const [emptyRow, emptyCol] = emptyBlock;
    let delRow = [-1, 0, 1, 0];
    let delCol = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      if (row + delRow[i] == emptyRow && col + delCol[i] == emptyCol) {
        if (delRow[i] == -1 && delCol[i] == 0) {
          //move up
          setTranslateY((prev) => prev - window.innerWidth / 4);
        } else if (delRow[i] == 0 && delCol[i] == 1) {
          //move right
          setTranslateX((prev) => prev + window.innerWidth / 4);
        } else if (delRow[i] == 1 && delCol[i] == 0) {
          //move down
          setTranslateY((prev) => prev + window.innerWidth / 4);
        } else if (delRow[i] == 0 && delCol[i] == -1) {
          //move left
          setTranslateX((prev) => prev - window.innerWidth / 4);
        }
        setEmptyBlock(currentCoordinate);
        setCurrentCoordinate([row + delRow[i], col + delCol[i]]);
        setVirtualMatrix((prev) =>
          swapBlocks(row - 1, col - 1, emptyRow - 1, emptyCol - 1, prev)
        );
      }
    }
  };

  useEffect(() => {
    setCurrentCoordinate(coordinate);
  }, []);

  return (
    <>
      <div
        id="block"
        onClick={handleTranslate}
        className={styles.block + " " + styles.puzzle + " " + styles.blockDiv}
        style={{
          backgroundPosition: `${
            mapping[number][0] + "%" + " " + mapping[number][1] + "%"
          }`,
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
        {number}
      </div>
    </>
  );
}

export default index;
