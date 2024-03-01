// If the user clicks to another tab, change the title of the page
/* 
document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		document.title = "Hey!! Come back ;(";
	} else {
		document.title = "Welcome back, friend!";
		setTimeout(() => {
			document.title = "Car Comparison";
		}, 2000);
	}
});
 */

// API data

/*
* This Code is commented out for cost reasons, if you wish to add your own api data, simply add the correct URL, then go into api_keys.js to add you tokens


import { publicToken, secretToken } from "../private/api_keys.js";
const authentication_token_URL = "https://api.example.com/auth";

async function getNewAuthToken(publicToken, secretToken) {
	try {
		const response = await fetch(authentication_token_URL, {
			method: "POST",
			headers: {
				Accept: "text/plain",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				api_token: publicToken,
				api_secret: secretToken,
			}),
		});

		const data = await response.text();
		console.log(data);
		// Add whatever else you need here
	} catch (error) {
		console.error("Error:", error);
	}
}
getNewAuthToken(publicToken, secretToken);
*/

//
//
//
//
//

// If your using external API data, delete this section
import fs from "fs";

const filePath = "../carData.json";

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const carData = JSON.parse(data);
	console.log(carData);

	/*
	console.log(carData.makes[1]);
	console.log(carData.makes[1].models[0]);
	console.log(carData.makes[1].models[0].specs);
	console.log(carData.makes[1].models[0].specs.engine);
	console.log(carData.makes[1].models[0].specs.engine.max_hp);
	*/
});
// End of file import
