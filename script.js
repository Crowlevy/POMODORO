let countdown
let minutes = 25

function startTimer() {
    const display = document.getElementById('time')
    const minutesInput = document.getElementById('setMinutes')
    const audio = new Audio('radiohead.mp4')
    if (minutesInput.value !== '') {
        minutes = parseInt(minutesInput.value)
    }
    
    let seconds = 0
    countdown = setInterval(function() {
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        if (minutes === 0 && seconds === 0) {
            clearInterval(countdown)
            playMusic(audio)
            pauseMusic(audio, 10)//PARÂMETRO DE QUANTO TEMPO A MÚSICA VAI DURAR
        
        } else if (seconds === 0) {
            minutes--
            seconds = 59
        } else {
            seconds--
        }
    }, 1000)
}
//FUNCÕES MÚSICA
function playMusic(audio) {
    audio.play()
}
function pauseMusic(audio, delay) {
    setTimeout(function(){
        audio.pause()
    }, delay * 1000)
}

document.getElementById('start').addEventListener('click', startTimer)

document.getElementById('pause').addEventListener('click', function() {
    clearInterval(countdown)
    // AÇÃO DE PAUSA CURTA
})

document.getElementById('longPause').addEventListener('click', function() {
    clearInterval(countdown)
    minutes = 15 // QUANTO TEMPO A PAUSA PODE TER
    startTimer()
})

// CACHE DO USER
const cachedMinutes = localStorage.getItem('userMinutes')
if (cachedMinutes) {
    document.getElementById('setMinutes').value = cachedMinutes
}

// SALVAR CACHE
const saveButton = document.getElementById('saveMinutes')
const userMinutesInput = document.getElementById('userMinutes')

saveButton.addEventListener('click', () => {
    const userMinutes = userMinutesInput.value
    localStorage.setItem('userMinutes', userMinutes)
    document.getElementById('setMinutes').value = userMinutes
    settings.classList.remove('show-settings')
})
