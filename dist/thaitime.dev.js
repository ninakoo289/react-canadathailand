"use strict";

function calTime(city, offset) {
  d = new Date();
  utc = d.getTime() + d.getTimezoneOffset() * 60000;
  nd = new Date(utc + 3600000 * offset);
  document.getElementById("showDateThailand").innerHTML = "The local time in " + city + " is " + nd.toLocaleString();
}