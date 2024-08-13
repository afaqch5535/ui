
 base_URL= "http://20.254.48.138:8080/";

$( document ).ready(function() {
   
    
    $("body").on("click","#login-button",function(){
        login();
    });

    $("body").on("click","#register-button",function(){
        register();
    });

    $("body").on("change","#location",function()
    {
        var location = $(this).val();
        loadWeather(location);
    });

    $("body").on("click","#save-trip-button",function()
    {
        saveTrip();
    });
  

    
});

function convertFormToJSON(form) {
    const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
    const json = {};
    $.each(array, function () {
      json[this.name] = this.value || "";
    });
    return json;
  }

function login() {
    var form = $('#login-form');
    var json = convertFormToJSON(form);

    var path = base_URL + "users/login";

    $.ajax({
        type: 'post',
        url: path,
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            // localStorage.setItem("userId", data.userId);
            localStorageSetItem('userId', data.userId);
            location.href = 'home.html';
        },
        error: function (data) {
            alert("Invalid username & password")
        }
    });
}

function localStorageSetItem(key, item) {
    localStorage.length;
    window.localStorage.setItem(key, item);
    localStorage.length;
}

function localStorageGetItem(key) {
    localStorage.length;
    const item = window.localStorage.getItem(key);
    localStorage.length;
    return item;
}

function register() {
    var form = $('#registration-form');
    var json = convertFormToJSON(form);

    var path = base_URL + "users/register";

    $.ajax({
        type: 'post',
        url: path,
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            alert("User created successfully");
            location.href = 'index.html';
        },
        error: function (data) {
            alert("user not created please contact support team")
        }
    });
}

function loadMyTrips(){
    
    // var userId = localStorage.getItem("userId");
    var userId = localStorageGetItem("userId");
    var path = base_URL + "trips/"+userId;


    $.ajax({
        type: 'get',
        url: path,        
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {

            data = JSON.stringify(data);
            data = $.parseJSON(data); 
            console.log(data);

            $.each(data, function(index,jo){
                var tr="<tr>";
                tr += "<td>"+ jo.location+ "</td>";
                tr += "<td>"+ jo.countryCurrentTime+ "</td>";
                tr += "<td>"+ jo.createdAt+ "</td>";
                tr += "<td>"+ jo.weather+ "</td>";
                tr += "<td>"+ jo.reasonToVisit+ "</td>";
                tr += "</tr>";

                $('#table-trips').append(tr);
            });


           
        },
        error: function (data) {
            console.log(data);
            alert("unable to load trips")
        }
    });

}


function saveTrip() {
    var form = $('#new-trip-form');
    var json = convertFormToJSON(form);

    var prposed= $("#proposedTrip").val();
    var path = base_URL + (prposed ==1?"tripsp":"trips") + "/create";
    console.log(path);

    $.ajax({
        type: 'post',
        url: path,
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            alert("trip created successfully");
        },
        error: function (data) {
            alert("user not created please contact support team")
        }
    });
}

function loadWeather(location){
    
    var path = base_URL + "weather/"+ location

    var userId = localStorage.getItem("userId");
    $("#userId").val(userId);


    $.ajax({
        type: 'get',
        url: path,        
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            $("#weather").val(data);           
        },
        error: function (data) {
            alert("unable to load weather")
        }
    });

}


function loadPrposedTrips(){
    
    var path = base_URL + "tripsp/proposed"


    $.ajax({
        type: 'get',
        url: path,        
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {

            data = JSON.stringify(data);
            data = $.parseJSON(data); 
            console.log(data);

            $.each(data, function(index,jo){
                var tr="<tr>";
                tr += "<td>"+ jo.location+ "</td>";
                tr += "<td>"+ jo.countryCurrentTime+ "</td>";
                tr += "<td>"+ jo.createdAt+ "</td>";
                tr += "<td>"+ jo.weather+ "</td>";
                tr += "<td>"+ jo.reasonToVisit+ "</td>";
                tr += "</tr>";

                $('#table-trips').append(tr);
            });


           
        },
        error: function (data) {
            alert("user not created please contact support team")
        }
    });

}