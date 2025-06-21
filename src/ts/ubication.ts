const obtenirCoordenades = async () =>
	new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocalització no disponible al navegador"));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve(pos.coords);
			},
			(err) => {
				reject(err);
			},
			{ enableHighAccuracy: true, timeout: 10000 },
		);
	});
