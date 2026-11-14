const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}

const loadLevelWord = (id) => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWords(data.data))
}

const displayLevelWords = (words) => {
    const wordsContainer = document.getElementById('words-container')
    wordsContainer.innerHTML = ''
    words.forEach(word => {
        console.log(word)
        const wordDiv = document.createElement('div')

        


        wordDiv.innerHTML = `
          <div class="py-14 px-12 text-center bg-white rounded-md shadow-lg space-y-5">
                <h2 class="text-3xl font-bold">${word.word}</h2>
                <p class="text-xl font-medium">Meaning /Pronounciation</p>
                <h2 class="font-bangla text-3xl font-semibold">"${word.meaning} / ${word.pronunciation}"</h2>
                <div class="flex justify-between items-center ">
                    <button class="btn p-4 rounded-lg bg-[#1A91FF1A] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn p-4 rounded-lg bg-[#1A91FF1A] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume"></i></button>
                </div>
            </div>
        `
        wordsContainer.appendChild(wordDiv)
    });
}

const displayLesson = (lessons) => {
    const levelsContaienr = document.getElementById('levels-container');
    levelsContaienr.innerHTML = ''
    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <a class=""><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</a>
        </button>
        
        `
        levelsContaienr.appendChild(btnDiv)
    });
}

loadLessons()