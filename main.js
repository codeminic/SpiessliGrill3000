var persons = new Object();

$('document').ready(() => {
    $('#addPersonButton').on('click', function () {
        addPerson();
    });
});

function addPerson() {
    let person = $('#nameInput').val();
    let id = uuidv4();
    $('#nameInput').val('');
    persons[id] = person;

    say(getRandomGreeting() + ', ' + person + '. Willkommen beim Spiessli Master 3000! Schön das du da bist! Neben deinem Namen kannst du' +
    'einen Timer stellen, und ich erinnere dich sobald dieser abgelaufen ist');
    say('Geniess die Party!' + getRandomCheers());

    $('#tableBody').append('<tr id="row' + id + '"><td>' + person + '</td>' +
        '<td id="timer' + id + '">' +
        '</td>' + 
        '<td align="right">' +
            '<img onclick="deletePerson(\'' + id + '\')" src="https://img.icons8.com/color/48/000000/close-window.png">' +
        '</td>' + 
        '</tr>'
    );
    $('#timer' + id).html(buildTimer(id));
}

function buildTimer(personId){
    var timer = '<button onclick="addTimer(\'' + personId + '\', 5)" class="btn btn-primary">Test</button>' +
                '<button onclick="addTimer(\'' + personId + '\', 300)" class="btn btn-primary">5 min</button>' +
                '<button onclick="addTimer(\'' + personId + '\', 600)" class="btn btn-primary">10 min</button>' +
                '<button onclick="addTimer(\'' + personId + '\', 900)" class="btn btn-primary">15 min</button>';
    return timer;
}

function addTimer(personId, duration) {
    console.log('Starting timer for ' + personId);
    var interval = setInterval(() => {
        duration--;
        $('#timer' + personId).text('Läuft ab in ' + displayTimer(duration));
    }, 1000);
    setTimeout(() => {
        clearInterval(interval);
        console.log('Timer for ' + personId + ' exceeded!');
        say('Spiessli Alarm für ' + getNameById(personId) + '. ' + getRandomReminder());
        $('#timer' + personId).text('Abgelaufen');
        setTimeout(() => {
            $('#timer' + personId).html(buildTimer(personId));
        }, 5000);
    }, duration * 1000);
}

function say(text) {
    var speakSynthesis = new SpeechSynthesisUtterance(text);
    speakSynthesis.lang = "de-DE";
    window.speechSynthesis.speak(speakSynthesis);
}

function getRandomGreeting(){
    var greetings = [
        'Jo was geht ab', 
        'Sali', 
        'Hallo', 
        'Hej', 
        'Bonschorno'
    ];

    return getRandomElement(greetings);
}

function getRandomCheers(){
    var cheers = [
        'Cheers', 
        'Zum Wohl', 
        'Salut', 
        'Viva', 
        'Uz uz uz uz', 
    ];

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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

function getNameById(id){
    return persons[id];
}