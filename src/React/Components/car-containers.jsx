import $ from "jquery";
import "../App.css";
import { useState, useEffect } from "react";
import { getCarData, fetchCarData } from "./fetchCarData.jsx";
import { v4 as uuidv4 } from "uuid";
import closeBtn from "../../imgs/close-icon.png";

function CarCard({ carData }) {
	// calc what id each column should have
	const [idIndex] = useState(uuidv4());

	// calc data hp, torq, mpg, range
	const hp = carData.specs.engine.max_hp.slice(0, 3);
	const hp_rpm = carData.specs.engine.max_hp.slice(-4);
	const torq = carData.specs.engine.torque.slice(0, 3);
	const torq_rpm = carData.specs.engine.torque.slice(-4);
	const mpg = carData.specs.fuel.combined_mpg;
	const tankSize = carData.specs.fuel.tank_size;
	const calcRange = Math.floor(Number(mpg) * Number(tankSize));

	// add a comma after the first 3 numbers.  2000 -> 2,000
	const weight = carData.specs.body.curb_weight.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Button to select a new car
	function SelectCarBtn() {
		const handleClick = (e) => {
			EnableChangeCarPopUp(e.target.id);
		};

		return (
			<button
				key={idIndex}
				id={idIndex}
				onClick={handleClick}
				className="center-div__button"
			>
				Select Car
			</button>
		);
	}

	const handleClick2 = (e) => {
		ResetCarData(e.target.id);
	};
	function ResetCarData(idOfButton) {
		const updatedData = [...columnCarData];
		let newData = { make: "", model: "" };

		const carCard = $(".car-card");

		for (let i = 0; i < carCard.length; i++) {
			const element = carCard[i];

			if (idOfButton == element.id) {
				updatedData[i] = newData;
				setColumnCarData(updatedData);
				break;
			}
		}
	}

	// actual column where the car data will be displayed
	return (
		<div
			className="car-card"
			id={idIndex}
		>
			<div className="img-container">
				{carData.img !== null ? (
					<>
						<img src={`./src/imgs/car-pics/${carData.img}`} />
						<img
							className="close-btn-for-car-car"
							src={closeBtn}
							id={idIndex}
							onClick={handleClick2}
						/>
					</>
				) : (
					<SelectCarBtn />
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
						{isNaN(calcRange) || calcRange == 0 ? <p>--</p> : <p>{calcRange}</p>}

						<p>(miles)</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Labels for the left side
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

var setColumnCarData;
var columnCarData;

// This is what prints the data from columnCarData into the CarCard
function InfoContainer() {
	// This is where the user selected info goes
	[columnCarData, setColumnCarData] = useState([
		// 3 data points need to be here for there to be 3 columns
		{ make: "", model: "" },
		{ make: "", model: "" },
		{ make: "", model: "" },
	]);

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

// Give default data to the column if the data is not available
function CarContainer({ make, model }) {
	// This is what needs to be re-rendered
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

// Animations
function DisableChangeCarPopUp() {
	$("#car-selection-pop-up__background").fadeOut(250);
	$("body").css("overflow-x", "hidden");
	$("body").css("overflow-y", "scroll");
}
function EnableChangeCarPopUp(idOfButton) {
	// Read the ID of the column that the button is in
	const ancestorContainerId = $(`#${idOfButton}`).closest(".car-card").attr("id");

	// set the class of the pop up section to the value of the column that will be changed, this is to keep track of what btn opened the pop-up
	$("#car-selection-pop-up").attr("class", ancestorContainerId);

	$("#car-selection-pop-up__background").css("opacity", "0");
	$("#car-selection-pop-up__background").css("display", "flex");
	$("#car-selection-pop-up__background").animate({ opacity: 1 }, 250);
	$("body").css("overflow", "hidden");
}

function CarSelectionPopUp() {
	const [listOfCarBrands, setListOfCarBrands] = useState([]);
	const [listOfCarsModels, setListOfCarsModels] = useState([]);

	// List all of the car brands inside carData.json for the user to select
	useEffect(() => {
		async function fetchDataForCars() {
			try {
				// removed filePath from the param section because idk if its needed
				const data = await fetchCarData();
				const makes = data.map((make) => make.name);
				setListOfCarBrands(makes);
			} catch (error) {
				console.error(`fetchDataForCars() Error: ${error}`);
			}
		}

		fetchDataForCars();
	}, []);

	// List all of the available models based on what brand the user selected
	async function ChangeCarModelOptions(event) {
		const selectedCarBrand = event.target.value;
		// removed filePath from the param section because idk if its needed
		const data = await fetchCarData();

		for (let i = 0; i < data.length; i++) {
			const carIteration = data[i];

			if (carIteration.name === selectedCarBrand) {
				const modelsForOptions = carIteration.models.map((item) => item.name);
				setListOfCarsModels(modelsForOptions);

				break;
			}
		}
	}
	// This is where that data is printed into individual options
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

	// Log whatever the user picks to the console
	function LogCarSelection() {
		// Grab the class name of the pop up window (aka the id of the button that was pressed and in turn the id of the column that will be changed)
		const fullClassName = $("#car-selection-pop-up").attr("class");

		const carMakeValue = $("#select-car-make").val();
		const carModelValue = $("#select-car-model").val();

		const updatedData = [...columnCarData];
		let newData = { make: carMakeValue, model: carModelValue };

		const carCard = $(".car-card");
		for (let i = 0; i < carCard.length; i++) {
			const element = carCard[i];

			if (fullClassName == element.id) {
				updatedData[i] = newData;
				setColumnCarData(updatedData);
				break;
			}
		}
		DisableChangeCarPopUp();
	}

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
					onClick={LogCarSelection}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

function CarContainers() {
	return (
		<div>
			<InfoContainer />
			<CarSelectionPopUp />
		</div>
	);
}

export default CarContainers;
