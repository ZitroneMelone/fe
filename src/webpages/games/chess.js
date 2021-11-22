import React, {useEffect, useState} from 'react';
import Cell from "../../components/Cell";
import Pieces from "../../pieces.json"


const Chess = () => {
    const [board, setBoard] = useState([[]])
    const [pick, setPick] = useState("")

    useEffect(() => {
        createBoard()
    }, [])

    function createBoard() {
        let newBoard = new Array(8)
        for (let i = 0; i < newBoard.length; i++) {
            newBoard[i] = new Array(8);
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                newBoard[i][j] = {...Pieces.data[6]}
            }
        }
        for (let i = 0; i < 8; i++) {
            newBoard[i][1] = {...Pieces.data[0]}
            newBoard[i][6] = {...Pieces.data[0]}
            newBoard[i][6].team = true
            newBoard[i][6].turn = true

        }
        newBoard[0][0] = {...Pieces.data[1]}
        newBoard[1][0] = {...Pieces.data[2]}
        newBoard[2][0] = {...Pieces.data[3]}
        newBoard[3][0] = {...Pieces.data[4]}
        newBoard[4][0] = {...Pieces.data[5]}
        newBoard[5][0] = {...Pieces.data[3]}
        newBoard[6][0] = {...Pieces.data[2]}
        newBoard[7][0] = {...Pieces.data[1]}

        for (let i = 0; i < 8; i++) {
            newBoard[i][7] = {...newBoard[i][0]}
            newBoard[i][7].team = true
            newBoard[i][7].turn = true
        }

        let color = true
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                newBoard[i][j].color = color
                color = !color
            }
            color = !color
        }
        setBoard(newBoard)
    }

    //i === row && j < col && j >= col - pick[0].forward

    function checkRechable() {
        let reachableBoard = new Array(8);

        for (let i = 0; i < reachableBoard.length; i++) {
            reachableBoard[i] = new Array(8);
        }
        const row = parseInt(pick[1])
        const col = parseInt(pick[2])
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i === row && j < col && j >= col - pick[0].forward) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i === row && j > col && j <= col + pick[0].back) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i < row && j === col && i >= row - pick[0].left) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i > row && j === col && i <= row + pick[0].right) {
                    reachableBoard[i][j] = "reachable"
                }
                if (pick[0].cross === 16) {
                    if (i - j === row - col) {
                        reachableBoard[i][j] = "reachable"
                    }
                    if (i - row + j - col === 0) {
                        reachableBoard[i][j] = "reachable"
                    }
                }
                if (pick[0].cross === 2) {
                    if (i - j === row - col) {
                        if (i + j - row - col === 2 || i + j - row - col === -2) {
                            reachableBoard[i][j] = "reachable"
                        }
                    }
                    if (i - row + j - col === 0) {
                        if (i - row === -1 && j - col === 1) {
                            reachableBoard[i][j] = "reachable"
                        }
                        if (i - row === 1 && j - col === -1) {
                            reachableBoard[i][j] = "reachable"
                        }
                    }
                }
            }
        }

        return reachableBoard
    }

    // Figuren springen über andere Figuren

    function checkRechableWhite() {
        let reachableBoard = new Array(8);

        for (let i = 0; i < reachableBoard.length; i++) {
            reachableBoard[i] = new Array(8);
        }
        const row = parseInt(pick[1])
        const col = parseInt(pick[2])
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i === row && j > col && j <= col + pick[0].forward) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i === row && j < col && j >= col - pick[0].back) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i > row && j === col && i <= row + pick[0].left) {
                    reachableBoard[i][j] = "reachable"
                }
                if (i < row && j === col && i >= row - pick[0].right) {
                    reachableBoard[i][j] = "reachable"
                }
                if (pick[0].cross === 16) {
                    if (i - j === row - col) {
                        reachableBoard[i][j] = "reachable"
                    }
                    if (i - row + j - col === 0) {
                        reachableBoard[i][j] = "reachable"
                    }
                }
                if (pick[0].cross === 2) {
                    if (i - j === row - col) {
                        if (i + j - row - col === 2 || i + j - row - col === -2) {
                            reachableBoard[i][j] = "reachable"
                        }
                    }
                    if (i - row + j - col === 0) {
                        if (i - row === -1 && j - col === 1) {
                            reachableBoard[i][j] = "reachable"
                        }
                        if (i - row === 1 && j - col === -1) {
                            reachableBoard[i][j] = "reachable"
                        }
                    }
                }
            }
        }

        return reachableBoard
    }

    function handleClick(row, col) {
        let newArray = [...board]
        if (pick && newArray[row][col].name === "") {
            const reachableBoard = pick[0].team?checkRechable():checkRechableWhite()
            if (reachableBoard[row][col] == "reachable") {
                const movedPiece = {...pick[0]}
                movedPiece.color = newArray[row][col].color
                newArray[row][col] = movedPiece
                let leftPiece = {...Pieces.data[6]}
                leftPiece.color = newArray[pick[1]][pick[2]].color
                newArray[pick[1]][pick[2]] = leftPiece
                setPick(null)
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        newArray[i][j].turn = !newArray[i][j].turn
                    }
                }
            }
        }
        if (newArray[row][col].name === "" || !newArray[row][col].turn) {
            return;
        }
        if (pick) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    newArray[i][j].clicked = false
                }
            }
            newArray[row][col].clicked = true
            setBoard(newArray)
            setPick([board[row][col], row, col])
            return
        }
        newArray[row][col].clicked = true
        setBoard(newArray)
        setPick([board[row][col], row, col])
    }

    return (
        <div>
            <div className={"Board"}>
                {board.map((row, rowkey) => {
                    return (<div key={rowkey}> {row.map((col, colkey) => {
                        return (
                            <Cell props={board[rowkey][colkey]} onClick={() => {
                                handleClick(rowkey, colkey)
                            }} key={colkey}></Cell>
                        )
                    })}
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Chess;