
        // Inicializar el mapa globalmente
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Función para mostrar el mapa y las atracciones
        async function mostrarMapa(countryCode) {
            const countryInfoUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
            try {
                const response = await fetch(countryInfoUrl);
                const data = await response.json();
                const country = data[0];
                const coords = country.latlng;

                // Mostrar el contenedor del mapa
                const mapaContainer = document.getElementById('mapaContainer');
                mapaContainer.classList.remove('d-none');

                // Desplazarse al mapa
                window.scrollTo({
                    top: mapaContainer.offsetTop - 50,
                    behavior: 'smooth'
                });

                // Actualizar el mapa
                map.setView(coords, 5);
                setTimeout(() => map.invalidateSize(), 200);

                // Generar tarjetas de atracciones
                // Limpiar atracciones previas
                const atraccionesList = document.getElementById('atraccionesList');
                atraccionesList.innerHTML = ''; 

                // ATRACCIONES DE CADA PAÍS
                let atracciones = [];

                // Añadir atracciones de Tailandia
                if (countryCode === 'TH') {  // 'TH' es el código de Tailandia
                    atracciones = [
                        { nombre: 'Parque Nacional Khao Sok', coords: [8.8170, 98.4103], img: src="https://i.ibb.co/NTDXLgJ/3.jpg", alt:"Foto del Parque Nacional Khao Sok"},
                        { nombre: 'Islas Phi Phi', coords: [7.7425, 98.7749], img: src="https://i.ibb.co/4P7q1s8/1.jpg", alt:"Foto de las Islas Phi Phi" },
                        { nombre: 'Templo del Buda Esmeralda', coords: [13.7494, 100.4920], img: src="https://i.ibb.co/LC05fL9/1.jpg", alt:"Foto del Templo del Buda Esmeralda"}
                    ];
                }

                // Añadir atracciones de Grecia
                if (countryCode === 'GR') {  // 'GR' es el código de Grecia
                    atracciones = [
                        { nombre: 'Acrópolis de Atenas', coords: [37.9715, 23.7267], img: src="https://i.ibb.co/q9NVZ36/2.jpg", alt:"Foto de Acrópolis de Atenas"},
                        { nombre: 'Santorini', coords: [36.4612, 25.3653], img: src="https://i.ibb.co/jMdzSsw/3.jpg", alt:"Imagen de Santorini"},
                        { nombre: 'Monasterios de Meteora', coords: [39.7214, 21.6297], img:src="https://i.ibb.co/FwPFZp8/1.jpg", alt:"Foto del Monasterio de Meteora"}
                    ];
                }

                // Añadir atracciones de Egipto
                if (countryCode === 'EG') {  // 'EG' es el código de Egipto
                    atracciones = [
                        { nombre: 'Templo de Karnak', coords: [25.7184, 32.6573], img: src="https://i.ibb.co/SVp8rNP/2.jpg", alt:"Foto del Templo de Krnak"},
                        { nombre: 'Pirámides de Giza', coords: [29.9792, 31.1342], img: src="https://i.ibb.co/Qp8x373/piramides-de-giza.jpg", alt:"Foto de las Pirámides de Giza"},
                        { nombre: 'Templo de Osiris', coords: [26.1843, 31.9190], img: src="https://i.ibb.co/DwcFx6h/templo-de-osiris.jpg", alt:"Foto del Templo de Osiris"}
                    ];
                }


                atracciones.forEach((atraccion) => {
                    const card = document.createElement('div');
                    card.className = 'card-atraccion p-3 mb-4';

                    card.innerHTML = `
                    <img src="${atraccion.img}" alt="${atraccion.nombre}" class="img-fluid rounded">
                    <h5 class="card-title mt-3">${atraccion.nombre}</h5>
                    <button class="btn btn-primary" onclick="centrarMapa([${atraccion.coords}])">Ver en Mapa</button>
                `;

                    atraccionesList.appendChild(card);

                    // Añadir marcador al mapa
                    L.marker(atraccion.coords).addTo(map).bindPopup(atraccion.nombre);
                });
            } catch (error) {
                console.error('Error al cargar datos del país:', error);
            }
        }

        // Función para centrar el mapa en una coordenada específica
        function centrarMapa(coords) {
         const mapaContainer = document.getElementById('mapaContainer');
         if(mapaContainer.classList.contains('d-none')){
            mapaContainer.classList.remove('d-none');
         }
        //desplazarse al mapa
        window.scrollTo({
            top: mapaContainer.offsetTop -50,
            behavior:'smooth'
        }); 
        //centrar mapa
            map.setView(coords, 15);
            setTimeout(() =>
            map.invalidateSize(),200);//se redibuja el mapa
        }

        // Desplazarse automáticamente al mapa cuando se haga clic en un botón de atracción
        document.addEventListener('DOMContentLoaded', () => {
            const atraccionButtons = document.querySelectorAll('.card-atraccion .btn-primary');
            atraccionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const mapa = document.querySelector('#mapaContainer');
                    if (mapa) {
                        window.scrollTo({
                            top: mapa.offsetTop - 50,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        // Manejar el envío del formulario de suscripción
        document.getElementById('formSuscripcion').addEventListener('submit', async (e) => {
            e.preventDefault();

            // Capturar datos del formulario
            const nombre = document.getElementById('nombre').value;
            const dni = document.getElementById('dni').value;
            const email = document.getElementById('email').value;

            const datos = { nombre, dni, email };

            // URL de MockAPI
            const apiURL = 'https://6737db304eb22e24fca64f87.mockapi.io/subscripciones/subscripcion';

            try {
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                if (response.ok) {
                    alert('¡Gracias por suscribirte! Tus datos han sido guardados.');
                    document.getElementById('formSuscripcion').reset(); // Limpiar el formulario
                } else {
                    alert('Hubo un problema al guardar tus datos.');
                }
            } catch (error) {
                console.error('Error al guardar datos en MockAPI:', error);
                alert('No se pudo completar la suscripción.');
            }
        });





        document.addEventListener('DOMContentLoaded', async () => {
            const tarjetas = document.querySelectorAll('.card');

            for (const tarjeta of tarjetas) {
                const countryCode = tarjeta.getAttribute('data-country-code');
                if (countryCode) {
                    const countryInfo = await obtenerInfoPais(countryCode);
                    if (countryInfo) {
                        const infoDiv = tarjeta.querySelector('.country-info');
                        if (infoDiv) {
                            infoDiv.querySelector('.country-population').textContent = `Población: ${countryInfo.population}`;
                            infoDiv.querySelector('.country-currency').textContent = `Moneda: ${countryInfo.currency}`;
                        }
                    }
                }
            }
        });

        async function obtenerInfoPais(countryCode) {
            const apiUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const country = data[0];
                return {
                    population: country.population.toLocaleString('es-ES'),
                    currency: Object.values(country.currencies)[0].name
                };
            } catch (error) {
                console.error(`Error al obtener datos del país (${countryCode}):`, error);
                return null;
            }
        }

        async function agregarInformacionPais(countryCode) {
            const info = await obtenerInfoPais(countryCode);
            const countryElement = document.querySelector(`[data-country-code="${countryCode}"]`);

            if (countryElement) {
                const populationElement = countryElement.querySelector('.country-population');
                const currencyElement = countryElement.querySelector('.country-currency');

                populationElement.textContent = `Población: ${info.population}`;
                currencyElement.textContent = `Moneda: ${info.currency}`;
            } else {
                console.warn(`Elemento no encontrado para el país con código: ${countryCode}`);
            }
        }

        async function mostrarBanderasYNombres(paises) {
            const contenedorPaises = document.getElementById('paises-container');
            contenedorPaises.innerHTML = '';

            for (let pais of paises) {
                const paisCard = document.createElement('div');
                paisCard.className = 'col-md-4 pais-card';
                paisCard.setAttribute('data-country-code', pais.code);

                paisCard.innerHTML = `
            <img src="https://flagcdn.com/w320/${pais.code.toLowerCase()}.png" class="flag-image" alt="${pais.name}">
            <h5 class="country-name">${pais.name}</h5>
            <div class="country-info">
                <p class="country-population">Población: Cargando...</p>
                <p class="country-currency">Moneda: Cargando...</p>
            </div>
            <button class="btn btn-primary" onclick="mostrarMapa('${pais.code}')">Ver Mapa y Atracciones</button>
        `;

                contenedorPaises.appendChild(paisCard);
                await agregarInformacionPais(pais.code);
            }
        }

        const paises = [
            { name: 'Tailandia', code: 'TH' },
            { name: 'Grecia', code: 'GR' },
            { name: 'Egipto', code: 'EG' },
        ];

        window.onload = () => {
            mostrarBanderasYNombres(paises);
        };

