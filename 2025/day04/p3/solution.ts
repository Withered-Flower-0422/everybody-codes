import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const gears = data.split(/\r?\n/g)
    return Math.floor(
        100 *
            ((+gears.shift()! / +gears.pop()!) *
                gears
                    .map(s => {
                        const [a, b] = s.split("|").map(Number)
                        return b! / a!
                    })
                    .reduce((a, b) => a * b, 1))
    )
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
