import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) =>
    [...new Set(data.split(",").map(Number))]
        .sort((a, b) => a - b)
        .slice(0, 20)
        .reduce((a, b) => a + b)

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
