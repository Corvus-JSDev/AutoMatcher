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
