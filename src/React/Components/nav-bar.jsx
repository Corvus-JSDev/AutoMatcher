import logo from "../../imgs/car-compare-logo.png";

function NavBar() {
	return (
		<nav id="nav-bar">
			<img
				src={logo}
				alt="logo"
			/>
			<h1>Car Comparer</h1>
		</nav>
	);
}

export default NavBar;
