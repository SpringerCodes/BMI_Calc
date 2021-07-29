function advicePage() {
    if (localStorage.getItem("tbRecords") ===
        null) {
        alert("No records exist.");

        $(location).attr("href", "#pageMenu");
    } else {

        var user = JSON.parse(localStorage.getItem(
            "user"));
        var BMILevel = user.BMIRange;

        var tbRecords = JSON.parse(localStorage.getItem(
            "tbRecords"));
        tbRecords.sort(compareDates);
        var i = tbRecords.length - 1;
        var BMI = tbRecords[i].BMI;

        var c = document.getElementById(
            "AdviceCanvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(0, 0, 550, 550);
        ctx.font = "22px Arial";
        drawAdviceCanvas(ctx, BMI);

    }
}

function drawAdviceCanvas(ctx, BMI) {
    ctx.font = "22px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Your current BMI is " + BMI +
        ".", 25, 320);

    ctx.fillText(
        "Your target BMI range is: 18.5-24.9",
        25, 350);
    BMILevelWrite(ctx, BMI);
    BMIMeterWrite(ctx, BMI);
}

//For deciding what to write for given values of BMI level A
function BMILevelWrite(ctx, BMI) {
    if ((BMI >= 0.01) && (BMI <= 18.4)) {
        writeAdvice(ctx, "blue");
    } else if ((BMI > 18.5) && (BMI <= 24.9)) {
        writeAdvice(ctx, "green");
    } else if ((BMI > 25) && (BMI <= 29.9)) {
        writeAdvice(ctx, "yellow");
    } else if ((BMI > 30) && (BMI <= 34.9)) {
        writeAdvice(ctx, "orange");
    } else if ((BMI > 35) && (BMI <= 39.9)) {
        writeAdvice(ctx, "red");
    } else {
        writeAdvice(ctx, "purple");
    }
}


function writeAdvice(ctx, level) {
    var adviceLine1 = "";
    var adviceLine2 = "";

    if (level == "purple") {
        adviceLine1 =
            "You are morbidly obese.";
        adviceLine2 = "Please consult your doctor.";
    } else if (level == "red") {
        adviceLine1 =
            "You are severely obese.";
        adviceLine2 = "Please consult your doctor.";
    } else if (level == "orange") {
        adviceLine1 =
            "You are obese.";
        adviceLine2 = "Please consult your doctor.";
    } else if (level == "yellow") {
        adviceLine1 =
            "You are overweight.";
        adviceLine2 = "Please consult your doctor.";
    } else if (level == "green") {
        adviceLine1 =
            "You are a healthy weight.";
        adviceLine2 = "No action needed.";
    } else if (level = "blue") {
        adviceLine1 =
            "You are underweight.";
        adviceLine2 = "Please consult your doctor.";
    }

    ctx.fillText(adviceLine1, 25, 410);
    ctx.fillText(adviceLine2, 25, 440);
}

function BMIMeterWrite(ctx, BMI) {

    var cg = new RGraph.CornerGauge(
            "AdviceCanvas", 12, 45, BMI)
        .Set("chart.colors.ranges", [
        [40, 45, "purple"],
        [35, 40, "red"],
        [30, 35, "orange"],
        [25, 30, "yellow"],
        [18.5, 25, "#0f0"],
        [10, 18.5, "blue"]
      ]);

    drawMeter(cg);
}



// Meter properties
function drawMeter(g) {
    g.Set("chart.value.text.units.post", " BMI")
        .Set("chart.value.text.boxed", false)
        .Set("chart.value.text.size", 14)
        .Set("chart.value.text.font", "Verdana")
        .Set("chart.value.text.bold", true)
        .Set("chart.value.text.decimals", 2)
        .Set("chart.shadow.offsetx", 5)
        .Set("chart.shadow.offsety", 5)
        .Set("chart.scale.decimals", 2)
        .Set("chart.title", "BMI LEVEL")
        .Set("chart.radius", 250)
        .Set("chart.centerx", 50)
        .Set("chart.centery", 250)
        .Draw();
}
