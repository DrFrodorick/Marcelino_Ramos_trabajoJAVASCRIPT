document.addEventListener("DOMContentLoaded", () => {

    // ---------- VALIDACIONES ----------
    function soloLetras(texto) {
        return /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(texto);
    }

    function soloNumeros(texto) {
        return /^[0-9]+$/.test(texto);
    }

    function validarFormulario() {
        let valido = true;

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const producto = document.getElementById("producto").value;
        // Nombre
        if (!soloLetras(nombre) || nombre.length === 0 || nombre.length > 15) {
            document.getElementById("error-nombre").textContent = "Nombre inválido";
            valido = false;
        } else {
            document.getElementById("error-nombre").textContent = "";
        }

        // Apellidos
        if (!soloLetras(apellidos) || apellidos.length === 0 || apellidos.length > 40) {
            document.getElementById("error-apellidos").textContent = "Apellidos inválidos";
            valido = false;
        } else {
            document.getElementById("error-apellidos").textContent = "";
        }

        // Teléfono
        if (!soloNumeros(telefono) || telefono.length !== 9) {
            document.getElementById("error-telefono").textContent = "Teléfono inválido";
            valido = false;
        } else {
            document.getElementById("error-telefono").textContent = "";
        }
        
        if (producto === "0") {
            alert("Debes seleccionar un producto antes de enviar el formulario.");
            valido = false;
        }
        // Email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            document.getElementById("error-email").textContent = "Email inválido";
            valido = false;
        } else {
            document.getElementById("error-email").textContent = "";
        }

        return valido;
    }

    // ---------- CÁLCULO DEL PRESUPUESTO ----------
    function calcularPresupuesto() {
        const producto = parseInt(document.getElementById("producto").value);
        const plazo = parseInt(document.getElementById("plazo").value);

        let total = 0;

        if (!isNaN(producto)) {
            total += producto;
        }

        // Sumar solo extras visibles
        const extrasVisibles = document.querySelectorAll(".extras-grupo[style*='display: flex'] .extra:checked");

        extrasVisibles.forEach(extra => {
            total += parseInt(extra.value);
        });

        // Descuento por plazo
        if (!isNaN(plazo)) {
            if (plazo >= 12) {
                total *= 0.85; // 15% descuento
            } else if (plazo >= 6) {
                total *= 0.90; // 10% descuento
            }
        }

        document.getElementById("resultado").value = total.toFixed(2) + " €";
    }

    // ---------- MOSTRAR EXTRAS SEGÚN PRODUCTO ----------
    const selectProducto = document.getElementById("producto");
    const extrasBungalow = document.getElementById("extras-bungalow");
    const extrasFurgo = document.getElementById("extras-furgonetas");

    selectProducto.addEventListener("change", () => {
        const valor = selectProducto.value;

        // Ocultar ambos grupos
        extrasBungalow.style.display = "none";
        extrasFurgo.style.display = "none";

        // Desmarcar todos los extras
        document.querySelectorAll(".extra").forEach(e => e.checked = false);

        // Mostrar extras según producto
        if (valor === "1200") { // Bungalow Premium
            extrasBungalow.style.display = "flex";
        }

        if (valor === "900" || valor === "1500" || valor === "2000") { // Furgonetas
            extrasFurgo.style.display = "flex";
        }

        calcularPresupuesto();
    });

    // ---------- EVENTOS DINÁMICOS ----------
    const inputPlazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");

    if (selectProducto && inputPlazo && extras.length > 0) {
        inputPlazo.addEventListener("input", calcularPresupuesto);
        extras.forEach(extra => {
            extra.addEventListener("change", calcularPresupuesto);
        });

        calcularPresupuesto();
    }

    // ---------- ENVÍO DEL FORMULARIO ----------
    const form = document.getElementById("form-presupuesto");

    form.addEventListener("submit", (e) => {
        const condiciones = document.getElementById("condiciones");

        if (!validarFormulario() || !condiciones.checked) {
            e.preventDefault();
            alert("Revisa los datos y acepta las condiciones de privacidad.");
        }
    });

    // ---------- RESET ----------
    document.getElementById("reset").addEventListener("click", () => {
        document.getElementById("error-nombre").textContent = "";
        document.getElementById("error-apellidos").textContent = "";
        document.getElementById("error-telefono").textContent = "";
        document.getElementById("error-email").textContent = "";

        document.querySelectorAll(".extra").forEach(extra => extra.checked = false);
        document.getElementById("producto").value = "0";
        document.getElementById("plazo").value = "1";

        extrasBungalow.style.display = "none";
        extrasFurgo.style.display = "none";

        calcularPresupuesto();
    });

});
