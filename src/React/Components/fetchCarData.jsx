const filePath = "/carData.json";
// fetch data for a specific car
async function getCarData(make, model) {
	try {
		const response = await fetch(filePath);

		if (!response.ok) {
			throw new Error(`Fetch error!: ${response.status}`);
		}

		const data = await response.json();
		const carData = data.makes;

		for (let i = 0; i < carData.length; i++) {
			const currentMakeIteration = carData[i].name;

			if (currentMakeIteration === make) {
				for (let x = 0; x < carData[i].models.length; x++) {
					const currentModelIteration = carData[i].models[x].name;

					if (currentModelIteration === model) {
						return carData[i].models[x];
					}
				}
				break;
			}
		}
	} catch (error) {
		console.error("getCarData fetch Error:", error);
	}
}

// fetch the raw data from carData.json
async function fetchCarData() {
	try {
		const response = await fetch(filePath);

		if (!response.ok) {
			throw new Error(`Fetch error!: ${response.status}`);
		}

		const data = await response.json();
		return data.makes;
	} catch (error) {
		console.error("getCarData fetch Error:", error);
	}
}

export { getCarData, fetchCarData };
