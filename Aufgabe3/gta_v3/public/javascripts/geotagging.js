const { tagList } = require("../../models/geotag-examples");

function updateLocation() {
    // Überprüfen, ob die Felder für Latitude und Longitude bereits Werte enthalten
    const latField = document.getElementById("tagging-lat");
    const lonField = document.getElementById("tagging-lon");
    const latHiddenField = document.getElementById("tagging-lath");
    const lonHiddenField = document.getElementById("tagging-lonh");

    if (!latField.value || !lonField.value) {
        // Wenn die Felder leer sind, rufe LocationHelper.findLocation() auf
        LocationHelper.findLocation((locationHelper) => {
            const lat = locationHelper.latitude;
            const lon = locationHelper.longitude;

            latField.value = lat;
            lonField.value = lon;
            latHiddenField.value = lat;
            lonHiddenField.value = lon;

            const mapp = new MapManager();

            mapp.initMap(lat, lon);
            mapp.updateMarkers(lat, lon, tags);

            const mapViewImg = document.getElementById("mapView");
            const resultSpan = document.querySelector('.discovery__map span');
            if (mapViewImg) {
                mapViewImg.remove();
            }
            if (resultSpan) {
                resultSpan.remove();
            }
        });
    } else {
        // Falls die Felder bereits Werte enthalten, führe die Kartenerstellung direkt durch
        const lat = parseFloat(latField.value);
        const lon = parseFloat(lonField.value);

        const mapp = new MapManager();

        mapp.initMap(lat, lon);
        mapp.updateMarkers(lat, lon);

        const mapViewImg = document.getElementById("mapView");
        const resultSpan = document.querySelector('.discovery__map span');
        if (mapViewImg) {
            mapViewImg.remove();
        }
        if (resultSpan) {
            resultSpan.remove();
        }
    }
}
