	
    let players = [];
    for (let i = 0; i < numPlayers; i++) {
        let name = document.getElementById(`name-${i}`).value;
        let skill = parseInt(document.getElementById(`skill-${i}`).value);
        if (!name || isNaN(skill) || skill < 1 || skill > 10) {
            alert('Inserisci tutti i nomi e abilità correttamente.');
            return;
        }
        players.push({ name, skill });
    }
    players.sort((a, b) => b.skill - a.skill);

    let team1 = [], team2 = [], sum1 = 0, sum2 = 0;

    for (let p of players) {
        if (sum1 <= sum2) {
            team1.push(p);
            sum1 += p.skill;
        } else {
            team2.push(p);
            sum2 += p.skill;
        }
    }

    team1Div.querySelector('ul').innerHTML = team1.map(p => `<li>${p.name} (abilità: ${p.skill})</li>`).join('');
    team2Div.querySelector('ul').innerHTML = team2.map(p => `<li>${p.name} (abilità: ${p.skill})</li>`).join('');
    team1Div.querySelector('.total').textContent = `Totale abilità: ${sum1}`;
    team2Div.querySelector('.total').textContent = `Totale abilità: ${sum2}`;
    teamsDiv.classList.remove('hidden');
});