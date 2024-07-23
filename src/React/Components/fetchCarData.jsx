// const filePath = "/carData.json";
import rawCarData from "/carData.json";

// fetch the raw data from carData.json
async function fetchCarData() {
	try {
		// const response = await fetch(filePath);
		const response = await rawCarData;

		// if (!response.ok) {
		// 	throw new Error(`ERROR CODE 1: ${response.status}`);
		// }

		// const data = await response.json();
		return response.makes;
	} catch (error) {
		console.error("ERROR CODE 2:", error);
	}
}

// fetch data for a specific car
async function getCarData(make, model) {
	try {
		// const response = await fetch(filePath);
		const response = await rawCarData;

		// if (!response.ok) {
		// 	throw new Error(`ERROR CODE 3: ${response.status}`);
		// }

		// const data = await response.json;
		const carData = await response.makes;

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
		console.error("ERROR CODE 4: ", error);
	}
}

export { getCarData, fetchCarData };
