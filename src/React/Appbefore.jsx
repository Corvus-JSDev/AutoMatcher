import $ from "jquery";
import "./App.css";
import logo from "../imgs/car-compare-logo.png";
import closeBtn from "../imgs/close-icon.png";
import { useState, useEffect, useRef } from "react";

var refreshedIndex = 0;
var idIndex = -3;

function updateIndex() {
	if (idIndex >= 10) {
		refreshedIndex = 0;
		idIndex = 0;
	} else {
		refreshedIndex++;
		idIndex++;
	}
	console.log(`refreshedIndex: ${refreshedIndex}, and the idIndex: ${idIndex}`);
}

function DisclaimerInfo() {
	function ShowMoreInfo() {
		$("#disclaimer-more-info__background").css("opacity", "0");
		$("#disclaimer-more-info__background").css("display", "flex");
		$("#disclaimer-more-info__background").animate({ opacity: 1 }, 250);
		$("body").css("overflow", "hidden");
	}
	function HideMoreInfo() {
		$("#disclaimer-more-info__background").fadeOut(250);
		$("body").css("overflow-x", "hidden");
		$("body").css("overflow-y", "scroll");
	}
	function CloseDisclaimer() {
		// $("#disclaimer").slideUp();
		$("#disclaimer").animate(
			{
				position: "relative",
				zIndex: "-1",
				top: "-110",
			},
			{
				duration: 450,
				ease: "easeIn",
			},
		);
		setTimeout(() => {
			$("#center-div").animate(
				{
					position: "relative",
					top: "-90",
				},
				{
					duration: 600,
					ease: "ease",
				},
			);
		}, 150);
	}

	return (
		<>
			<div id="disclaimer">
				<div>
					<div>
						<button
							id="disclaimer-close-btn"
							onClick={CloseDisclaimer}
						></button>
						<p>
							<b>Disclaimer:</b> This app is a demo, some data may be not up to date.
						</p>
					</div>
					<button onClick={ShowMoreInfo}>Click to learn more</button>
				</div>

				<hr />
			</div>

			<div
				id="disclaimer-more-info__background"
				onClick={HideMoreInfo}
			>
				<div
					id="disclaimer-more-info"
					onClick={(e) => e.stopPropagation()}
				>
					<img
						src={closeBtn}
						onClick={HideMoreInfo}
					/>
					<p>
						<b>TL;DR</b>
						<br />I apologize for the inconvenience, but I believe in being completely
						transparent and upfront with users. The reason this is not a full-fledged app is
						due to cost constraints in accessing car API databases 24/7.
					</p>
					<hr />
					<p>
						<b>The Problem:</b>
						<br />I wanted to create an app that not only uses APIs as its core functionality,
						but also something that myself and others would actually find useful. Of course,
						there are hundreds of weather apps and Spotify front-ends that I could have
						created in a weekend, but where&apos;s the fun in that?
					</p>
					<br /> <br />
					<p>
						Every car API company runs on a business-to-business sales approach. This is
						because most of their customers are car dealerships or sites like Kelley Blue Book
						and Edmunds. While there are free trials they only allow ~15 API calls per month,
						and it goes without saying that this just isn&apos;t sufficient for an app like
						this.
					</p>
					<br /> <br />
					<p>
						<b>My Solution:</b>
						<br />
						To address this I made as many API calls as I could, then painstakingly inputting
						that data into a local JSON file. I then eliminated external API calls using fetch
						method. If you wish you use this site as a template you can download the files and
						edit the URL endpoints, then go into the <code>api_keys.js</code> file to input
						your own tokens.
					</p>
					<br /> <br />
					<a href="#">Download This Website Here</a>
				</div>
			</div>
		</>
	);
}

function InfoLabels() {
	return (
		<div id="info-section">
			<div className="info-section__margin"></div>

			<div className="data-label">- Technicals -</div>
			<div className="data-box">MSRP</div>
			<div className="data-box">Transmission</div>
			<div className="data-box">Drive Type</div>

			<div className="data-label">- Engine Power -</div>
			<div className="data-box">Horsepower</div>
			<div className="data-box">Torque</div>

			<div className="data-label">- Body -</div>
			<div className="data-box">Body Type</div>
			<div className="data-box">Doors</div>
			<div className="data-box">Seats</div>
			<div className="data-box">Curb Weight</div>

			<div className="data-label">- Fuel -</div>
			<div className="data-box">Fuel Type</div>
			<div className="data-box">Combined MPG</div>
			<div className="data-box">Tank Capacity</div>
			<div className="data-box">EST Range</div>
		</div>
	);
}

