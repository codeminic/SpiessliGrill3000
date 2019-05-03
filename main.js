$('document').ready(() => {
    $('#addPersonButton').on('click', function () {
        addPerson();
    });
});

function addPerson() {
    let name = $('#nameInput').val();
    $('#nameInput').val('');

    $('#table tr:last').after('<tr><td>' + name + '</td>' +
        '<td>' +
        '<button onclick="addTimer(\'' + name + '\', 5)">5 min</button>' +
        '<button onclick="addTimer(\'' + name + '\', 10)">10 min</button>' +
        '<button onclick="addTimer(\'' + name + '\', 15)">15 min</button>' +
        '</td></tr>'
    );
}

function addTimer(person, duration) {
    console.log('Starting timer for ' + person);
    setTimeout(() => {
        console.log('Timer completed for ' + person)
    }, duration * 1000 * 60);
}