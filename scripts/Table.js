//removes all record data from localStorage
$("#btnClearHistory").on("click", function () {
    localStorage.removeItem("tbRecords");
    listRecords();
    alert("All records have been deleted");

});

/* The value of the submit record button is used
to determine which operation should be performed */
$("#btnAddRecord").on("click", function () {
    /*.button("refresh) function forces jQuery
    mobile to refresh the text on the button */
    $("#btnSubmitRecord").val("Add");
    if ($("btnSubmitRecord").hasClass("btn-ui-hidden")) {
        $("btnSubmitRecord").button("refresh");
    }
});

$("#frmNewRecordForm").on("submit", function () {
    
    var formOperation = $("#btnSubmitRecord").val();
    
    if (formOperation == "Add") {
        addRecord();
        $.mobile.changePage("#pageRecords");
    } else if (formOperation == "Edit") {
        editRecord($("#btnSubmitRecord").attr(
            "indexToEdit"));
        $.mobile.changePage("#pageRecords");
        $("#btnSubmitRecord").removeAttr(
            "indexToEdit");
    }

    /*Must return false, or else submitting form
      results in reloading the page
     */
    return false;
});

$("#pageNewRecordForm").on("pageshow", function () {
    //we need to know if we are editing or adding a record everytime we show this page
    //if we are adding a record we show the form with blank inputs
    var formOperation = $("#btnSubmitRecord").val();

    if (formOperation == "Add") {
        clearRecordForm();
    } else if (formOperation == "Edit") {
        //if we are editing a record we load the stored dat in the form
        showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
    }
});

$("#pageNewRecord").on("pageShow", function () {
    //we need to know if we are editing or adding a record every time we show this page
    //If we are adding a record we show the form with blank inputs
    var formOperation = $("#btnSubmitRecord").val();

    if (formOperation == "Add") {
        clearRecordForm();
    } else if (formOperation == "Edit") {
        //if we are editing a record we load the stored data in the form
        showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
    }
});

function loadUserInformation() {
    try {
        var user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        //Google browsers use different error constant
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeds.");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }
        console.log(e);
    }
    if (user != null) {
        $("#divUserSection").empty();
        var today = new Date();
        var dob = new Date(user.DOB);
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        $("#divUserSection").append("User's Name: " + user.FirstName + " " + user.LastName + "<br>Age: " +
            age + "<br>Health Card Number: " + user.HealthCardNumber + "<br>New Password: " + user.NewPassword);
        $("#divUserSection").append("<br><a href='#pageUserInfo' data-mini='true' id='btnProfile' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
        $('btnProfile').button(); //refresh the button
    }
}

function clearRecordForm() {
    $('#datExamDate').val("");
    $('#txtWeight').val("");
    $('#txtHeight').val("");
    return true;
}

function compareDates(a, b) {
    var x = new Date(a.Date);
    var y = new Date(b.Date);

    if (x > y) {
        return 1;
    } else {
        return -1;
    }
}

function listRecords() {
    try {
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
    } catch (e) {
        //Google browsers use different error constant
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeds.");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }
        console.log(e);
    }
    //load previous records, if they exist
    if (tbRecords != null) {
        //order the records by date
        tbRecords.sort(compareDates);

        //initializing the table
        $("#tblRecords").html(
            "<thead>" +
            "   <tr>" +
            "      <th>Date</th>" +
            "      <th><abbr title='Body Mass Index'>BMI</abbr></th>" +
            "      <th>Weight</th>" +
            "      <th>Height</th>" +
            "      <th>Edit</th>" +
            "      <th>Delete</th>" +
            "   </tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );

        //loop to insert each record into the table
        for (var i = 0; i < tbRecords.length; i++) {
            var rec = tbRecords[i];
            $("#tblRecords tbody").append("<tr>" +
                "<td>" + rec.Date + "</td>" +
                "<td>" + rec.BMI + "</td>" +
                "<td>" + rec.Weight + "</td>" +
                "<td>" + rec.Height + "</td>" +
                "<td><a href='#pageNewRecordForm' class='ui-btn ui-corner-all ui-shadow ui-mini ui-btn-icon-notext ui-icon-edit'  onclick='callEdit(" + i + ")'></a></td>" +
                "<td><a href='#'class='ui-btn ui-corner-all ui-shadow ui-mini ui-btn-icon-notext ui-icon-delete'  onclick='callDelete(" + i + ")'></a></td>" +
                "</tr>");

        }
    } else {
        tbRecords = []; //If there is no data,set an empty array
        $("#tblRecords").html("");
    }
    return true;
}

function showRecordForm(index) {
    try {
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var rec = tbRecords[index];
        $('#datExamDate').val(rec.Date);
        $('#txtWeight').val(rec.Weight);
        $('#txtHeight').val(rec.Height);
    } catch (e) {
        //google browsers use different error constant
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeds.");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("error: Saving to local storage.");
        }
        console.log(e);
    }
}

/* checks that users have entered all valid info and
that the date they have enetered is not in the future*/
function checkRecordForm() {
    //for finding current date
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var currentDate = d.getFullYear() + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + date).length < 2 ? '0' : '') + date;

    if (($("#datExamDate").val() != "") &&
        ($("#datExamDate").val() <= currentDate) &&
        (parseFloat($("#txtWeight").val()) > 0) &&
        (parseFloat($("#txtHeight").val()) > 0)) {
        return true;
    } else {
        return false;
    }
}

