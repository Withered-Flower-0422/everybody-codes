import { readFileSync } from "fs"
import { join } from "path"

const getNextPoses = (i: number, j: number, s: number, row: number, col: number, maxMoves: number) =>
    (
        [
            [i - 1, j + 2, s + 1],
            [i - 1, j - 2, s + 1],
            [i + 1, j + 2, s + 1],
            [i + 1, j - 2, s + 1],
            [i - 2, j + 1, s + 1],
            [i - 2, j - 1, s + 1],
            [i + 2, j + 1, s + 1],
            [i + 2, j - 1, s + 1],
        ] as [number, number, number][]
    ).filter(([x, y]) => x >= 0 && x < row && y >= 0 && y < col && s < maxMoves)

const findD = (board: string[]): [number, number] => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i]!.length; j++) {
            if (board[i]![j] === "D") {
                return [i, j]
            }
        }
    }
    throw new Error("Not a chance to run this!")
}

const main = (data: string, moves: number) => {
    const board = data.split(/\r?\n/g)
    const row = board.length
    const col = board[0]!.length

    const reachable = new Set<string>()
    const queue: [row: number, col: number, step: number][] = [[...findD(board), 0]]
    while (queue.length > 0) {
        const [i, j, s] = queue.shift()!
        reachable.add(`${i},${j}`)
        queue.push(...getNextPoses(i, j, s, row, col, moves))
    }

    let cnt = 0
    for (const pos of reachable) {
        const [i, j] = pos.split(",").map(Number) as [number, number]
        if (board[i]![j] === "S") cnt++
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8"), 3))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8"), 4))
