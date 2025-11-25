import { readFileSync } from "fs"
import { join } from "path"

const getNext = (name: string, rules: Record<string, string[]>): string[] => {
    if (name.length >= 11) return []
    if (!rules[name.at(-1)!]) return []
    return rules[name.at(-1)!]!.map(n => name + n)
}

const main = (data: string) => {
    const [namesStr, rulesStr] = data.split(/\r?\n\r?\n/g) as [string, string]
    const rules = rulesStr.split(/\r?\n/g).reduce((acc, r) => {
        const [letter, nextLetters] = r.split(">").map(s => s.trim()) as [string, string]
        acc[letter] = nextLetters.split(",")
        return acc
    }, {} as Record<string, string[]>)
    const names = namesStr.split(",").filter(name => {
        for (let i = 0; i < name.length - 1; i++) {
            if (!rules[name[i]!]!.includes(name[i + 1]!)) return false
        }
        return true
    })

    const res: string[] = []
    while (names.length) {
        const name = names.shift()!
        if (name.length >= 7) res.push(name)
        names.push(...getNext(name, rules))
    }
    return new Set(res).size
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
