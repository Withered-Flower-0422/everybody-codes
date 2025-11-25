import { readFileSync } from "fs"
import { join } from "path"

const complexAdd = ([x1, y1]: [number, number], [x2, y2]: [number, number]): [number, number] => [x1 + x2, y1 + y2]
const complexMultiply = ([x1, y1]: [number, number], [x2, y2]: [number, number]): [number, number] => [
    x1 * x2 - y1 * y2,
    x1 * y2 + x2 * y1,
]
const complexDivide = ([x1, y1]: [number, number], [x2, y2]: [number, number]): [number, number] => [
    (x1 / x2) | 0,
    (y1 / y2) | 0,
]
const cycle100 = (p: [number, number]): [number, number] | null => {
    let r: [number, number] = [0, 0]
    for (let i = 0; i < 100; i++) {
        r = complexMultiply(r, r)
        r = complexDivide(r, [100000, 100000])
        r = complexAdd(r, p)
    }
    return Math.abs(r[0]) > 1000000 || Math.abs(r[1]) > 1000000 ? null : r
}

const main = (data: string) => {
    const grid = 1000
    const a = JSON.parse(data.match(/\[.+?\]/g)![0])
    const b = complexAdd(a, [1000, 1000])
    const dx = (b[0] - a[0]) / grid
    const dy = (b[1] - a[1]) / grid

    let cnt = 0
    for (let i = 0; i <= grid; i++) {
        for (let j = 0; j <= grid; j++) {
            cycle100([a[0] + i * dx, a[1] + j * dy]) && cnt++
        }
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
