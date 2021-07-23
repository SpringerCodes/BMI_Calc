
//leaving old code from fluid conversion for future reference

/*
function setup() {
    document.getElementById("litres").onclick = function () {
        setUnits("Enter gallons:");
    };
    document.getElementById("gallons").onclick = function () {
        setUnits("Enter litres:");
    };

}


function setUnits(unit) {
    var label = document.getElementById("unitLabel");
    label.innerHTML = unit;
}

function convert() {
    var gallonsButton = document.getElementById("gallons");
    var litresButton = document.getElementById("litres");
    var fluidAmount = document.getElementById("units");
    var answer = document.getElementById("answer");
    var units = document.getElementById("units").value;

    if (gallonsButton.checked && validateInput()) {
        if (units == 1) {
            answer.innerHTML = units + " litre converts to " + (units / 3.789).toFixed(2) + " gallons.";
        } else {
            answer.innerHTML = units + " litres converts to " + (units / 3.789).toFixed(2) + " gallons.";
        }

    } else if (litresButton.checked && validateInput()) {
        if (units == 1) {
            answer.innerHTML = units + " gallon converts to " + (units * 3.789).toFixed(2) + " litres.";
        } else {
            answer.innerHTML = units + " gallons converts to " + (units * 3.789).toFixed(2) + " litres.";
        }

    }

}

function validateInput() {
    var gallonsButton = document.getElementById("gallons");
    var litresButton = document.getElementById("litres");
    if (gallonsButton.checked && document.getElementById("units").value > 4000) {
        alert("Value must be less than 4000 litres.");
        return false;
    } else if (litresButton.checked && document.getElementById("units").value > 1000) {
        alert("Value must be less than 1000 gallons.");
        return false;

    } else return true;
}
*/
