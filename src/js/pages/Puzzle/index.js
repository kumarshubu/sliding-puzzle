import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Block from "./components/block";
import { shuffle } from "../../constants/helpers";
import { TILE_COUNT } from "../../constants/constants";
function Puzzle() {
  const [hasWon, setHasWon] = useState(false);
  const [blockData, setBlockDate] = useState([1, 2, 3, 4]);
  const [matrixData, setMatrixData] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [virtualMaxtrix, setVirtualMatrix] = useState([]);
  const [emptyBlock, setEmptyBlock] = useState([4, 4]);
  useEffect(() => {
    let blocks = shuffle([...Array(TILE_COUNT).keys()]);
    let temp = [];
    let a = [];
    blocks.forEach((t, i) => {
      if (i % 4 == 0 && a.length) {
        temp = [...temp, a];
        a = [t + 1];
      } else {
        a = [...a, t + 1];
      }
    });
    temp = [...temp, a];
    setMatrixData(JSON.parse(JSON.stringify(temp)));
    setVirtualMatrix(JSON.parse(JSON.stringify(temp)));
  }, []);
  useEffect(() => {
    if (!virtualMaxtrix.length) return;

    let flag = true;
    let temp = [
      ...virtualMaxtrix[0],
      ...virtualMaxtrix[1],
      ...virtualMaxtrix[2],
      ...virtualMaxtrix[3],
    ];
    for (let i = 1; i <= 16; i++) {
      if (temp[i - 1] != i) flag = false;
    }
    setHasWon(flag);
  }, [emptyBlock, virtualMaxtrix]);
  useEffect(() => {
    if (hasWon) {
      alert("You Won!");
    }
  }, [hasWon]);
  return (
    <>
      <div id="container" className={styles.containerTemp}>
        <div className={styles.containerBodyTemp}>
          {blockData.map((b) =>
            blockData.map((p) => {
              return b == 4 && p == 4 ? (
                <></>
              ) : (
                <Block
                  number={matrixData[b - 1][p - 1]}
                  coordinate={[b, p]}
                  emptyBlock={emptyBlock}
                  setEmptyBlock={setEmptyBlock}
                  setVirtualMatrix={setVirtualMatrix}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Puzzle;
