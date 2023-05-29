export class CachedNoise {
    _noiseFn: (x: number, y?: number, z?: number) => number;
    noiseMap: Map<number, number>

    constructor(noiseFn: (x: number, y?: number, z?: number) => number) {
        this._noiseFn = noiseFn
        this.noiseMap = new Map<number, number>()
        console.log(this)
    }

    getNoiseFn(): (x: number, y?: number, z?: number) => number {
        let map = this.noiseMap
        return (x: number, y?: number, z?: number) => {
            // if (!map.has(x)) {
            //     map.set(x, this._noiseFn(x))
            // } else {
            //     console.log("cached")
            // }
            // return map.get(x)
            return 100 * (x%10)
        }
    }
}