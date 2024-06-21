const socket = io();

document.getElementById('pickButton').addEventListener('click', () => {
    socket.emit('pickTeam');
});

socket.on('teamPicked', (data) => {
    if (data.message) {
        document.getElementById('result').innerText = data.message;
    } else {
        document.getElementById('result').innerText = `Your team is: ${data.team}`;
        document.getElementById('pickButton').disabled = true;
    }
});

socket.on('updateTeams', (data) => {
    console.log('Teams picked so far:', data.pickedTeams);
});
