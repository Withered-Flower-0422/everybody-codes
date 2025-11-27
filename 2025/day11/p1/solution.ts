import { readFileSync } from "fs"
import { join } from "path"

const round = (ducks: number[], phase: 1 | 2) => {
    if (phase === 1) {
        for (let i = 0; i < ducks.length - 1; i++) {
            if (ducks[i]! > ducks[i + 1]!) {
                ducks[i]!--
                ducks[i + 1]!++
            }
        }
    } else {
        for (let i = 0; i < ducks.length - 1; i++) {
            if (ducks[i]! < ducks[i + 1]!) {
                ducks[i]!++
                ducks[i + 1]!--
            }
        }
    }
}

const main = (data: string) => {
    const ducks = data.split(/\r?\n/g).map(Number)

    let phase: 1 | 2 = 1
    for (let i = 0; i < 10; i++) {
        if (ducks.every((_, i, arr) => (arr[i + 1] ? arr[i]! <= arr[i + 1]! : true))) phase = 2
        round(ducks, phase)
    }
    return ducks.reduce((a, b, i) => a + b * (i + 1))
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
