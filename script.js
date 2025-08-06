document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('sportSelect');
  const btn = document.getElementById('generateBtn');

  fetch('sports.txt') // <-- nome del file da cui leggere
    .then(response => {
      if (!response.ok) throw new Error('Errore nel caricamento del file');
      return response.text();
    })
    .then(data => {
      const select = document.getElementById('sportSelect');
      select.innerHTML = ''; // svuota eventuali opzioni esistenti

      const lines = data.trim().split('\n');
      lines.forEach(line => {
        const [sport, value] = line.split(':');
        if (sport && value) {
          const option = document.createElement('option');
          option.value = value.trim();
          option.textContent = sport.trim();
          select.appendChild(option);
        }
      });
    })
    .catch(error => {
      console.error('Errore:', error);
    });
});

function solveEnable(button, select) {
  button.disabled = select.value === '';
}

function generateTeams() {
  const idx = parseInt(document.getElementById('sportSelect').value, 10);
  const perTeam = window.sports[idx].playersPerTeam;
  const raw = document.getElementById('namesInput').value.trim();
  if (!raw) return alert('Inserisci almeno un nome.');
  const names = raw.split('\n').map(s => s.trim()).filter(Boolean);
  const shuffled = names.sort(() => 0.5 - Math.random());
  const teams = [];
  for (let i = 0; i < shuffled.length; i += perTeam) {
    teams.push(shuffled.slice(i, i + perTeam));
  }
  displayTeams(teams);
}

function displayTeams(teams) {
  const container = document.getElementById('teamsOutput');
  container.innerHTML = '';
  teams.forEach((team, i) => {
    const d = document.createElement('div');
    d.className = 'team';
    d.innerHTML = `<strong>Squadra ${i+1}</strong><br>${team.join('<br>')}`;
    container.append(d);
  });
}