function callEdit(index) {
    $("#btnSubmitRecord").attr("indexToEdit",
        index);
    /*.button("refresh") function forces jQuery
     * Mobile to refresh the text on the button
     */
    $("#btnSubmitRecord").val("Edit").button(
        "refresh");
}

//delete the given index and redisplay the table
function callDelete(index) {
    deleteRecord(index);
    listRecords();
}


function addRecord() {
    if (checkRecordForm()) {
        var record = {
            "Date": $('#datExamDate').val(),
            "Weight": $('#txtWeight').val(),
            "Height": $('#txtHeight').val(),
            "BMI": (($('#txtWeight').val() / (Math.pow($('#txtHeight').val(), 2))).toFixed(2))
        };

        try {
            var tbRecords = JSON.parse(localStorage.getItem(
                "tbRecords"));
            if (tbRecords == null) {
                tbRecords = [];
            }
            tbRecords.push(record);
            localStorage.setItem("tbRecords", JSON.stringify(
                tbRecords));
            alert("Saving Information");
            clearRecordForm();
            listRecords();
        } catch (e) {
            /* Google browsers use different error 
             * constant
             */
            if (window.navigator.vendor ===
                "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert(
                        "Error: Local Storage limit exceeds."
                    );
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to local storage.");
            }

            console.log(e);
        }
    } else {
        alert("Please complete the form properly.");
    }

    return true;
}

function deleteRecord(index) {
    try {
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

        tbRecords.splice(index, 1);

        if (tbRecords.length == 0) {
            //no items left in records, remove entire array from local storage
            localStorage.removeItem("tbRecords");
        } else {
            localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
        }
    } catch (e) {
        //google browsers use different error constant
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeds.");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("error: Saving to local storage.");
        }
        console.log(e);
    }

}

function editRecord(index) {
    if (checkRecordForm()) {
        
        try {
            var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
            tbRecords[index] = {
                "Date": $('#datExamDate').val(),
                "Weight": $('#txtWeight').val(),
                "Height": $('#txtHeight').val(),
                "BMI": (($('#txtWeight').val() / (Math.pow($('#txtHeight').val(), 2))).toFixed(2)) 

            }; //alter the selected items in the array
            localStorage.setItem("tbRecords", JSON.stringify(tbRecords)); //saving array to local storage
            alert("Saving Information");
            clearRecordForm();
            listRecords();
        } catch (e) {
            //google browsers use different error constant
            if (window.navigator.vendor === "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Storage limit exceeds.");
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
                alert("error: Saving to local storage.");
            }
            console.log(e);
        }
    } else {
        alert("Please complete the form properly.");
    }
}
