document.addEventListener("DOMContentLoaded", () => {

    // ----- 1) Coordenadas del camping (destino fijo) -----
    const destino = [43.2435, -6.5398];
    const destinoNombre = "Camping Tebongo (GLAMPUR)";

    // ----- 2) Crear mapa -----
    const mapa = L.map("mapa").setView(destino, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(mapa);

    // ----- 3) Icono personalizado -----
    const crearIcono = (nombre) => {
        return L.divIcon({
            className: "pin-container",
            html: `
                <div class="pin"></div>
                <div class="pin-label">${nombre}</div>
            `,
            iconSize: [24, 40],
            iconAnchor: [12, 24]
        });
    };

    // ----- 4) Marcador del camping -----
    L.marker(destino, { icon: crearIcono(destinoNombre) }).addTo(mapa);

    // ----- 5) Calcular ruta automáticamente -----
    let controlRuta = null;

    function calcularRutaAutomaticamente() {

        if (!navigator.geolocation) {
            alert("Tu navegador no permite obtener la ubicación.");
            return;
        }

        navigator.geolocation.getCurrentPosition(pos => {

            const origen = [pos.coords.latitude, pos.coords.longitude];

            // Si ya existe una ruta previa, eliminarla
            if (controlRuta) {
                mapa.removeControl(controlRuta);
                controlRuta = null;
            }

            controlRuta = L.Routing.control({
                waypoints: [
                    L.latLng(origen[0], origen[1]),
                    L.latLng(destino[0], destino[1])
                ],
                routeWhileDragging: false,
                showAlternatives: false,
                fitSelectedRoute: true,
                lineOptions: {
                    styles: [{ color: "#0077cc", weight: 5 }]
                },
                createMarker: function(i, wp) {
                    return L.marker(wp.latLng, {
                        icon: L.divIcon({
                            className: "pin-container",
                            html: `
                                <div class="pin"></div>
                                <div class="pin-label">${i === 0 ? "Mi ubicación" : destinoNombre}</div>
                            `,
                            iconSize: [24, 40],
                            iconAnchor: [12, 24]
                        }),
                        interactive: false
                    });
                }
            }).addTo(mapa);

        }, () => {
            alert("No se pudo obtener tu ubicación.");
        }, {
            enableHighAccuracy: true,
            timeout: 10000
        });
    }

    // Ejecutar automáticamente al cargar la página
    calcularRutaAutomaticamente();

});
