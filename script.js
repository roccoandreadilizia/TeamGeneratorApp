let sports = [];

// Carica sports.txt e popola il menu
fetch('sports.txt')
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split('\n');
    sports = lines.map(line => {
      const [name, number] = line.split(':');
      return {
        name: name.trim(),
        playersPerTeam: parseInt(number.trim())
      };
    });
    populateSportSelect();
  })
  .catch(error => {
    console.error("Errore nel caricamento del file sports.txt:", error);
    alert("Impossibile caricare gli sport dal file.");
  });

function populateSportSelect() {
  const select = document.getElementById("sportSelect");
  sports.forEach((sport, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${sport.name} (${sport.playersPerTeam} per squadra)`;
    select.appendChild(option);
  });
}

function generateTeams() {
  const sportIndex = document.getElementById("sportSelect").value;
  const playersPerTeam = sports[sportIndex].playersPerTeam;

  const rawNames = document.getElementById("namesInput").value.trim();
  if (!rawNames) {
    alert("Inserisci almeno un nome.");
    return;
  }

  const names = rawNames.split('\n').map(n => n.trim()).filter(Boolean);
  const shuffled = names.sort(() => 0.5 - Math.random());

  const teams = [];
  for (let i = 0; i < shuffled.length; i += playersPerTeam) {
    teams.push(shuffled.slice(i, i + playersPerTeam));
  }

  displayTeams(teams);
}

function displayTeams(teams) {
  const output = document.getElementById("teamsOutput");
  output.innerHTML = "";
  teams.forEach((team, index) => {
    const div = document.createElement("div");
    div.className = "team";
    div.innerHTML = `<strong>Squadra ${index + 1}</strong><br>${team.join("<br>")}`;
    output.appendChild(div);
  });
}
