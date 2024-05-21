export const ObjectParamToNumber = (obj:Object, keys:string[]) => {
    keys.forEach((key: string) => {
        if(obj[key]) obj[key] = Number(obj[key])
    })
}
export const ObjectParamToString = (obj:Object, keys:string[]) => {
    keys.forEach((key: string) => {
        if(obj[key]) obj[key] = obj[key].toString()
    })
}
