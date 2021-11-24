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
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                reachableBoard[i][j] = ""
            }
        }
        const count = pick[0].team?0:7
        const countPlus = pick[0].team?1:-1
        console.log(count)
        console.log(countPlus)
        const row = parseInt(pick[1])
        const col = parseInt(pick[2])

        for (let i = 0; i < pick[0].forward; i++) {
            if(reachableBoard[row][col-1*countPlus-i*countPlus] === undefined || board[row][col-1*countPlus-i*countPlus].name != ""){
                break
            }
            reachableBoard[row][col-1*countPlus-i*countPlus] = "reachable"
        }
        for (let i = 0; i < pick[0].back; i++) {
            if(reachableBoard[row][col+1*countPlus+i*countPlus] === undefined || board[row][col+1*countPlus+i*countPlus].name != ""){
                break
            }
            reachableBoard[row][col+1*countPlus+i*countPlus] = "reachable"
        }
        for (let i = 0; i < pick[0].left; i++) {
            if(board[row-1*countPlus-i*countPlus] === undefined || board[row-1*countPlus-i*countPlus][col].name != ""){
                break
            }
            reachableBoard[row-1*countPlus-i*countPlus][col] = "reachable"
        }
        for (let i = 0; i < pick[0].right; i++) {
            if(board[row+1*countPlus+i*countPlus] === undefined || board[row+1*countPlus+i*countPlus][col].name != ""){
                break
            }
            reachableBoard[row+1*countPlus+i*countPlus][col] = "reachable"
        }
        for (let i = 0; i < pick[0].cross; i++) {
            if(board[row+1*countPlus+i*countPlus] === undefined || board[row][col+1*countPlus+i*countPlus] === undefined || board[row+1*countPlus+i*countPlus][col+1*countPlus+i*countPlus].name != ""){
                break
            }
            reachableBoard[row+1*countPlus+i*countPlus][col+1*countPlus+i*countPlus] = "reachable"
        }
        for (let i = 0; i < pick[0].cross; i++) {
            if(board[row-1*countPlus-i*countPlus] === undefined || board[row][col-1*countPlus-i*countPlus] === undefined || board[row-1*countPlus-i*countPlus][col-1*countPlus-i*countPlus].name != ""){
                break
            }
            reachableBoard[row-1*countPlus-i*countPlus][col-1*countPlus-i*countPlus] = "reachable"
        }
        for (let i = 0; i < pick[0].cross; i++) {
            if(board[row+1*countPlus+i*countPlus] === undefined || board[row][col-1*countPlus-i*countPlus] === undefined || board[row+1*countPlus+i*countPlus][col-1*countPlus-i*countPlus].name != ""){
                break
            }
            reachableBoard[row+1*countPlus+i*countPlus][col-1*countPlus-i*countPlus] = "reachable"
        }
        for (let i = 0; i < pick[0].cross; i++) {
            if(board[row-1*countPlus-i*countPlus] === undefined || board[row][col+1*countPlus+i*countPlus] === undefined || board[row-1*countPlus-i*countPlus][col+1*countPlus+i*countPlus].name != ""){
                break
            }
            reachableBoard[row-1*countPlus-i*countPlus][col+1*countPlus+i*countPlus] = "reachable"
        }

        return reachableBoard
    }


    function handleClick(row, col) {
        let newArray = [...board]
        if (pick && newArray[row][col].name === "") {
            const reachableBoard = checkRechable()
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