// Adds given text value to the password field
function addValueToPassword(button) {
    var currVal = $("#passcode").val();
    if (button == "bksp") {
        $("#passcode").val(currVal.substring(0,
            currVal.length - 1));
    } else {
        $("#passcode").val(currVal.concat(button));
    }
}

//get password from field and returns default if doesnt exist
function getPassword() {
    if (typeof (Storage) == "undefined") {
        alert(
            "Your browser does not support HTML5 localStorage. Try upgrading."
        );
    } else if (localStorage.getItem("user") !=
        null) {
        return JSON.parse(localStorage.getItem(
            "user")).NewPassword;
    } else {
        /*Default password*/
        return "2345";
    }
}

/* On the main page, after password entry, directs
 * user to main page, legal disclaimer if they
 * have not yet agreed to it, or user entry page
 * if they have not yet completed their user info.
 */
$("#btnEnter").on("click",function () {
    var password = getPassword();

    if (document.getElementById("passcode").value ==
        password) {
        if (localStorage.getItem("agreedToLegal") ==
            null) {
            $("#btnEnter").attr("href",
                "#legalNotice").button();
        } else if (localStorage.getItem(
                "agreedToLegal") == "true") {
            if (localStorage.getItem("user") ==
                null) {
                /* User has not been created, direct user 
                 * to User Creation page
                 */
                $("#btnEnter").attr("href",
                    "#pageUserInfo").button();
            } else {
                $("#btnEnter").attr("href",
                    "#pageMenu").button();
            }
        }
    } else {
        alert(
            "Incorrect password, please try again."
        );
    }
});

/* Records that the user has agreed to the legal
 * disclaimer on this device/browser
 */
$("#noticeYes").on("click",function () {
    localStorage.setItem("agreedToLegal",
        "true");
});