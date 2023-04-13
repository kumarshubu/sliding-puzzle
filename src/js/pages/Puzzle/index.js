import React, { useState } from "react";
import styles from "./styles.module.css";
import Block from "./components/block";
function Puzzle() {
  const [blockData, setBlockDate] = useState([1, 2, 3, 4]);
  const [matrixData, setMatrixData] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [emptyBlock, setEmptyBlock] = useState([4, 4]);
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
