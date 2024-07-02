let current_route = 'new_player';

// Initial page is for creating a new username
changeRoute('new_player');

function changeRoute(new_route) {
    if (new_route == "new_player") {
        import('../views/new_player_view.js').then(new_player => {
            document.title = "New Player";
            document.body.innerHTML = new_player.default();
        });
        current_route = 'new_player';
    } else if (new_route == "lobby") {
        import('../views/lobby_view.js').then(lobby => {
            document.title = "Lobby";
            document.body.innerHTML = lobby.default();
        });
        current_route = 'lobby';
    } else if (new_route == "game") {
        import('../views/game.js').then(game => {
            document.title = "Game";
            document.body.innerHTML = game.default();
        });
        current_route = 'game';
    }
    
};

// const routes = ['setup', 'lobby', 'game'];


window.onload = function () {
    const socket = io();
    
    let usernameInput = document.getElementById('username');
    let button = document.getElementById('enterLobbyButton');
    let players_ul_element = document.getElementById("players_in_lobby");
    
    
    button.onclick = function() {
        changeRoute('lobby');
        // alert("Entering lobby with username: " + usernameInput.value);
        socket.emit('enter_lobby', usernameInput.value);
    }
    
    // LOBBY PAGE CODE
    
    socket.on("players_map", (players_map) => {
        if (current_route == 'lobby') {
            players_ul_element = document.getElementById("players_in_lobby");
            
            if (players_ul_element) {
                handleLobbyPage(players_map);
            }

        }
        
    });
}

handleLobbyPage = function(players_map) {
    // maby add check to see if current page is lobby later
    // alert("Received signal from server!");
    players_ul_element = document.getElementById("players_in_lobby");

    players_ul_element.innerHTML = '';
    for (let playerKey in players_map) {
        // The playerKey is the socket id
        let player_username = players_map[playerKey];
        players_ul_element.innerHTML += `<li>${player_username} : ${playerKey}</li>`
    }
}