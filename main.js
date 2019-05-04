$('document').ready(() => {
    $('#addPersonButton').on('click', function () {
        addPerson();
    });
});

function addPerson() {
    let person = $('#nameInput').val();
    $('#nameInput').val('');
    
    say(getRandomGreeting() + ', ' + person + '. Willkommen beim Spiessli Master 3000! Schön das du da bist! Neben deinem Namen kannst du' +
    'einen Timer stellen, und ich erinnere dich sobald dieser abgelaufen ist');
    say('Geniess die Party!' + getRandomCheers());

    $('#tableBody').append('<tr id="row' + person + '"><td>' + person + '</td>' +
        '<td id="timer' + person + '">' +
        '</td>' + 
        '<td align="right">' +
            '<img onclick="deletePerson(\'' + person + '\')" src="https://img.icons8.com/color/48/000000/close-window.png">' +
        '</td>' + 
        '</tr>'
    );
    $('#timer' + person).html(buildTimer(person));
}

function buildTimer(person){
    var timer = '<button onclick="addTimer(\'' + person + '\', 5)" class="btn btn-primary">Test</button>' +
                '<button onclick="addTimer(\'' + person + '\', 300)" class="btn btn-primary">5 min</button>' +
                '<button onclick="addTimer(\'' + person + '\', 600)" class="btn btn-primary">10 min</button>' +
                '<button onclick="addTimer(\'' + person + '\', 900)" class="btn btn-primary">15 min</button>';
    return timer;
}

function addTimer(person, duration) {
    console.log('Starting timer for ' + person);
    var interval = setInterval(() => {
        duration--;
        $('#timer' + person).text('Läuft ab in ' + displayTimer(duration));
        console.log(duration);
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        console.log('Timer for ' + person + ' exceeded!');
        say('Spiessli Alarm für ' + person + '. ' + getRandomReminder());
        $('#timer' + person).text('Abgelaufen');
        setTimeout(() => {
            $('#timer' + person).html(buildTimer(person));
        }, 5000);
    }, duration * 1000);
}

function say(text) {
    var speakSynthesis = new SpeechSynthesisUtterance(text);
    speakSynthesis.lang = "de-DE";
    window.speechSynthesis.speak(speakSynthesis);
}

function getRandomGreeting(){
    var greetings = ['Jo was geht ab', 'Sali', 'Hallo', 'Hej', 'Bonschorno'];

    return getRandomElement(greetings);
}

function getRandomCheers(){
    var cheers = ['Cheers', 'Zum Wohl', 'Salut', 'Viva', 'Uz uz uz uz', 'Ander di mango tri mi hani and mi'];

    return getRandomElement(cheers);
}

function getRandomReminder(){
    var reminders = [
        'Bruzzel bruzzel!',
        'Check mal deinen Spiess!',
        'Dein Spiessli ist vielleicht fertig!',
        'Dein Spiess brennt!',
        'Raus an die Kälte!'
    ];

    return getRandomElement(reminders);
}

function getRandomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

function displayTimer(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return minutes + ':' + ("0" + seconds).slice(-2);
}

function deletePerson(person){
    console.log('Delete ' + person);
    $('#row' + person).remove();
}