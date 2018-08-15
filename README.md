Markov's Bookstore
By Sarah Hailey

# Intro

This program generates random book titles, drawing from over 8000 real book titles from BookReads, retrieved from a dataset at http://kaggle.com. The program extracts the titles from a csv file, creates bigrams (pairs of each word and the word following it) using every word in every title, computes a conditional frequency distribution over these word pairs, and randomly generates titles from the resulting conditional frequency distribution.

## Markov Chains

A Markov chain is a specific kind of Markov model. Specifically, it is 'a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.' It sounds complicated but it isn't: given a dataset with variables that are related to each other (for example, a set of sentences, with words that follow each other), we can calculate how frequently every word is followed by some other word. Then, if we wanted to guess the next word in a sentence, we can assume that it is more likely to be a word that frequently follows it in the overall dataset and less likely to be a word that infrequently follows it.

This program takes a seed word as an argument and then uses a Markov chain to probabilistically predict each word that follows based on it's _conditional probability_-- that is, how frequently it follows the previous word in the entire dataset.

# Steps

## Read Titles

The first step is to parse the text file of titles into a JavaScript array on the backend.

```javascript
const fs = require('fs')
const txt = fs.readFileSync('./book_titles.txt', 'utf-8')
const titles = txt.split('\n')
```

## Tokenize Words

'Tokenizing' refers to splitting each individual word into its own string. It has many challenges (What to do with punctuation? Should 'pair' and 'pairs' and 'pairings' be considered the same word? what about homonyms that are different parts of speech?) But for now we'll keep it very simple and just split each title into an array of words separated by white space.

```javascript
const tokenized_titles = titles.map(title => {
    return title.split(' ')
})
```

## Create Bigrams

