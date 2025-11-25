import { readFileSync } from "fs"
import { join } from "path"

const getPairs = (arr: string[]) => {
    let res = 0
    let mentorNum = 0
    for (let i = 1; i < arr.length; i += 2) {
        res += arr[i]!.length * (mentorNum += arr[i - 1]!.length)
    }
    return res
}

const main = (data: string) => getPairs(data.replace(/[^A^a]/g, "").match(/A+|a+/g)!)

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
