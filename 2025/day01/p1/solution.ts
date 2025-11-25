import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const [names, instructions] = data.split(/\r?\n\r?\n/g).map(s => s.split(","))

    let pointer = 0
    for (const [dir, ...digits] of instructions!) {
        const num = +digits.join("")
        if (dir === "L") pointer = Math.max(pointer - num!, 0)
        else pointer = Math.min(pointer + num!, names!.length - 1)
    }
    return names![pointer]
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