const filePath = "../carData.json";

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

function CarCard({ carData }) {
	const hp = carData.specs.engine.max_hp.slice(0, 3);
	const hp_rpm = carData.specs.engine.max_hp.slice(-4);

	const torq = carData.specs.engine.torque.slice(0, 3);
	const torq_rpm = carData.specs.engine.torque.slice(-4);

	const mpg = carData.specs.fuel.combined_mpg;
	const tankSize = carData.specs.fuel.tank_size;
	const calcRange = Number(mpg) * Number(tankSize);

	const weight = carData.specs.body.curb_weight.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	function LabelButtonsAndCarCards() {
		idIndex++;

		const handleClick = (e) => {
			EnableChangeCarPopUp(e.target.id);
		};

		return (
			<button
				key={`buttonId-${idIndex}`}
				id={`buttonId-${idIndex}`}
				onClick={handleClick}
				className="center-div__button"
			>
				Select Car
			</button>
		);
	}

	return (
		<div
			className="car-card"
			id={`car-card-Id-${idIndex + 1}`}
		>
			<div className="img-container">
				{carData.img !== null ? (
					<img src={`./src/imgs/car-pics/${carData.img}`} />
				) : (
					<LabelButtonsAndCarCards />
				)}
			</div>

			<div className="info-container">
				<div className="technicals">
					<div className="info-box msrp">
						{carData.specs.technicals.msrp ? (
							<p>{carData.specs.technicals.msrp}</p>
						) : (
							<p>--</p>
						)}
						{/* <p>{carData.specs.technicals.msrp}</p> */}
					</div>
					<div className="info-box transmission">
						<p>{carData.specs.technicals.trans}</p>
					</div>
					<div className="info-box drive-type">
						<p>{carData.specs.technicals.drive_type}</p>
					</div>
				</div>

				<div className="info-box-container engine">
					<div className="info-box horsepower">
						<p>{hp}</p>
						<p>(@ {hp_rpm})</p>
					</div>
					<div className="info-box torque">
						<p>{torq}</p>
						<p>(@ {torq_rpm})</p>
					</div>
				</div>

				<div className="info-box-container body">
					<div className="info-box body-type">
						<p>{carData.specs.body.type}</p>
					</div>
					<div className="info-box doors">
						<p>{carData.specs.body.num_door}</p>
					</div>
					<div className="info-box seats">
						<p>{carData.specs.body.num_seats}</p>
					</div>
					<div className="info-box curb-weight">
						<p>{weight}</p>
						<p>(lbs)</p>
					</div>
				</div>

				<div className="info-box-container fuel">
					<div className="info-box fuel-type">
						<p>{carData.specs.fuel.fuel_type}</p>
					</div>
					<div className="info-box mpg">
						<p>{carData.specs.fuel.combined_mpg}</p>
					</div>
					<div className="info-box tank-capacity">
						<p>{carData.specs.fuel.tank_size}</p>
					</div>
					<div className="info-box range">
						{isNaN(calcRange) ? <p>--</p> : <p>{calcRange}</p>}

						<p>(miles)</p>
					</div>
				</div>
			</div>
		</div>
	);
}

let columnCarData = [
	// onsole.log
	// This is where the user selected info goes
	// 3 data points need to be here for there to be 3 columns
	{ make: "", model: "" },
	{ make: "", model: "" },
	{ make: "", model: "" },
];

