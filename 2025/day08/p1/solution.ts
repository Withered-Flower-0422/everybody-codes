import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string, nails: number) => {
    nails /= 2
    const notes = data.split(",").map(Number)

    let cnt = 0
    for (let i = 0; i < notes.length - 1; i++) {
        if (Math.abs(notes[i + 1]! - notes[i]!) === nails) cnt++
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8"), 8))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8"), 32))
