import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) =>
    Math.max(
        ...Object.values(
            data
                .split(",")
                .map(Number)
                .reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {} as Record<number, number>)
        )
    )

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
