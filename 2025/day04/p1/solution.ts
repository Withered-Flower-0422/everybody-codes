import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const gears = data.split(/\r?\n/g).map(Number)
    return Math.floor((2025 * gears.at(0)!) / gears.at(-1)!)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
