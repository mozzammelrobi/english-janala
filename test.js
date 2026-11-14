const createElementtt = (arr) => {
    const htmlElement = arr.map(el => `<span>${el}</span>`)
    console.log(htmlElement.join(' '))
}
const synonyms = ["hi","hello","greart"]
createElementtt(synonyms)
