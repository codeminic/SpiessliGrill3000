$('document').ready(() => {
    $('#addPersonButton').on('click', function () {
        addPerson();
    });
});

function addPerson() {
    let name = $('#nameInput').val();
    $('#nameInput').val('');

    say('Hallo ' + name + '! Willkommen beim Spiessli Master 3000!');

    $('#table tr:last').after('<tr><td>' + name + '</td>' +
        '<td>' +
        '<button onclick="addTimer(\'' + name + '\', 1)">5 min</button>' +
        '<button onclick="addTimer(\'' + name + '\', 10)">10 min</button>' +
        '<button onclick="addTimer(\'' + name + '\', 15)">15 min</button>' +
        '</td></tr>'
    );
}

function addTimer(person, duration) {
    console.log('Starting timer for ' + person);
    setTimeout(() => {
        console.log('Timer for ' + person + ' exceeded!');
        say('Hey ' + person + '. Dein Spiessli ist vielleicht fertig!');
    }, duration * 1000 * 60);
}

function say(text) {
    var speakSynthesis = new SpeechSynthesisUtterance(text);
    speakSynthesis.lang = "de-DE";
    window.speechSynthesis.speak(speakSynthesis);
}