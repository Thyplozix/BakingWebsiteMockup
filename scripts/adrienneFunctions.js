/********************************************
 * Made By: Adrienne Bienapfl 2017          *
 * ALL RIGHTS RESERVED                      *
 * Purpose: Scripting For Baking Site       *
 * Name:    adrienneFunctions.js            *
 * Created: August 23rd, 2017               *
 *  Last Edited: 9/20/17                    *
 ********************************************/
var $ = function(id) {
    return document.getElementById(id);
}

//Gets the current date to post to the footer
function GetDate() {
    var date = new Date(); //initialize new date object
    var footerDate = document.getElementById('footerDate');
    footerDate.innerHTML = ("Current Date: " + (date.getMonth()+ 1) + "/" + date.getDate() + "/" + date.getFullYear()); //output date to footer within HTML on all pages
}

//Calculates from Fahrenheit to Celsius --takes one argument from the labeled Fahrenheit field
function TempConversion(valNum) {
    if (valNum !== null && valNum !== "")  { //Fix for the NaN showing upon backspacing a value.
        valNum = parseInt(valNum);
        //valNum is the number being entered in the Fahrenheit field by the user
        //A good baseline to check this is to enter 32, as 32 degrees converts to a perfect 0 Celsius.

		document.getElementById("outputCelsius").innerHTML = parseInt((valNum - 32) / 1.8); //formula for temperature conversion, rounded to nearest whole integer
	}
	else {
        document.getElementById("outputCelsius").innerHTML = "";
    }
}

//JS for FAQ accordion functionality
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"; //Code for clean look of FAQ
        }
    }
}

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        // Toggle between adding and removing the active class,
       // to highlight the button that controls the panel
        this.classList.toggle("active");

        // Toggle between hiding and showing the active panel
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

//Contact Form scripting for validation -- gives an alert if any field is not filled out.
// Checks to see that string field contains a valid value
// Valid value is not null or empty string and is letters only
function ValidateAlphaString(str) {
    return /[a-z ]+/i.test(str);
}
//Checks to see anything has been entered in the question field
function ValidateNotEmpty(str) {
    return !(str === null || str === "");
}
//Checks email, allows for several email formats, such as more periods than usual (e.g. adrienne.bienapfl@web.co.uk)
function ValidateEmail(email) {
    return /[a-z\d.]+@[a-z\d.]+\.[a-z\d]+/i.test(email); //Regex test conditions
}
//Checks phone, allows dashes, parentheses and the user to include a +1 on the usual ten digits we expect
function ValidatePhone(phone) {
    return /(\+?1[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(phone); //Regex test conditions
}
//Check whether or not the TOS is agreed to
function ValidateCheckboxes(agreed) {
    return agreed.checked;
}

//Main function for Contact Validations
function ValidateContactForm() {
    var phone = document.forms["myForm"]["phone"].value;
    var name = document.forms["myForm"]["name"].value;
    var question = document.forms["myForm"]["question"].value;
    var email = document.forms["myForm"]["email"].value;
    var checkbox = document.getElementById("agree");


    if (!ValidateAlphaString(name)) {
     
        document.getElementById("loginError").textContent="Please enter a valid name.";
        return false;
    }

    else {
        document.getElementById('loginError').textContent = " ";
    }

     if (!ValidateEmail(email)) {
        document.getElementById("loginError2").textContent="Please Enter a valid email address.";
        return false;
    }
     else {
         document.getElementById('loginError2').textContent = " ";
     }

     if (!ValidatePhone(phone)) {
        document.getElementById("loginError3").textContent="Please enter a valid phone number.";
        return false;
    }

     else {
         document.getElementById('loginError3').textContent = " ";
     }
     if (!ValidateNotEmpty(question)) {
        document.getElementById("loginError4").textContent="Please enter your question.";
        return false;
    }
     else {
         document.getElementById('loginError4').textContent = " ";
     }

    if (!ValidateCheckboxes(checkbox)) {
       // alert("Please agree to the terms of use.");
        document.getElementById("loginError5").textContent="Please agree to the terms of use.";
        return false;
    }

        document.getElementById("loginError").textContent = " ";
        document.getElementById("loginError2").textContent = " ";
        document.getElementById("loginError3").textContent = " ";
        document.getElementById("loginError4").textContent = " ";
        document.getElementById("loginError5").textContent = " ";
        sessionStorage.clear();
        window.location.replace("acknowledgement.html");
        sessionStorage.setItem("referrer", "contact");
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("question", question);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("agreed", true);
        return true;


}
//Writes out information in session storage to external page, will only do so if we are on the page in question.
function WriteAcknowledgement() {
    if (window.location.href.indexOf("acknowledgement.html") >= 0) {
        $("name").innerHTML = sessionStorage.getItem("name");
        $("email").innerHTML = sessionStorage.getItem("email");
        $("phone").innerHTML = sessionStorage.getItem("phone");
        $("question").innerHTML = sessionStorage.getItem("question");
        $("agreed").innerHTML = sessionStorage.getItem("agreed");
    }
}

//Main function for Newsletter Form Validations -- needs worked over
function ValidateNewsLetterForm() {
    var email = document.forms["myForm"]["email"].value;
    var checkbox = document.getElementById("agree");
    if (!ValidateEmail(email)) {
  
        document.getElementById("loginError2").textContent="Please enter a valid email address.";
        return false;
    }
    else if (!ValidateCheckboxes(checkbox)) {
      
        document.getElementById("loginError3").textContent="Please agree to the terms of use.";

        return false;
    }
    else {
        sessionStorage.clear(); //Clearing storage consistently to not save old values
        window.location.replace("acknowledgement.php");
        sessionStorage.setItem("referrer", "contact");
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("agreed", true);
        return true;
    }

}

window.onload = function() {
    WriteAcknowledgement();
    GetDate();
};