function InfoContainer() {
	return (
		<div id="center-div">
			<div id="car-grid-container">
				<InfoLabels />
				<div id="car-card-container">
					{columnCarData.map((car, index) => (
						<CarContainer
							key={index}
							make={car.make}
							model={car.model}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function CarContainer({ make, model }) {
	const [carData, setCarData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const userCarData = await getCarData(make, model);
			setCarData(userCarData);
		}

		fetchData();
	}, [make, model]);

	if (!carData) {
		// Default values when carData is null
		const defaultValues = {
			img: null,
			specs: {
				technicals: {
					msrp: "--",
					trans: "--",
					drive_type: "--",
				},
				engine: {
					max_hp: "--",
					torque: "--",
				},
				body: {
					type: "--",
					num_door: "--",
					num_seats: "--",
					curb_weight: "--",
				},
				fuel: {
					fuel_type: "--",
					combined_mpg: "--",
					tank_size: "--",
				},
			},
		};
		return <CarCard carData={defaultValues} />;
	}

	return <CarCard carData={carData} />;
}

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

function DisableChangeCarPopUp() {
	$("#car-selection-pop-up__background").fadeOut(250);
	$("body").css("overflow-x", "hidden");
	$("body").css("overflow-y", "scroll");
}

function EnableChangeCarPopUp(idOfButton) {
	//onsole.log(idOfButton);
	const ancestorContainerId = $(`#${idOfButton}`).closest(".car-card").attr("id");

	$("#car-selection-pop-up").attr("class", `column-to-change-${ancestorContainerId}`);

	$("#car-selection-pop-up__background").css("opacity", "0");
	$("#car-selection-pop-up__background").css("display", "flex");
	$("#car-selection-pop-up__background").animate({ opacity: 1 }, 250);
	$("body").css("overflow", "hidden");
}

function CarSelectionPopUp() {
	const [listOfCarBrands, setListOfCarBrands] = useState([]);
	const [listOfCarsModels, setListOfCarsModels] = useState([]);

	useEffect(() => {
		async function fetchDataForCars() {
			try {
				const data = await fetchCarData(filePath);
				const makes = data.map((make) => make.name);
				setListOfCarBrands(makes);
			} catch (error) {
				console.error(`fetchDataForCars() Error: ${error}`);
			}
		}

		fetchDataForCars();
	}, []);

	function logCarSelection() {
		//onsole.log();
		const columnToChange = $("#car-selection-pop-up").attr("class");
		const lastChar = Number(columnToChange[columnToChange.length - 1]);
		console.log(lastChar);

		const initialStartingValueOfDiv = Math.floor((lastChar - 1) / 3 + 1);
		console.log(`initialStartingValueOfDiv: ${initialStartingValueOfDiv}`);

		const carMakeValue = $("#select-car-make").val();
		const carModelValue = $("#select-car-model").val();
		console.log(carMakeValue, carModelValue);

		if (columnToChange == "column-to-change-car-card-Id-0") {
			console.log("column 1 changed");
			columnCarData[0].make = carMakeValue;
			columnCarData[0].model = carModelValue;
		}
		if (columnToChange == "column-to-change-car-card-Id-1") {
			console.log("column 2 changed");
			columnCarData[1].make = carMakeValue;
			columnCarData[1].model = carModelValue;
		}
		if (columnToChange == "column-to-change-car-card-Id-2") {
			console.log("column 3 changed");
			columnCarData[2].make = carMakeValue;
			columnCarData[2].model = carModelValue;
		}

		console.log(columnCarData);
	}

	async function ChangeCarModelOptions(event) {
		const selectedCarBrand = event.target.value;
		const data = await fetchCarData(filePath);

		for (let i = 0; i < data.length; i++) {
			const carIteration = data[i];

			if (carIteration.name === selectedCarBrand) {
				const modelsForOptions = carIteration.models.map((item) => item.name);
				setListOfCarsModels(modelsForOptions);

				break;
			}
		}
	}

	const makeOptionsOutput = listOfCarBrands.map((item) => {
		return (
			<option
				key={item}
				value={item}
			>
				{item}
			</option>
		);
	});
	const modelOptionsOutput = listOfCarsModels.map((item) => {
		return (
			<option
				key={item}
				value={item}
			>
				{item}
			</option>
		);
	});

	return (
		<div
			id="car-selection-pop-up__background"
			onClick={DisableChangeCarPopUp}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				id="car-selection-pop-up"
			>
				<h1>Select Car Info</h1>
				<div id="selection-container">
					<div id="selection-car">
						<label htmlFor="select-car-make">Choose a Make:</label>
						<select
							defaultValue="defaultValue"
							id="select-car-make"
							onChange={ChangeCarModelOptions}
						>
							<option
								value="defaultValue"
								disabled
							>
								Pick a brand
							</option>
							{makeOptionsOutput}
						</select>
					</div>

					<div id="selection-car">
						<label htmlFor="select-car-make">Choose a Model:</label>
						<select
							defaultValue="defaultValue"
							id="select-car-model"
						>
							<option
								value="defaultValue"
								disabled
							>
								Pick a car
							</option>
							{modelOptionsOutput}
						</select>
					</div>
				</div>

				<button
					className="submit-car-selection"
					onClick={logCarSelection}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

function App() {
	const [, forceUpdate] = useState();

	function forceRerender() {
		console.log("button clicked");
		forceUpdate((prevState) => !prevState);
	}

	return (
		<>
			<nav id="nav-bar">
				<img
					src={logo}
					alt="logo"
				/>
				<button onClick={forceRerender}>Force Re-render</button>
				<h1>Car Comparer</h1>
			</nav>
			<DisclaimerInfo />
			<CarSelectionPopUp />
			<InfoContainer />
		</>
	);
}

export default App;
