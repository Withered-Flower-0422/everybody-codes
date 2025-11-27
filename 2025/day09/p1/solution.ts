import { readFileSync } from "fs"
import { join } from "path"

const isChild = (child: string, [p1, p2]: [string, string]) => {
    for (let i = 0; i < child.length; i++) {
        if (child[i] !== p1[i] && child[i] !== p2[i]) return false
    }
    return true
}

const classify = (scales: [string, string, string]): { p1: string; p2: string; child: string } => {
    for (const [idx, child] of scales.entries()) {
        const [p1, p2] = scales.toSpliced(idx, 1) as [string, string]
        if (isChild(child, [p1, p2])) return { p1, p2, child }
    }

    throw new Error("Not a chance to run this!")
}

const main = (data: string) => {
    const { p1, p2, child } = classify(
        data.split(/\r?\n/g).map(line => line.split(":")[1]!) as [string, string, string]
    )

    let matching1 = 0
    let matching2 = 0
    for (let i = 0; i < child.length; i++) {
        if (child[i] === p1[i]) matching1++
        if (child[i] === p2[i]) matching2++
    }
    return matching1 * matching2
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
