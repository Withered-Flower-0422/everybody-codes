import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const [names, instructions] = data.split(/\r?\n\r?\n/g).map(s => s.split(","))

    for (const [dir, ...digits] of instructions!) {
        const index = (((+digits.join("") * (dir === "L" ? -1 : 1)) % names!.length) + names!.length) % names!.length
        ;[names![0], names![index]] = [names![index]!, names![0]!]
    }
    return names![0]
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
