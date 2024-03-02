import $ from "jquery";

// If the user clicks to another tab, change the title of the page
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

// API data
/*
* This Code is commented out since im getting the data locally, if you wish to add your own api data, simply add the correct URL, then go into api_keys.js to add you tokens

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

// Delete this if you are using external API
const filePath = "../carData.json";

async function getCarData() {
	try {
		const response = await fetch(filePath);

		if (!response.ok) {
			throw new Error(`Fetch error!: ${response.status}`);
		}

		const carData = await response.json();
		console.log(carData);
	} catch (error) {
		console.error("getCarData fetch Error:", error);
	}
}
getCarData();
