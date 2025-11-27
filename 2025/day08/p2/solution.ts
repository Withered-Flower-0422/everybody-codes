import { readFileSync } from "fs"
import { join } from "path"

const isIntersect = ([a1, a2]: [number, number], [b1, b2]: [number, number], nails: number) => {
    const side1 = new Set<number>()
    const side2 = new Set<number>()
    if (a1 > a2) [a1, a2] = [a2, a1]
    for (let i = a1 + 1; i < a2; i++) side1.add(i)
    for (let i = a2 + 1; i <= nails; i++) side2.add(i)
    for (let i = 1; i < a1; i++) side2.add(i)
    return (side1.has(b1) && side2.has(b2)) || (side1.has(b2) && side2.has(b1))
}

const main = (data: string, nails: number) => {
    const notes = data.split(",").map(Number)

    let cnt = 0
    for (let i = 2; i < notes.length - 1; i++) {
        for (let j = 0; j < i - 1; j++) {
            isIntersect([notes[j]!, notes[j + 1]!], [notes[i]!, notes[i + 1]!], nails) && cnt++
        }
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8"), 8))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8"), 256))
