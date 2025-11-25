import { readFileSync } from "fs"
import { join } from "path"

class SpineSegment {
    left: number | null = null
    right: number | null = null
    next: SpineSegment | null = null

    constructor(public middle: number) {}

    addNum(num: number) {
        let seg: SpineSegment = this
        while (true) {
            if (num < seg.middle) {
                if (seg.left === null) {
                    seg.left = num
                    break
                } else {
                    if (seg.next === null) {
                        seg.next = new SpineSegment(num)
                        break
                    } else {
                        seg = seg.next
                    }
                }
            } else if (num > seg.middle) {
                if (seg.right === null) {
                    seg.right = num
                    break
                } else {
                    if (seg.next === null) {
                        seg.next = new SpineSegment(num)
                        break
                    } else {
                        seg = seg.next
                    }
                }
            } else {
                if (seg.next === null) {
                    seg.next = new SpineSegment(num)
                    break
                } else {
                    seg = seg.next
                }
            }
        }
    }

    get quality() {
        let res = ""
        let seg: SpineSegment | null = this
        while (seg) {
            res += seg.middle
            seg = seg.next
        }
        return +res
    }

    get num() {
        return +`${this.left === null ? "" : this.left}${this.middle}${this.right === null ? "" : this.right}`
    }

    static createSpine(numList: number[]): SpineSegment {
        const spine = new SpineSegment(numList.shift()!)
        for (const num of numList) spine.addNum(num)
        return spine
    }
}

const main = (data: string) =>
    data
        .split(/\r?\n/g)
        .map(line => {
            const [id, numbers] = line.split(":") as [string, string]
            return { id: +id, spine: SpineSegment.createSpine(numbers.split(",").map(Number)) }
        })
        .sort(({ id: aid, spine: a }, { id: bid, spine: b }) => {
            const aq = a.quality
            const bq = b.quality
            if (aq !== bq) return bq - aq

            let segA: SpineSegment | null = a
            let segB: SpineSegment | null = b
            while (true) {
                if (segA === null && segB === null) return +bid - +aid
                if (segA === null) return 1
                if (segB === null) return -1
                if (segA.num < segB.num) return 1
                if (segA.num > segB.num) return -1
                segA = segA.next
                segB = segB.next
            }
        })
        .map(({ id }) => id)
        .reduce((acc, cur, idx) => acc + cur * (idx + 1))

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
