import { readFileSync } from "fs"
import { join } from "path"

const isChild = (child: string, [p1, p2]: [string, string]) => {
    for (let i = 0; i < child.length; i++) {
        if (child[i] !== p1[i] && child[i] !== p2[i]) return false
    }
    return true
}

const matching = ({ p1, p2, child }: { p1: string; p2: string; child: string }) => {
    let matching1 = 0
    let matching2 = 0
    for (let i = 0; i < child.length; i++) {
        if (child[i] === p1[i]) matching1++
        if (child[i] === p2[i]) matching2++
    }
    return matching1 * matching2
}

const classify = (scales: string[]) => {
    const res: { p1: string; p2: string; child: string }[] = []
    for (const [idx, child] of scales.entries()) {
        const possibleParents = scales.toSpliced(idx, 1)
        for (let i = 0; i < possibleParents.length - 1; i++) {
            for (let j = i + 1; j < possibleParents.length; j++) {
                if (isChild(child, [possibleParents[i]!, possibleParents[j]!]))
                    res.push({ p1: possibleParents[i]!, p2: possibleParents[j]!, child })
            }
        }
    }
    return res
}

const main = (data: string) =>
    classify(data.split(/\r?\n/g).map(line => line.split(":")[1]!))
        .map(matching)
        .reduce((a, b) => a + b)

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
