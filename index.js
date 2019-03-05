const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views/pages");
app.set("view engine", "ejs");

app.get("/getRate", (req, res) => {
	type = req.query.types;
	weight = Number(req.query.weight);

	var price = calculateRate(type, weight);

	const params = {price: price, type: type, weight: weight};

	res.render("getRate", params);
});

function calculateRate(type, weight) {
	var weight = Math.ceil(weight);

	if (type == "Letters (Stamped)") {
		var priceStart = 0.55;
		if (weight > 0 && weight <= 3) {
			var multiplier = weight-1;
			var price = (multiplier * .15) + priceStart;
		} else if (weight > 3 && weight <= 3.5) {
			var price = 0.95;
		}
	} else if (type == "Letters (Metered)") {
		var priceStart = 0.50;
		if (weight > 0 && weight <= 3) {
			var multiplier = weight-1;
			var price = (multiplier * .15) + priceStart;
		} else if (weight > 3 && weight <= 3.5) {
			var price = 1.00;
		}
	} else if (type == "Large Envelopes (Flats)") {
		var priceStart = 1.00;
		if (weight > 0 && weight <= 13) {
			var multiplier = weight-1;
			var price = (multiplier * .15) + priceStart;
		}
	} else if (type == "First-Class Package Service--Retail") {
		if (weight > 0 && weight <= 4) {
			var price = 3.70;
		} else if (weight > 4 && weight <= 8) {
			var price = 4.44;
		} else if (weight > 8 && weight <= 12) {
			var price = 5.24;
		} else if (weight > 12 && weight <= 13) {
			var price = 5.78;
		}
	}
	return price.toFixed(2);
}

app.listen(port);