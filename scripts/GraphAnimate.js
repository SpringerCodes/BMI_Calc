function drawGraph() {
    if (localStorage.getItem("tbRecords") ===
        null) {
        alert("No records exist.");

        $(location).attr("href", "#pageMenu");
    } else {
        setupCanvas();

        var BMIarr = new Array();
        var Datearr = new Array();
        getBMIhistory(BMIarr, Datearr);

        var BMILower = new Array(2);
        var BMIUpper = new Array(2);
        getBMIbounds(BMILower, BMIUpper);

        drawLines(BMIarr, BMIUpper, BMILower,
            Datearr)
        labelAxes();
    }
}

function setupCanvas() {

    var c = document.getElementById("GraphCanvas");
    var ctx = c.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 500, 500);

}

function getBMIhistory(BMIarr, Datearr) {
    var tbRecords = JSON.parse(localStorage.getItem(
        "tbRecords"));

    tbRecords.sort(compareDates);

    for (var i = 0; i < tbRecords.length; i++) {
        var date = new Date(tbRecords[i].Date);

        /*These methods start at 0, must increment
         * by one to compensate
         */
        var m = date.getMonth() + 1;
        var d = date.getDate() + 1;
        
        if (m == 12 && d == 32){
            m=1;
            d=1;
        }
        //The x-axis label
        Datearr[i] = (m + "/" + d);

        //The point to plot
        BMIarr[i] = parseFloat(tbRecords[i].BMI);
    }
}


function getBMIbounds(BMILower, BMIUpper) {
    /*These lines show upper and lower bounds
     * of acceptable BMI levels (for each
     * stage)
     */
    BMIUpper[0] = BMIUpper[1] = 24.9;
    BMILower[0] = BMILower[1] = 18.5;

}

function drawLines(BMIarr, BMIUpper, BMILower,
    Datearr) {
    var BMIline = new RGraph.Line({
        id: 'GraphCanvas',
        data: [BMIarr, BMIUpper, BMILower],
        options: {
            xaxisLabels: Datearr,
            colors: ["blue", "green", "red"],
            shadow: true,
            shadowOffsetx: 1,
            shadowOffsety: 1,
            linewidth: 1,
            numxticks: 6,
            yaxisScaleDecimals: 1,
            xaxispos: "bottom",
            marginLeft: 60,
            marginBottom: 50,            
            tickmarksStyle: 'filledcircle',
            tickmarksSize: 2,
            title: "BMI History",
            key: ['BMI', 'Max. Healthy BMI', 'Min. Healthy BMI'],
            keyColors: ['blue', 'green', 'red'],
            keyPositionX: 300,
            keyPositionY: 380
        }
    }).draw();

}

function labelAxes() {
    var c = document.getElementById("GraphCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "11px Georgia";
    ctx.fillStyle = "green";
    ctx.fillText("Date(MM/DD)", 400, 480);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("BMI Value", -250, 10);
}
