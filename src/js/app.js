"use strict";
// Import of SCSS here is required to mark it as a dependency
// and to enable extraction as CSS and injection of style into index.html
import "../assets/scss/app.scss";
import numeral from "numeral";
import { greeting } from "./moduleExample";

const courseValue = numeral(1000).format("$0,0.00");
console.log(`I would like to pay ${courseValue} for this course`); // eslint-disable-line no-console
console.log(`Greeting = ${greeting()}`); // eslint-disable-line no-console
