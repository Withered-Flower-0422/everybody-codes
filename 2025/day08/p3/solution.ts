import { readFileSync } from "fs"
import { join } from "path"

// a1 < a2
const split = ([a1, a2]: [number, number], nails: number) => {
    const side1 = new Set<number>()
    const side2 = new Set<number>()
    for (let i = a1 + 1; i < a2; i++) side1.add(i)
    for (let i = a2 + 1; i <= nails; i++) side2.add(i)
    for (let i = 1; i < a1; i++) side2.add(i)

    return { side1, side2 }
}

const main = (data: string, nails: number) => {
    const notes = data.split(",").map(Number)

    let max = 0
    for (let i = 1; i <= nails - 1; i++) {
        for (let j = i + 1; j <= nails; j++) {
            let cnt = 0
            for (let k = 0; k < notes.length; k++) {
                if (notes[k] === i && notes[k + 1] === j) cnt++
                if (notes[k] === j && notes[k + 1] === i) cnt++
            }
            const { side1, side2 } = split([i, j], nails)
            for (const num of side1) {
                for (let k = 0; k < notes.length; k++) {
                    if (notes[k] !== num) continue
                    if (notes[k - 1] && side2.has(notes[k - 1]!)) cnt++
                    if (notes[k + 1] && side2.has(notes[k + 1]!)) cnt++
                }
            }
            if (cnt > max) max = cnt
        }
    }
    return max
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8"), 8))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8"), 256))