Inspired by [this tutorial](http://www.analyticbridge.datasciencecentral.com/profiles/blogs/generating-text-using-a-markov-model), the function 'makePairs' creates bigrams from the dataset. A 'bigram' is just a pair of words that occur next to each other in a dataset. The makePairs function takes in an array of words in a title and outputs an array of bigrams. For example, the array:

```javascript
;['The', 'Cat', 'In', 'The', 'Hat']
```

becomes

```javascript
;[['the', 'cat'], ['cat', 'in'], ['in', 'the'], ['the', 'hat']]
```

To compute the bigrams, we loop through each title and push each bigram into a new array 'pairs'.

```javascript
const pairs = []

//only create bigram if title has more than one word
tokenized_titles.map(title => {
    if (title.length > 1) {
        for (let i = 0; i < title.length - 1; i++) {
            const bigram = [title[i], title[i + 1]]
            pairs.push(bigram)
        }
    }
})
```

## Create The Conditional Frequency Distribution

A conditional frequency distribution (CFD) is the frequency that the second word in a set of bigrams appears after the first. In order words, it is the frequency that the second word occurs _conditional_ on the first word coming before it.

We will store the CFD of each word in an object where each key references an the CFD of each word. Returning to our example above, the CFD would become:

```javascript
// Example Conditional Probability Distribution Dictionary
    {
        'the': { 'cat': 1, 'hat': 1 },
        'cat': { 'in': 1 },
        'in': { 'the': 1 }
    }
```

In this example, the probabilty of the word 'cat' conditional on the word 'the' is 50%. If we were given the word 'the' and wanted to guess what would come next, we should guess 'cat' 50% of the time.

## Generate A Random Title

The function _generateTitle_ will take this CFD as an argument, as well as a seed word to start the process, and a number _num_ that represents how long the title will be.\*

The function will append the seed word (e.g., 'the') to an empty array _title_. Next, it will create a temporary array _probability_spread_ and push every word from CFD['the'] into _probability_spread_ the number of times it follows 'the'. In the example above, this would be:

```javascript
;['cat', 'hat']
```

The resulting _probability_spread_ array will contain each word that follows 'the' in the entire dataset the number of times it follows 'the'.

Finally, the function will select a random word from _probability_spread_ as the next word in the title. Because _probability_spread_ now contains more instances of words that follow 'the' more frequently in the dataset, those words will have a higher probability of being selected, while less-frequent words will still be chosen occasionally.

First, let's write a small helper function for generating a random integer. This will help us select a random word from the probability spread.

```javascript
const randInt = int => {
    return Math.floor(Math.random() * int)
}
```

We'll also write a small helper function to put the title in proper case at the end.

```javascript
const titleCase = titleArray => {
    return titleArray.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
}
```

Now for the fun part: the function that actually generates the titles!

```javascript
const generateTitle = (word = 'the', num = 10) => {
    title = []
    for (let n = 0; n < num; n++) {
        let wordCFD = CFD[word]
        if (!wordCFD) break
        let probability_spread = []
        Object.keys(wordCFD).forEach(key => {
            for (let m = 0; m <= wordCFD[key]; m++) {
                probability_spread.push(key)
            }
        })
        title.push(word)
        word = probability_spread[randInt(probability_spread.length)]
    }
    return title.join(' ')
}
```

And that's it! Here's a sample of the titles generated by this approach:

-   The Guardian
-   The Stars Above
-   The Complete Cartoon Epic Story That Changed The Hidden Oracle Night Over
-   The Mermaids Singing Club A Shoe Dog: A Chance (chance, #1)"
-   The Analyst
-   The Redhead Revealed
-   The Red Pajama"
-   The Lost In You Take The Lone Drow
-   The Ruby In The Warlock
-   The Other Suns: The Scottish Prisoner Of Winter
-   Of Men And Other

Fun!

### Title Endings

There are two minor problems with this approach. First, notice the line near the beginning of the function:

```javascript
if (!wordCFD) break
```

This is a small hack to prevent the program from crashing if a word is selected from _probability_spread_ that never has another word following it in the dataset, but if this will occasionally return a title that is unusually short. Second, if the function ends up selecting words until it reaches _num_ it may select a word that a title would never end with, such as 'of'. Awkward!

Some words should never terminate titles (e.g., 'the'), while some should always terminate titles (e.g., words that never have any words following them), and some should fall in-between, having a probability of terminating a title based on how frequently it occurs at the end of titles in the dataset.

#### Probability of Ending a Sentence

A preliminary approach is to compute a ratio of how frequently a given word ends a title relative to how frequently it occurs overall. The assumption is that words that never occur anywhere but at the end of titles should terminate titles 100% of the time whereas words that never occur at the end of titles should never terminate titles, and the in-between cases should have a probability of terminating titles relative to the aforementioned ratio.

##### Find Endword Frequency Distributions

First, we need a _un_-conditional frequency distribution of all the words in the dataset:

```javascript
// Find frequency distribution for each word
const FD = {}
const flatTitleWords = txt.replace(/\n/g, ' ').split(' ')
flatTitleWords.map(word => {
    FD[word] ? FD[word]++ : (FD[word] = 1)
})
```

We can find all of the 'end words' by simply taking the last word in every title from the title list:

```javascript
// Find endword frequency distribution for each word
const EFD = {}

tokenized_titles.map(title => {
    const lastWord = title[title.length - 1]
    EFD[lastWord] ? EFD[lastWord]++ : (EFD[lastWord] = 1)
})
```

And finally, we can create a _termination probability distribution_ that represents the frequency that each word occurs at the end of a sentence

```javascript
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
```

We can use this TPD to check if the title ends on a word that shouldn't end a sentence (such as 'the'), then it takes a step back and chooses another word. A simple fix, but it definitely impoves the results!

```javascript
const generateTitleWithTPD = (word = 'the', num = 10) => {
    const title = [word]

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
        title.push(word)
        if ((n === 10 && TPD[word] < 0.5) || !TPD[word]) n = 9
    }
    console.log(titleCase(title).join(' '))
    return titleCase(title).join(' ')
}
```

Titles generated from this approach:

-   The Bloodletter's Daughter: A Connecticut Yankee In The Lemonade War Ii And The Three Little House
-   The Last Of The Other Name Of Evidence That Will - The Skin Deep Fathom
-   The Fall Of A Scanner Darkly
-   The Midwife Of Art Of The Fifth Avenue
-   The Art Of The Snowy Day The Aids Epidemic"
-   The Broom Of Being An Officer And Back When The Wolf Brother Odd Apocalypse Suite"
-   The Twits
-   The Universe Versus The Hegemon
-   The Power Of The Calvin And The Saggy Baggy Elephant (little Golden Book)
-   The Rise Of A Carpenter Story
-   The Winter Of Right Thing To Side Gallery 3

And there you have it! There are still small issues that could be improved, but the results are still pretty good!

### P.S.

This project was written using a _literate programming_ approach. Literate programming is a programming paradigm conceived by Donald Knuth that intersperses descriptive writing about the code with the actual code blocks themselves. While there are [many critiques](https://news.ycombinator.com/item?id=10069748) of the literate programming process, I have found it incredibly useful for going through the process of learning and building this project. I recommend that other learners give it a try!
