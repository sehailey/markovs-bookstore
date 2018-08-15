const fs = require('fs')

const txt = fs.readFileSync('./book_titles.txt', 'utf-8')
const titles = txt.split('\n')

const tokenized_titles = titles.map(title => {
    return title.split(' ')
})

fs.writeFileSync('tokenized_titles.txt', 'utf-8')

const pairs = []

//only create bigram if title has more than one word
tokenized_titles.map(title => {
    if (title.length > 1) {
        for (let i = 0; i < title.length - 1; i++) {
            const bigram = [title[i].toLowerCase(), title[i + 1].toLowerCase()]
            pairs.push(bigram)
        }
    }
})

const title = 'The Cat In The Hat'

const tokenized_title = ['the', 'cat', 'in', 'the', 'hat']

const exampleBigrams = [
    ['The', 'Cat'],
    ['Cat', 'in'],
    ['in', 'The'],
    ['The', 'Hat']
]

const exampleCFD = {
    the: { cat: 1, hat: 1 },
    cat: { in: 1 },
    in: { the: 1 }
}

const CFD = {}
pairs.map(bigram => {
    const word1 = bigram[0]
    const word2 = bigram[1]

    if (CFD[word1]) {
        CFD[word1][word2] ? CFD[word1][word2]++ : (CFD[word1][word2] = 1)
    } else
        CFD[word1] = {
            [word2]: 1
        }
})

const randInt = int => {
    return Math.floor(Math.random() * int)
}

const titleCase = titleArray => {
    return titleArray.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
}

const generateTitle = (word = 'the', num = 10) => {
    const title = [word]
    for (let n = 0; n <= num; n++) {
        let wordCFD = CFD[word]
        if (!wordCFD) break
        let probability_spread = []
        Object.keys(wordCFD).forEach(key => {
            for (let m = 0; m <= wordCFD[key]; m++) {
                probability_spread.push(key)
            }
        })
        word = probability_spread[randInt(probability_spread.length)]
        title.push(word)
    }
    console.log(titleCase(title).join(' '))
    return titleCase(title).join(' ')
}

// Find frequency distribution for each word
const FD = {}
const flatTitleWords = txt.replace(/\n/g, ' ').split(' ')
flatTitleWords.map(word => {
    FD[word] ? FD[word]++ : (FD[word] = 1)
})

// Find endword frequency distribution for each word
const EFD = {}
tokenized_titles.map(title => {
    const lastWord = title[title.length - 1]
    EFD[lastWord] ? EFD[lastWord]++ : (EFD[lastWord] = 1)
})

// Find termination probability distribution for each word
const TPD = {}

// All words in EFD are in FD at least once
Object.keys(EFD).forEach(key => {
    TPD[key] = EFD[key] / FD[key]
})
// If a word is in FD but not EFD, it never terminates a title
Object.keys(FD).forEach(key => {
    if (!TPD[key]) TPD[key] = 0
})

const generateTitleWithTPD = (seedWord = 'the', num = 10) => {
    const title = [seedWord]
    let word = seedWord
    for (let n = 0; n <= num; n++) {
        let wordCFD = CFD[word]
        if (!wordCFD) break
        let probability_spread = []
        Object.keys(wordCFD).forEach(key => {
            for (let m = 0; m < wordCFD[key]; m++) {
                probability_spread.push(key)
            }
        })
        word = probability_spread[randInt(probability_spread.length)]
        console.log('word ', n, word)
        title.push(word)
        if ((n === 10 && TPD[word] < 0.5) || !TPD[word]) n = 9
    }
    console.log(titleCase(title).join(' '))
    return titleCase(title).join(' ')
}
const runNTimes = (num, func) => {
    for (let i = 0; i <= num; i++) {
        func()
    }
}

runNTimes(10, generateTitleWithTPD)
//generateTitleWithTPD()
