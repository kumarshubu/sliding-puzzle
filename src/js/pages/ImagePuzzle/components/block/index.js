import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
function index(props) {
  const { number, coordinate, emptyBlock, setEmptyBlock, setVirtualMatrix } =
    props;
  const [currentCoordinate, setCurrentCoordinate] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [multiplier, setMultiplier] = useState(128);
  // const [mapping, setMapping] = useState([
  //   [
  //     [4, 4],
  //     [3, 4],
  //     [2, 4],
  //     [1, 4],
  //   ],
  //   [
  //     [4, 3],
  //     [3, 3],
  //     [2, 3],
  //     [1, 3],
  //   ],
  //   [
  //     [4, 2],
  //     [3, 2],
  //     [2, 2],
  //     [1, 2],
  //   ],
  //   [
  //     [4, 1],
  //     [3, 1],
  //     [2, 1],
  //     [1, 1],
  //   ],
  // ]);
  const [mapping, setMapping] = useState({
    1: [4, 4],
    2: [3, 4],
    3: [2, 4],
    4: [1, 4],
    5: [4, 3],
    6: [3, 3],
    7: [2, 3],
    8: [1, 3],
    9: [4, 2],
    10: [3, 2],
    11: [2, 2],
    12: [1, 2],
    13: [4, 1],
    14: [3, 1],
    15: [2, 1],
    16: [1, 1],
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
          setTranslateY((prev) => prev + -144);
        } else if (delRow[i] == 0 && delCol[i] == 1) {
          //move right
          setTranslateX((prev) => prev + 144);
        } else if (delRow[i] == 1 && delCol[i] == 0) {
          //move down
          setTranslateY((prev) => prev + 144);
        } else if (delRow[i] == 0 && delCol[i] == -1) {
          //move left
          setTranslateX((prev) => prev + -144);
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
  useEffect(() => {
    // console.log("new Current Coordinate", currentCoordinate);
    // console.log(translateX, translateY);
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
        <div
          id="block"
          className={styles.block + " " + styles.puzzle}
          style={{
            backgroundPosition: `${
              mapping[number][0] * multiplier +
              "px" +
              " " +
              mapping[number][1] * multiplier +
              "px"
            }`,
          }}
        >
          {number}
        </div>
      </div>
    </>
  );
}

export default index;
