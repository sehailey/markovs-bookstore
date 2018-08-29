import CFD from './parser/CFD'
import TPD from './parser/TPD'

export const randInt = int => {
    return Math.floor(Math.random() * int)
}

export const titleCase = titleArray => {
    return titleArray.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
}
export const generateTitleWithTPD = (seedWord = 'the', num = 10) => {
    const title = [seedWord]
    let word = seedWord
    for (let n = 0; n <= num; n++) {
        let wordCFD = CFD[word]
        if (!wordCFD) break
        let probabilitySpread = []
        Object.keys(wordCFD).forEach(key => {
            for (let m = 0; m <= wordCFD[key]; m++) {
                probabilitySpread.push(key)
            }
        })
        word = probabilitySpread[randInt(probabilitySpread.length)]
        title.push(word)
        if ((n === 10 && TPD[word] < 0.5) || !TPD[word]) n = 9
    }
    console.log(titleCase(title).join(' '))

    return titleCase(title).join(' ')
}
