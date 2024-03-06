import closeBtn from "../../imgs/close-icon.png";
import $ from "jquery";

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

export default DisclaimerInfo;
