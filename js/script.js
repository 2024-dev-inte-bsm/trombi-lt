//Fonctionnement de la map
const map = L.map('map').setView([50.72825092034062, 1.6105813421016573], 8);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Selection la liste puis les différentes données dedans
document.querySelectorAll('#data li').forEach(item => {
        const lat = parseFloat(item.getAttribute('data-lat'));
        const lng = parseFloat(item.getAttribute('data-lng'));
        const photo = item.getAttribute('data-photo');
        const nom = item.getAttribute('data-nom');
        const lieunai = item.getAttribute('data-lieunai');
        const hobbies = item.getAttribute('data-hobbies'); 

        //Appel de la fonction (en dessous)
        createCircle(lat, lng, photo, nom, lieunai, hobbies);
});


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
                    border: 2px solid red;">

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
    L.marker([lat, lng], { icon: customIcon }).addTo(map).bindPopup(cardPerso, { className: 'custom-popup' });
  }
  
