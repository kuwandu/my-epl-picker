const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

const teams = [
    "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion",
    "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham",
    "Liverpool", "Luton Town", "Manchester City", "Manchester United", "Newcastle United",
    "Nottingham Forest", "Sheffield United", "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
];

let pickedTeams = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('pickTeam', () => {
        if (pickedTeams.length === teams.length) {
            socket.emit('teamPicked', { message: "All teams have been picked!" });
            return;
        }

        let team;
        do {
            team = teams[Math.floor(Math.random() * teams.length)];
        } while (pickedTeams.includes(team));

        pickedTeams.push(team);
        socket.emit('teamPicked', { team: team });
        io.emit('updateTeams', { pickedTeams: pickedTeams });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
