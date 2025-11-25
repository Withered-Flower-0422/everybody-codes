import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const [namesStr, rulesStr] = data.split(/\r?\n\r?\n/g) as [string, string]
    const names = namesStr.split(",").map((name, id) => ({ id: id + 1, name }))
    const rules = rulesStr.split(/\r?\n/g).reduce((acc, r) => {
        const [letter, nextLetters] = r.split(">").map(s => s.trim()) as [string, string]
        acc[letter] = new Set(nextLetters.split(","))
        return acc
    }, {} as Record<string, Set<string>>)

    return names
        .filter(({ name }) => {
            for (let i = 0; i < name.length - 1; i++) {
                if (!rules[name[i]!]!.has(name[i + 1]!)) return false
            }
            return true
        })
        .map(({ id }) => id)
        .reduce((acc, id) => acc + id)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
