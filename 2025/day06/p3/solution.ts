import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    // const pattern = data.repeat(1000)
    // console.log("Pattern length:", pattern.length)

    // let res = 0
    // for (let i = 0; i < pattern.length; i++) {
    //     if (i % 100000 === 0) console.log(`Checking index: ${i}`)

    //     if (pattern[i]!.toUpperCase() === pattern[i]) continue
    //     const start = Math.max(0, i - 1000)
    //     const end = Math.min(pattern.length - 1, i + 1000)
    //     for (let j = start; j <= end; j++) {
    //         if (pattern[j]!.toLowerCase() === pattern[j]) continue
    //         if (pattern[j]!.toLowerCase() === pattern[i]) res++
    //     }
    // }
    // return res

    let res1 = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i]!.toUpperCase() === data[i]) continue
        for (let j = i - 1000; j <= i + 1000; j++) {
            const index = ((j % data.length) + data.length) % data.length
            if (data[index]!.toLowerCase() === data[index]) continue
            if (data[index]!.toLowerCase() === data[i]) res1++
        }
    }

    let res2 = 0
    for (let i = 0; i < 1000; i++) {
        if (data[i]!.toUpperCase() === data[i]) continue
        for (let j = i - 1000; j < 0; j++) {
            const index = ((j % data.length) + data.length) % data.length
            if (data[index]!.toLowerCase() === data[index]) continue
            if (data[index]!.toLowerCase() === data[i]) res2++
        }
    }

    let res3 = 0
    for (let i = data.length - 1000; i < data.length; i++) {
        if (data[i]!.toUpperCase() === data[i]) continue
        for (let j = data.length; j <= i + 1000; j++) {
            const index = ((j % data.length) + data.length) % data.length
            if (data[index]!.toLowerCase() === data[index]) continue
            if (data[index]!.toLowerCase() === data[i]) res3++
        }
    }

    return 1000 * res1 - res2 - res3
}

// console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
