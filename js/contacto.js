document.addEventListener("DOMContentLoaded", () => {

    // ----- 1) Ubicaciones fijas en Asturias (nombre, [lat, lng]) -----
    const ubicaciones = [
        { nombre: "Camping Tebongo (GLAMPUR)", coords: [43.2435, -6.5398] },
       
    ];

    // ----- 2) Crear mapa -----
    const mapa = L.map("mapa").setView([43.3, -5.5], 7);


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(mapa);

    // ----- 3) Icono personalizado tipo chincheta -----
    const crearIcono = (nombre) => {
        return L.divIcon({
            className: "pin-container",
            html: `
                <div class="pin"></div>
                <div class="pin-label">${nombre}</div>
            `,
            iconSize: [24, 40],   // tamaño real del icono
            iconAnchor: [12, 24]  // punto exacto que toca la coordenada
        });
    };

    // ----- 4) Añadir marcadores fijos -----
    const markers = [];
    ubicaciones.forEach(u => {
        const m = L.marker(u.coords, { icon: crearIcono(u.nombre) })
            .addTo(mapa);

        // Al hacer click, seleccionar destino SIN popup feo
        m.on("click", () => {
            setDestino(u.coords, u.nombre);

            // Animación del cartel
            const iconEl = m._icon;
            if (iconEl) {
                iconEl.classList.add("pin-active");
                setTimeout(() => iconEl.classList.remove("pin-active"), 800);
            }
        });

        markers.push(m);
    });

    // Ajustar vista para ver todos los marcadores
    const group = L.featureGroup(markers);
   

    // ----- 5) Variables de ruta -----
    let controlRuta = null;
    let marcadorDestino = null;
    let destinoCoords = null;

    // ----- 6) Seleccionar destino -----
    function setDestino(coords, nombre = "Destino seleccionado") {
        destinoCoords = coords;

        // eliminar marcador previo
        if (marcadorDestino) {
            mapa.removeLayer(marcadorDestino);
        }

        // marcador destino SIN popup
        marcadorDestino = L.marker(coords, { opacity: 0.95 , interactive: false})
            .addTo(mapa);

        mapa.panTo(coords, { animate: true });
    }

    // Click en el mapa para elegir destino
    mapa.on("click", (e) => {
        setDestino([e.latlng.lat, e.latlng.lng], "Destino (pinchado en el mapa)");
    });

    // ----- 7) Calcular ruta -----
    const btnRuta = document.getElementById("btn-ruta");
    btnRuta.addEventListener("click", () => {

        if (!destinoCoords) {
            alert("Selecciona primero un destino pinchando en el mapa o en un marcador.");
            return;
        }

        if (!navigator.geolocation) {
            alert("Tu navegador no permite obtener la ubicación.");
            return;
        }

        navigator.geolocation.getCurrentPosition(pos => {
            const cliente = [pos.coords.latitude, pos.coords.longitude];

            if (controlRuta) {
                mapa.removeControl(controlRuta);
                controlRuta = null;
            }

            controlRuta = L.Routing.control({
                waypoints: [
                    L.latLng(cliente[0], cliente[1]),
                    L.latLng(destinoCoords[0], destinoCoords[1])
                ],
                routeWhileDragging: false,
                showAlternatives: false,
                fitSelectedRoute: true,
                lineOptions: {
                    styles: [{ color: "#0077cc", weight: 5 }]
                },
                createMarker: function(i, wp, nWps) {
                    return L.marker(wp.latLng, {
                        icon: L.divIcon({
                            className: "pin-container",
                            html: `
                                <div class="pin"></div>
                                <div class="pin-label">${i === 0 ? "Origen" : "Destino"}</div>
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

    });

    // ----- 8) Limpiar ruta al seleccionar otro destino -----
    mapa.on("click", () => {
        if (controlRuta) {
            mapa.removeControl(controlRuta);
            controlRuta = null;
        }
    });

});
