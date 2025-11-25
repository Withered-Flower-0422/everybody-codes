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
const cycle3 = (a: [number, number]): [number, number] => {
    let r: [number, number] = [0, 0]
    for (let i = 0; i < 3; i++) {
        r = complexMultiply(r, r)
        r = complexDivide(r, [10, 10])
        r = complexAdd(r, a)
    }
    return r
}

const main = (data: string) => JSON.stringify(cycle3(JSON.parse(data.match(/\[.+?\]/g)![0])))

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
