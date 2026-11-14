const createElementtt = (arr) => {
    const htmlElement = arr.map(el => `<span class ="btn">${el}</span>`)
    return htmlElement.join(' ')
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('words-container').classList.add('hidden')
    } else {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('words-container').classList.remove('hidden')

    }
}


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}


const removeActiv = () => {
    const lessonButtons = document.querySelectorAll('.lession-btn')
    // console.log(lessonButtons)
    lessonButtons.forEach(btn => btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
manageSpinner(true)
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // functionlality which button is active
            removeActiv()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            console.log(clickBtn)
            clickBtn.classList.add('active')

            displayLevelWords(data.data)

        })
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetail(details.data)
}
const displayWordDetail = (word) => {
    const detaiBox = document.getElementById('word-detail-container')
    detaiBox.innerHTML = `
     <div>
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">synonyms</h2>
                  <div>${createElementtt(word.synonyms)}</div>
                </div>

    `

    document.getElementById('word_modal').showModal()

    console.log(word)

}


const displayLevelWords = (words) => {
    const wordsContainer = document.getElementById('words-container')
    wordsContainer.innerHTML = ''
    if (words.length === 0) {
        wordsContainer.innerHTML = `
            <div class="text-center col-span-full space-y-6"> 
                <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h4 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h4>
            </div>
        `
        manageSpinner(false)
        return;
    }
    words.forEach(word => {
        // console.log(word)
        const wordDiv = document.createElement('div')

        wordDiv.innerHTML = `
          <div class="py-14 px-12 text-center bg-white rounded-md shadow-lg space-y-5">
                <h2 class="text-3xl font-bold">${word.word ? word.word : "No woerd founded"}</h2>
                <p class="text-xl font-medium">Meaning /Pronounciation</p>
                <h2 class="font-bangla text-3xl font-semibold">"${word.meaning ? word.meaning : "No meaning found"} / ${word.pronunciation ? word.pronunciation : "no pronounch found"}"</h2>
                <div class="flex justify-between items-center ">

                    <button onclick="loadWordDetails(${word.id})" 
                        class="btn p-4 rounded-lg bg-[#1A91FF1A] hover:bg-[#1A91FF60]">
                       <i class="fa-solid fa-circle-info"></i>
                    </button>

                    <button class="btn p-4 rounded-lg bg-[#1A91FF1A] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume"></i></button>
                </div>
            </div>
        `
        wordsContainer.appendChild(wordDiv)
        manageSpinner(false)
    });
}

const displayLesson = (lessons) => {
    const levelsContaienr = document.getElementById('levels-container');
    // levelsContaienr.innerHTML = ''
    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lession-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        
        `
        levelsContaienr.appendChild(btnDiv)
    });
}

loadLessons()