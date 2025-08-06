document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('sportSelect');
  const btn = document.getElementById('generateBtn');

  fetch('sports.txt')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then(text => {
      const lines = text.trim().split('\n').filter(line => line.includes(':'));
      if (lines.length === 0) throw new Error('sports.txt vuoto o formato sbagliato');
      window.sports = lines.map((line, i) => {
        const [name, num] = line.split(':');
        return { name: name.trim(), playersPerTeam: parseInt(num.trim(), 10) };
      });
      select.innerHTML = '<option value="">— Seleziona sport —</option>';
      window.sports.forEach((s, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${s.name} (${s.playersPerTeam})`;
        select.append(opt);
      });
      solveEnable(btn, select);
    })
    .catch(err => {
      console.error(err);
      select.innerHTML = `<option value="">Errore nel caricamento: ${err.message}</option>`;
    });

  select.addEventListener('change', () => solveEnable(btn, select));
  btn.addEventListener('click', generateTeams);
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
