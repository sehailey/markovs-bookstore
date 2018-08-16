const fs = require('fs')

const txt = fs.readFileSync('./book_titles.txt', 'utf-8')
const titles = txt.split('\n')
const tokenized_titles = titles.map(title => {
    return title.split(' ')
})

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

fs.writeFileSync('./CFD.json', JSON.stringify(CFD), 'utf-8')
fs.writeFileSync('./TPD.json', JSON.stringify(TPD), 'utf-8')
