import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const [names, instructions] = data.split(/\r?\n\r?\n/g).map(s => s.split(","))

    let pointer = 0
    for (const [dir, ...digits] of instructions!) {
        pointer += +digits.join("") * (dir === "L" ? -1 : 1)
    }
    return names!.at(pointer % names!.length)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
