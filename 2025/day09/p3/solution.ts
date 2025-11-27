import { readFileSync } from "fs"
import { join } from "path"

const isChild = (child: string, [p1, p2]: [string, string]) => {
    for (let i = 0; i < child.length; i++) {
        if (child[i] !== p1[i] && child[i] !== p2[i]) return false
    }
    return true
}

const classify = (scales: string[]) => {
    const res: Set<number>[] = []
    for (const [idx, child] of scales.entries()) {
        const possibleParents = scales.toSpliced(idx, 1)
        for (let i = 0; i < possibleParents.length - 1; i++) {
            for (let j = i + 1; j < possibleParents.length; j++) {
                if (isChild(child, [possibleParents[i]!, possibleParents[j]!]))
                    res.push(new Set([i < idx ? i + 1 : i + 2, j < idx ? j + 1 : j + 2, idx + 1]))
            }
        }
    }
    return res
}

const main = (data: string) => {
    const families = classify(data.split(/\r?\n/g).map(line => line.split(":")[1]!))

    let changed = true
    for (let i = 0; i < families.length; ) {
        if (changed) changed = false
        else i++
        for (let j = i + 1; j < families.length; ) {
            if (families[i]!.isDisjointFrom(families[j]!)) {
                j++
                continue
            }
            families[i] = families[i]!.union(families[j]!)
            families.splice(j, 1)
            changed = true
        }
    }

    return Math.max(...families.map(family => [...family].reduce((a, b) => a + b)))
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
