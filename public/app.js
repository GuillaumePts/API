// GEOLOCALISATION


// Au chargement de la page l'appli lance la function coordonnees
document.addEventListener('DOMContentLoaded', function () {
    navigator.geolocation.getCurrentPosition(coordonnees)
});




//  Cette fonction initialise la carte, nous localise et mets en place les markers
function coordonnees(pos) {
    let crd = pos.coords;
    let malatitude = crd.latitude;
    let malongitude = crd.longitude;

    let map = L.map('map').setView([malatitude, malongitude], 15); // LIGNE 18

    L.marker([malatitude, malongitude]).addTo(map).bindTooltip("Vous etes à peu près ici !", {
        permanent: true,
        direction: 'top'
    });

    let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);

   

    let marais = createMarker(49.190051, 1.348561, "Petit marais", 2)
    map.addLayer(marais)

    let bouafle =  createMarker(49.205201, 1.368801, "Lac de Bouafle",1)
    map.addLayer(bouafle)

    let plT =  createMarker(49.224330, 1.381556, "Petit lac de Tosny",3)
    map.addLayer(plT)

    let mlT =  createMarker(49.222608, 1.382537, "Etang Paradis",4)
    map.addLayer(mlT)

    let glT =  createMarker(49.229297, 1.389577, "Etang drakkar",5)
    map.addLayer(glT)

    let mousseaux =  createMarker(49.198521, 1.352703, "Lac Mousseaux",6)
    map.addLayer(mousseaux)

    let bernieres =  createMarker(49.234714, 1.337335, "Lac de Bernières",7)
    map.addLayer(bernieres)

    

}




// API 
function recupApi(id) {

    document.querySelector('#map').style.width = '70%'
    document.querySelector('#info').style.display = 'flex'



    fetch('/lac/' + id).then(res => res.json()).then((contenu) => {
        let rslt = contenu

        document.querySelector('#name').textContent = 'Nom : ' + rslt.name
        document.querySelector('#type').textContent = 'Type : ' + rslt.type
        document.querySelector('#city').textContent = 'City : ' + rslt.city

    })


}


// Function pour créer un marqueur des points d'eaux 
function createMarker(latitude, longitude, name, id) {


    let elt = L.marker([latitude , longitude]).bindTooltip(name, {
        permanent: true,
        direction: 'right'
    });



    elt.addEventListener('click', () => {
        recupApi(id)
    })

    return elt

    
}