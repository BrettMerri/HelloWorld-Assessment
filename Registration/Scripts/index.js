﻿$(document).ready(function() {
    $('#register-form').submit(function (e) {
        
        clearValidationText(); //Clears all the validation text before revalidating fields

        var validationErrors = 0;

        //Regular expressions
        var numeric = new RegExp(/^\d+$/); //This expression matches only numbers
        var alphanumeric = new RegExp(/^[\w .-]*$/i); //This expression matches alphnumeric characters, space, dash, and period

        //Get form values
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var address1 = $('#address1').val();
        var address2 = $('#address2').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var zipcode = $('#zipcode').val();
        var country = $('input[name=country]:checked').val(); //value will be "yes" if United States

        //First name
        if (firstName.length === 0) {
            $("#firstNameSpan").text("First name is required");
            validationErrors++;
        }
        else if (!alphanumeric.test(firstName))
        {
            $("#firstNameSpan").text("Alphanumeric characters, dashes, periods, or spaces only");
            validationErrors++;
        }
        else if (firstName.length > 50) {
            $("#firstNameSpan").text("First name must be less than 50 characters");
            validationErrors++;
        }

        //Last name
        if (lastName.length === 0) {
            $("#lastNameSpan").text("Last name is required");
            validationErrors++;
        }
        else if (!alphanumeric.test(lastName)) {
            $("#lastNameSpan").text("Alphanumeric characters, dashes, periods, or spaces only");
            validationErrors++;
        }
        else if (lastName.length > 50) {
            $("#lastNameSpan").text("Last name must be less than 50 characters");
            validationErrors++;
        }

        //Address 1
        if (address1.length === 0) {
            $("#address1Span").text("Address is required");
            validationErrors++;
        }
        else if (!alphanumeric.test(address1)) {
            $("#address1Span").text("Alphanumeric characters, dashes, periods, or spaces only");
            validationErrors++;
        }
        else if (address1.length > 100) {
            $("#address1Span").text("Address must be less than 100 characters");
            validationErrors++;
        }

        //Address 2
        if (!alphanumeric.test(address2)) {
            $("#address2Span").text("Alphanumeric characters, dashes, periods, or spaces only");
            validationErrors++;
        }
        else if (address2.length > 100) {
            $("#address2Span").text("Address must be less than 100 characters");
            validationErrors++;
        }

        //City
        if (city.length === 0) {
            $("#citySpan").text("City is required");
            validationErrors++;
        }
        else if (!alphanumeric.test(city)) {
            $("#citySpan").text("Alphanumeric characters, dashes, periods, or spaces only");
            validationErrors++;
        }
        else if (city.length > 50) {
            $("#citySpan").text("City must be less than 50 characters");
            validationErrors++;
        }

        //State
        if (state.length === 0) {
            $("#stateSpan").text("State is required");
            validationErrors++;
        }

        //Zipcode
        if (zipcode.length === 0) {
            $("#zipcodeSpan").text("Zipcode is required");
            validationErrors++;
        }
        else if (!numeric.test(zipcode)) {
            $("#zipcodeSpan").text("Zipcode must be only digits");
            validationErrors++;
        }
        else if (zipcode.length !== 5) {
            $("#zipcodeSpan").text("Zipcode must be 5 digits long");
            validationErrors++;
        }

        //Country
        if (country !== "yes") {
            $("#countrySpan").text("You must live in the US to register");
            validationErrors++;
        }

        if (validationErrors > 0)
            return false; //If there are errors, prevent form submission

        return true; //If there are no validation errors, submit form
    });

    function clearValidationText()
    {
        $("#firstNameSpan").text("");
        $("#lastNameSpan").text("");
        $("#address1Span").text("");
        $("#address2Span").text("");
        $("#citySpan").text("");
        $("#stateSpan").text("");
        $("#zipcodeSpan").text("");
        $("#countrySpan").text("");
    }
});