//Fonctionnement de la map
const map = L.map('map').setView([50.72825092034062, 1.6105813421016573], 8);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Pour remplir la liste à gauche en fonction de la data
const personList = document.getElementById('list-promo');

// Stockage des marqueurs pour interagir avec la liste
const markers = [];


// FONCTION PRINCIPALE
// Selectionne la data, lit les données, créer la liste avec boutons sur le côté, et les cercle.
document.querySelectorAll('#data li').forEach(item => {
  const lat = parseFloat(item.getAttribute('data-lat'));
  const lng = parseFloat(item.getAttribute('data-lng'));
  const photo = item.getAttribute('data-photo');
  const nom = item.getAttribute('data-nom');
  const lieunai = item.getAttribute('data-lieunai');
  const hobbies = item.getAttribute('data-hobbies'); 

  //Appel de la fonction (en dessous)
  createCircle(lat, lng, photo, nom, lieunai, hobbies);

  //
  const marker = createCircle(lat, lng, photo, nom, lieunai, hobbies);
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



// SOUS-FONCTION : CREATECIRCLE
// Fonction pour créer un cercle avec le pop-up contenant la card
function createCircle(lat, lng, photo, nom, lieunai, hobbies) {
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
        <img src="${photo}" alt="${nom}" />
        <h1>${nom}</h1>
        <div class="info">
          <h2>Lieu de naissance :</h2> 
          <p>${lieunai}</p>
          <h2>Hobbies :</h2> 
          <p>${hobbies}</p>
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