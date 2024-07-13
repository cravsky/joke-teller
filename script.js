const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'bb70e8f210634616ba291aa47079900d',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.joke ? joke = data.joke : joke = `${data.setup} ... ${data.delivery}`;
        toggleButton();
        tellMe(joke);
    } catch (error) {
        console.log('Error: ', error);
    }
}

getJokes();

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);