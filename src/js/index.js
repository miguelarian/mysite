/* global $ */
'use strict'

var $ = require("jquery");

$(document).ready(function ()
{
    loadUI()
    console.log('page loaded')
});

function loadUI () {
  loadFooter ()
}

function loadFooter () {
  // Display current year
  $('.current-year').html((new Date()).getFullYear())
}
