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

    static createSpine(numList: number[]): SpineSegment {
        const spine = new SpineSegment(numList.shift()!)
        for (const num of numList) spine.addNum(num)
        return spine
    }
}

const main = (data: string) => SpineSegment.createSpine(data.split(":")[1]!.split(",").map(Number)).quality

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
