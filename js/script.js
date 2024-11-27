//Fonctionnement de la map
const map = L.map('map').setView([50.71006735720355, 1.9682706208002292], 10);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Pour remplir la liste à gauche en fonction de la data
const personList = document.getElementById('list-promo');

//Pour la barre de recherche et afficher dynamiquement les personnes affichées
const searchBar = document.getElementById('recherche');

// Stockage des marqueurs pour interagir avec la liste
const markers = [];


// FONCTION PRINCIPALE
// Selectionne la data, lit les données, créer la liste avec boutons sur le côté, et les cercle.
document.querySelectorAll('#data li').forEach(item => {
  const lat = parseFloat(item.getAttribute('data-lat'));
  const lng = parseFloat(item.getAttribute('data-lng'));
  const photo = item.getAttribute('data-photo');
  const nom = item.getAttribute('data-nom');
  const age = item.getAttribute('data-age');
  const ville = item.getAttribute('data-ville');
  const hobbies = item.getAttribute('data-hobbies'); 
  const plat = item.getAttribute('data-plat');
  const pays = item.getAttribute('data-pays');
  const gith = item.getAttribute('data-git');
  const likd = item.getAttribute('data-likd');

  //
  const marker = createCircle(lat, lng, photo, nom, age, ville, hobbies, plat, pays, gith, likd);
  markers.push({ marker, lat, lng });

  // Création d'un bouton dans la liste des personne
  const listItem = document.createElement('li');
  listItem.innerHTML = ` <img src="${photo}" alt="${nom}" /> <span>${nom}</span>`;

  // zoom sur le cercle concerne et ouvre le pop-up
  listItem.addEventListener('click', () => {
    transitMap([lat, lng], marker);

  });

  // Remplit la liste à gauche
  personList.appendChild(listItem);
});


// Barre de recherche dynamique
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase(); // Texte de recherche en minuscule

  // Parcours des éléments de la liste
  document.querySelectorAll('#list-promo li').forEach(listItem => {
    const itemName = listItem.querySelector('span').textContent.toLowerCase(); // Récupère le nom de l'élément
    if (itemName.includes(searchTerm)) {
      listItem.classList.remove('hidden'); // Retire la classe 'hidden' pour afficher
    } else {
      listItem.classList.add('hidden'); // Ajoute la classe 'hidden' pour masquer
    }
  });
});


// SOUS-FONCTION : CREATECIRCLE
// Fonction pour créer un cercle avec le pop-up contenant la card
function createCircle(lat, lng, photo, nom, age, ville, hobbies, plat, pays, gith, likd) {
    // Pour mettre une photo au centre d'un cercle
    const customIcon = L.divIcon({
      className: '',
      html: `
        <div style=" display: flex; 
                    align-items: center; 
                    justify-content: center;
                    width: 50px; 
                    height: 50px; 
                    border-radius: 50%; 
                    overflow: hidden; 
                    border: 2px solid #590902;">
          <img src="${photo}" alt="${nom}" style="
              width: 100%; 
              height: 100%; 
              object-fit: cover;">
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 25] //Ancre l'icon au centre
    });
  
    // fiche à afficher au clic
    const cardPerso = `
      <div class="id-card">
        <a class="but-nav" href="${photo}" target="_blank">
        <img class="img-card" src="${photo}" alt="${nom}" />
        </a>
        <h1>${nom}</h1>
        <div class="info">
          <h2>Age :</h2> 
          <p>${age}</p>
          <h2>Ville :</h2> 
          <p>${ville}</p>
          <h2>Hobbies :</h2> 
          <p>${hobbies}</p>
          <h2>Plat Favoris :</h2> 
          <p>${plat}</p>
          <h2>Pays à visiter :</h2> 
          <p>${pays}</p>
          <div class="container-imgcard" style="display:flex;">
          <a class="img-git" href="${gith}" target="_blank"><img src="../img/git.png" alt="Profil Git"></a>
          <a class="img-link" href="${likd}" target="_blank"><img src="../img/likd.png" alt="Profil Linkedin"></a>
          <div>
        </div>
      </div>
    `;


    // Ajout du cercle avec photo et du pop-up card
    return L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(cardPerso, { className: 'custom-popup' });
    
  }
  

// SOUS-FONCTION : TRANSITMAP
//Permet une transition douce quand on clique sur un bouton.
function transitMap(position, marker) {
  const minZoom = 10;
  const finalZoom = 15;
  
  //Si popup ouvert : le ferme
  map.closePopup();

  // Dezoomer
  map.flyTo(map.getCenter(), minZoom, { duration: 1.5 }); 

  // Rezoomer, recentrer
  setTimeout(() => {
    map.flyTo(position, finalZoom, { duration: 1.5 });
      setTimeout(() => { marker.openPopup(); }, 1500); 
    }, 1500); 
}