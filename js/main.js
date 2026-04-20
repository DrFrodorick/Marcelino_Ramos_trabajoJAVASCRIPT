fetch("data/imagesCarousel.json")
    .then(res => res.json())
    .then(data => {
        const imagenes = data.imagenes;
        let index = 0;

        const img = document.getElementById("hero-img");

        // Primera imagen
        img.src = imagenes[index].url;
        img.alt = imagenes[index].alt;
        img.width = imagenes[index].width;
        img.height = imagenes[index].height;

        // Cambiar cada 5 segundos
        setInterval(() => {
            index = (index + 1) % imagenes.length;

            img.src = imagenes[index].url;
            img.alt = imagenes[index].alt;
            img.width = imagenes[index].width;
            img.height = imagenes[index].height;

        }, 5000);
    })
    .catch(err => console.error("Error cargando JSON:", err));


fetch("data/imagenesDivisionInterna.json")
    .then(res => res.json())
    .then(data => {
        const carruseles = document.querySelectorAll(".div-int-1");

        carruseles.forEach(div => {

            const id = div.dataset.carousel;
            const imagen = div.querySelector("img");
            const imagenes = data["carrusel" + id];

            // Guardar la imagen inicial (la que ya está en el HTML)
            const imagenInicial = {
                url: imagen.src,
                alt: imagen.alt || "",
                width: imagen.getAttribute("width"),
                height: imagen.getAttribute("height")
            };

            let index = 0;
            let intervalo = null;

            // Función para cambiar imagen
            function cambiarImagen() {
                index = (index + 1) % imagenes.length;

                const imgData = imagenes[index];

                imagen.src = imgData.url;
                imagen.alt = imgData.alt || "";
                imagen.width = imgData.width;
                imagen.height = imgData.height;
            }

            // Iniciar carrusel al pasar el ratón
            div.addEventListener("mouseenter", () => {
                intervalo = setInterval(cambiarImagen, 1000);
            });

            // Parar carrusel al quitar el ratón
            div.addEventListener("mouseleave", () => {
                clearInterval(intervalo);
                intervalo = null;

                index = 0;

                // Restaurar imagen inicial
                imagen.src = imagenInicial.url;
                imagen.alt = imagenInicial.alt;
                imagen.width = imagenInicial.width;
                imagen.height = imagenInicial.height;
            });

        });

    })
    .catch(err => console.error("Error cargando JSON:", err));

document.getElementById("div-int").addEventListener("click", () => {
    window.location.href = "./views/galeria.html#bungaloPremium";
});
document.getElementById("div-int-2").addEventListener("click", () => {
    window.location.href = "./views/galeria.html#furgonetas";
});



/*                                                 */
fetch("data/informacion.json")
    .then(res => res.json())
    .then(data => {

        const carrusel = document.querySelector(".carrusel");
        const contenedor = document.querySelector(".carrusel-container");

        // Crear tarjetas dinámicamente
        data.servicios.forEach(servicio => {

            // Crear enlace
            const enlace = document.createElement("a");
            enlace.href = servicio.url || "#";
            enlace.classList.add("tarjeta-enlace");

            // Crear tarjeta
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-servicio");

            // Crear imagen REAL con width y height
            const img = document.createElement("img");
            img.src = servicio.imagen;
            img.alt = servicio.alt || "";
            img.width = servicio.width;
            img.height = servicio.height;

            // Título dentro de la tarjeta
            const titulo = document.createElement("span");
            titulo.classList.add("tarjeta-titulo");
            titulo.textContent = servicio.titulo;

            // Montaje
            tarjeta.appendChild(img);
            tarjeta.appendChild(titulo);
            enlace.appendChild(tarjeta);
            carrusel.appendChild(enlace);
        });

        // Variables del carrusel PRO
        let desplazamiento = 0;
        const tarjetas = document.querySelectorAll(".tarjeta-servicio");

        function getPaso() {
            return tarjetas[0].offsetWidth + 24; // ancho tarjeta + gap
        }

        function getMaxDesplazamiento() {
            const totalWidth = carrusel.scrollWidth;
            const visibleWidth = contenedor.clientWidth;
            return -(totalWidth - visibleWidth);
        }

        const btnNext = document.querySelector(".btn-next");
        const btnPrev = document.querySelector(".btn-prev");

        // Botón siguiente
        btnNext.addEventListener("click", () => {
            const paso = getPaso();
            const max = getMaxDesplazamiento();

            if (desplazamiento - paso > max) {
                desplazamiento -= paso;
            } else {
                desplazamiento = max;
            }

            carrusel.style.transform = `translateX(${desplazamiento}px)`;
        });

        // Botón anterior
        btnPrev.addEventListener("click", () => {
            const paso = getPaso();

            if (desplazamiento + paso < 0) {
                desplazamiento += paso;
            } else {
                desplazamiento = 0;
            }

            carrusel.style.transform = `translateX(${desplazamiento}px)`;
        });

    })
    .catch(err => console.error("Error cargando JSON:", err));

fetch("data/preguntas.json")
    .then(res => res.json())
    .then(data => {

        const contenedor = document.getElementById("contenedor-preguntas");

        data.preguntas.forEach(item => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <div class="tarjeta-inner">

                    <div class="cara caraA">
                        <img src="${item.imagen}" 
                             alt="${item.alt}" 
                             width="${item.width}" 
                             height="${item.height}">
                        <span>${item.pregunta}</span>
                    </div>

                    <div class="cara caraB">
                        <span>${item.respuesta}</span>
                    </div>

                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

    })
    .catch(err => console.error("Error cargando JSON:", err));


   

