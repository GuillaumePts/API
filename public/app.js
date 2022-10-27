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

    let bouafle = createMarker(49.205201, 1.368801, "Lac de Bouafle", 1)
    map.addLayer(bouafle)

    let plT = createMarker(49.224330, 1.381556, "Petit lac de Tosny", 3)
    map.addLayer(plT)

    let mlT = createMarker(49.222608, 1.382537, "Etang Paradis", 4)
    map.addLayer(mlT)

    let glT = createMarker(49.229297, 1.389577, "Etang drakkar", 5)
    map.addLayer(glT)

    let mousseaux = createMarker(49.198521, 1.352703, "Lac Mousseaux", 6)
    map.addLayer(mousseaux)

    let bernieres = createMarker(49.234714, 1.337335, "Lac de Bernières", 7)
    map.addLayer(bernieres)



    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Ya rien ici connard " /*+ e.latlng.toString()*/)
        .openOn(map);
}




map.on('click', onMapClick);


// var satellite = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});


googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let visual = {
    "satellite": googleSat,
    "normal": osmLayer
}


var layerControl = L.control.layers(visual).addTo(map);

map.addLayer(layerControl)
}




// API 
function recupApi(id) {

    

    fetch('/lac/' + id).then(res => res.json()).then((contenu) => {

        creatContenu(contenu)
    })


}


// Function pour créer un marqueur des points d'eaux 
function createMarker(latitude, longitude, name, id) {


    let elt = L.marker([latitude, longitude]).bindTooltip(name, {
        permanent: true,
        direction: 'right'
    });



    elt.addEventListener('click', () => {

        document.querySelector('#info').style.opacity = 0

        animeInfo()
        setTimeout(() => {
            document.querySelector('#info').style.opacity = 1
        }, 100);


        
        
        


        recupApi(id)
    })

    return elt


}


function creatContenu(x) {

    // Recup document
    document.querySelector('#name').textContent = x.name
    document.querySelector('#type').textContent = x.type
    document.querySelector('#city').textContent = x.city
    document.querySelector('#gps').href = "https://www.google.com/maps/place/" + x.gps
    document.querySelector('#carna').textContent = x.carnassier
    
    
    let c = x.popCarna
    c.forEach(el => {
        li('lescarnas', el)
    });
    
    document.querySelector('#pblanc').textContent = x.blanc
    
    let b = x.popBlanc
    b.forEach(el => {
        li('lesblancs', el)
    });
    document.querySelector('#lesinfos').textContent = x.info

}

function animeInfo(){
    document.querySelector('#map').style.width = '70%'
    document.querySelector('#info').style.visibility = 'visible'
    document.querySelector('#info').style.width = '30%'
   
}


function li(html, valeur){
    let ul = document.querySelector('#'+html)
    let li = document.createElement('li')
    li.textContent=valeur
    ul.appendChild(li)
}


