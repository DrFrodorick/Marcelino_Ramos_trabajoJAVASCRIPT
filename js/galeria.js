fetch("../data/fotosGaleria.json")
    .then(res => res.json())
    .then(data => {

        const cajas = document.querySelectorAll(".contenedor-caja");

        cajas.forEach(caja => {

            const tipo = caja.dataset.tipo;
            const subtipo = caja.dataset.subtipo;

            const carruselInner = caja.querySelector(".contenedor-carrusel-inner");
            const textoCaja = caja.querySelector(".caja-info-texto"); // Cambiado de ID a clase para evitar conflictos
            const btnPrev = caja.querySelector(".btn-b-prev");
            const btnNext = caja.querySelector(".btn-b-next");
            const caracteristicasCaja = caja.querySelector(".caja-info-caracteristicas");

            // 1. Seleccionar datos correctos
            let info = null;

            if (tipo === "bungalow") {
                info = data.bungalow;
            }
            if (tipo === "furgonetas" && subtipo) {
                info = data.furgonetas[subtipo];
            }
            if (tipo === "serviciosDestacados") {
                const servicio = caja.dataset.servicio;
                info = data.serviciosDestacados[servicio];
            }
            if (!info) return;

            // 2. Insertar imágenes
            info.imagenes.forEach(img => {
                const imagen = document.createElement("img");
                 imagen.src = img.url;
                 imagen.alt = img.alt || "";

                 imagen.loading = "lazy"; // mejora rendimiento

                 carruselInner.appendChild(imagen);
            });

            // 3. Insertar texto
            if (textoCaja && info.texto) {
                textoCaja.textContent = info.texto;
            }

            // 4. Insertar características
            if (caracteristicasCaja && info.caracteristicas) {
                caracteristicasCaja.innerHTML = "";

                info.caracteristicas.forEach(car => {

                    // Detectar icono según palabras clave
                    let icono = "•"; // por defecto

                    const texto = car.toLowerCase();

                    if (texto.includes("plaza")) icono = "👤";
                    if (texto.includes("noche")) icono = "🛏️";
                    if (texto.includes("cama")) icono = "🛏️";
                    if (texto.includes("baño")) icono = "🚻";
                    if (texto.includes("ducha")) icono = "🚿";
                    if (texto.includes("nevera")) icono = "🧊";
                    if (texto.includes("cocina")) icono = "🍳";
                    if (texto.includes("calefacción")) icono = "🔥";
                    if (texto.includes("4x4") || texto.includes("off")) icono = "🛞";
                    if (texto.includes("no inclu")) icono = "❌";
                    else if (texto.includes("inclu")) icono = "✅";
                    if (texto.includes("wifi")) icono = "📶";
                    if (texto.includes("piscina")) icono = "🏊";
                    if (texto.includes("senderismo")) icono = "🥾";
                    if (texto.includes("actividades infant")) icono = "🎈";
                    if (texto.includes("restaurante")) icono = "🍽️";
                    if (texto.includes("bicicletas")) icono = "🚲";
                    if (texto.includes("acuático")) icono = "💦";
                    if (texto.includes("tumbona")) icono = "🛋️";
                    if (texto.includes("información")) icono = "ℹ️";
                    if (texto.includes("mapas")) icono = "🗺️";
                    if (texto.includes("mirador")) icono = "🔭";
                    if (texto.includes("personal")) icono = "👤";
                    if (texto.includes("juegos")) icono = "🎮";
                    if (texto.includes("actividades")) icono = "🎭";
                    if (texto.includes("menú")) icono = "📋";
                    if (texto.includes("reserva") || texto.includes("alquiler")) icono = "📅";
                    if (texto.includes("rutas")) icono = "🛤️";
                    if (texto.includes("cómod")) icono = "🪑";
                    

                    const item = document.createElement("p");
                    item.classList.add("caracteristica-item");
                    item.textContent = `${icono} ${car}`;

                    caracteristicasCaja.appendChild(item);
                });
            }

            // 5. Carrusel infinito
            let index = 0;

            function actualizarCarrusel() {
                carruselInner.style.transform = `translateX(-${index * 100}%)`;
            }

            btnNext.addEventListener("click", () => {
                index = (index + 1) % info.imagenes.length;
                actualizarCarrusel();
            });

            btnPrev.addEventListener("click", () => {
                index = (index - 1 + info.imagenes.length) % info.imagenes.length;
                actualizarCarrusel();
            });

        });

    })
    .catch(err => console.error("Error cargando galería:", err));


