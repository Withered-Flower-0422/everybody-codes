import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    // already sorted
    const ducks = data.split(/\r?\n/g).map(Number)
    const average = ducks.reduce((acc, cur) => acc + cur) / ducks.length
    return ducks.reduce((acc, cur) => acc + (cur > average ? cur - average : 0), 0)
}

// console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
