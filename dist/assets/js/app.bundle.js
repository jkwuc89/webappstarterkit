/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _numeral = __webpack_require__(2);

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import of SCSS here is required to mark it as a dependency
// and to enable extraction as CSS and injection of style into index.html
var courseValue = (0, _numeral2.default)(1000).format("$0,0.00");
console.log("I would like to pay " + courseValue + " for this course");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.numeral = factory();
    }
}(this, function () {
    /************************************
        Variables
    ************************************/

    var numeral,
        _,
        VERSION = '2.0.6',
        formats = {},
        locales = {},
        defaults = {
            currentLocale: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0',
            scalePercentBy100: true
        },
        options = {
            currentLocale: defaults.currentLocale,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat,
            scalePercentBy100: defaults.scalePercentBy100
        };


    /************************************
        Constructors
    ************************************/

    // Numeral prototype object
    function Numeral(input, number) {
        this._input = input;

        this._value = number;
    }

    numeral = function(input) {
        var value,
            kind,
            unformatFunction,
            regexp;

        if (numeral.isNumeral(input)) {
            value = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            value = 0;
        } else if (input === null || _.isNaN(input)) {
            value = null;
        } else if (typeof input === 'string') {
            if (options.zeroFormat && input === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                for (kind in formats) {
                    regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

                    if (regexp && input.match(regexp)) {
                        unformatFunction = formats[kind].unformat;

                        break;
                    }
                }

                unformatFunction = unformatFunction || numeral._.stringToNumber;

                value = unformatFunction(input);
            }
        } else {
            value = Number(input)|| null;
        }

        return new Numeral(input, value);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };

    // helper functions
    numeral._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(value, format, roundingFunction) {
            var locale = locales[numeral.options.currentLocale],
                negP = false,
                optDec = false,
                leadingCount = 0,
                abbr = '',
                trillion = 1000000000000,
                billion = 1000000000,
                million = 1000000,
                thousand = 1000,
                decimal = '',
                neg = false,
                abbrForce, // force abbreviation
                abs,
                min,
                max,
                power,
                int,
                precision,
                signed,
                thousands,
                output;

            // make sure we never format a null value
            value = value || 0;

            abs = Math.abs(value);

            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (numeral._.includes(format, '(')) {
                negP = true;
                format = format.replace(/[\(|\)]/g, '');
            } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
                format = format.replace(/[\+|\-]/g, '');
            }

            // see if abbreviation is wanted
            if (numeral._.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);

                abbrForce = abbrForce ? abbrForce[1] : false;

                // check for space before abbreviation
                if (numeral._.includes(format, ' a')) {
                    abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion
                    abbr += locale.abbreviations.trillion;
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion
                    abbr += locale.abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million
                    abbr += locale.abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand
                    abbr += locale.abbreviations.thousand;
                    value = value / thousand;
                }
            }

            // check for optional decimals
            if (numeral._.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            // break number and format
            int = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');
            leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

            if (precision) {
                if (numeral._.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = numeral._.toFixed(value, 0, roundingFunction);
            }

            // check abbreviation again after rounding
            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
                int = String(Number(int) / 1000);

                switch (abbr) {
                    case locale.abbreviations.thousand:
                        abbr = locale.abbreviations.million;
                        break;
                    case locale.abbreviations.million:
                        abbr = locale.abbreviations.billion;
                        break;
                    case locale.abbreviations.billion:
                        abbr = locale.abbreviations.trillion;
                        break;
                }
            }


            // format number
            if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
            }

            if (int.length < leadingCount) {
                for (var i = leadingCount - int.length; i > 0; i--) {
                    int = '0' + int;
                }
            }

            if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                int = '';
            }

            output = int + decimal + (abbr ? abbr : '');

            if (negP) {
                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
            } else {
                if (signed >= 0) {
                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
                } else if (neg) {
                    output = '-' + output;
                }
            }

            return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(string) {
            var locale = locales[options.currentLocale],
                stringOriginal = string,
                abbreviations = {
                    thousand: 3,
                    million: 6,
                    billion: 9,
                    trillion: 12
                },
                abbreviation,
                value,
                i,
                regexp;

            if (options.zeroFormat && string === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                value = 1;

                if (locale.delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
                }

                for (abbreviation in abbreviations) {
                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

                    if (stringOriginal.match(regexp)) {
                        value *= Math.pow(10, abbreviations[abbreviation]);
                        break;
                    }
                }

                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

                // remove non numbers
                string = string.replace(/[^0-9\.]+/g, '');

                value *= Number(string);
            }

            return value;
        },
        isNaN: function(value) {
            return typeof value === 'number' && isNaN(value);
        },
        includes: function(string, search) {
            return string.indexOf(search) !== -1;
        },
        insert: function(string, subString, start) {
            return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function(array, callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(array),
                len = t.length >>> 0,
                k = 0,
                value;

            if (arguments.length === 3) {
                value = arguments[2];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function (x) {
            var parts = x.toString().split('.');

            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function () {
            var args = Array.prototype.slice.call(arguments);

            return args.reduce(function(accum, next) {
                var mn = _.multiplier(next);
                return accum > mn ? accum : mn;
            }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
            var splitValue = value.toString().split('.'),
                minDecimals = maxDecimals - (optionals || 0),
                boundedPrecision,
                optionalsRegExp,
                power,
                output;

            // Use the smallest precision value possible to avoid errors from floating point representation
            if (splitValue.length === 2) {
              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
            } else {
              boundedPrecision = minDecimals;
            }

            power = Math.pow(10, boundedPrecision);

            // Multiply up by precision, round accurately, then divide and use native toFixed():
            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

            if (optionals > maxDecimals - boundedPrecision) {
                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
                output = output.replace(optionalsRegExp, '');
            }

            return output;
        }
    };

    // avaliable options
    numeral.options = options;

    // avaliable formats
    numeral.formats = formats;

    // avaliable formats
    numeral.locales = locales;

    // This function sets the current locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    numeral.locale = function(key) {
        if (key) {
            options.currentLocale = key.toLowerCase();
        }

        return options.currentLocale;
    };

    // This function provides access to the loaded locale data.  If
    // no arguments are passed in, it will simply return the current
    // global locale object.
    numeral.localeData = function(key) {
        if (!key) {
            return locales[options.currentLocale];
        }

        key = key.toLowerCase();

        if (!locales[key]) {
            throw new Error('Unknown locale : ' + key);
        }

        return locales[key];
    };

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

    numeral.zeroFormat = function(format) {
        options.zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.nullFormat = function (format) {
        options.nullFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function(format) {
        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numeral.register = function(type, name, format) {
        name = name.toLowerCase();

        if (this[type + 's'][name]) {
            throw new TypeError(name + ' ' + type + ' already registered.');
        }

        this[type + 's'][name] = format;

        return format;
    };


    numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            localeData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';

            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if (!!val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.localeData
        try {
            //check if the culture is understood by numeral. if not, default it to current locale
            localeData = numeral.localeData(culture);
        } catch (e) {
            localeData = numeral.localeData(numeral.locale());
        }

        //setup the delimiters and currency symbol based on culture/locale
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = localeData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };


    /************************************
        Numeral Prototype
    ************************************/

    numeral.fn = Numeral.prototype = {
        clone: function() {
            return numeral(this);
        },
        format: function(inputString, roundingFunction) {
            var value = this._value,
                format = inputString || options.defaultFormat,
                kind,
                output,
                formatFunction;

            // make sure we have a roundingFunction
            roundingFunction = roundingFunction || Math.round;

            // format based on value
            if (value === 0 && options.zeroFormat !== null) {
                output = options.zeroFormat;
            } else if (value === null && options.nullFormat !== null) {
                output = options.nullFormat;
            } else {
                for (kind in formats) {
                    if (format.match(formats[kind].regexps.format)) {
                        formatFunction = formats[kind].format;

                        break;
                    }
                }

                formatFunction = formatFunction || numeral._.numberToFormat;

                output = formatFunction(value, format, roundingFunction);
            }

            return output;
        },
        value: function() {
            return this._value;
        },
        input: function() {
            return this._input;
        },
        set: function(value) {
            this._value = Number(value);

            return this;
        },
        add: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
            }

            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

            return this;
        },
        subtract: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
            }

            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

            return this;
        },
        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback, 1);

            return this;
        },
        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback);

            return this;
        },
        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }
    };

    /************************************
        Default Locale && Format
    ************************************/

    numeral.register('locale', 'en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    

(function() {
        numeral.register('format', 'bps', {
            regexps: {
                format: /(BPS)/,
                unformat: /(BPS)/
            },
            format: function(value, format, roundingFunction) {
                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
                    output;

                value = value * 10000;

                // check for space before BPS
                format = format.replace(/\s?BPS/, '');

                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + 'BPS');

                    output = output.join('');
                } else {
                    output = output + space + 'BPS';
                }

                return output;
            },
            unformat: function(string) {
                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
            }
        });
})();


(function() {
        var decimal = {
            base: 1000,
            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        },
        binary = {
            base: 1024,
            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        };

    var allSuffixes =  decimal.suffixes.concat(binary.suffixes.filter(function (item) {
            return decimal.suffixes.indexOf(item) < 0;
        }));
        var unformatRegex = allSuffixes.join('|');
        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

    numeral.register('format', 'bytes', {
        regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex)
        },
        format: function(value, format, roundingFunction) {
            var output,
                bytes = numeral._.includes(format, 'ib') ? binary : decimal,
                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
                power,
                min,
                max;

            // check for space before
            format = format.replace(/\s?i?b/, '');

            for (power = 0; power <= bytes.suffixes.length; power++) {
                min = Math.pow(bytes.base, power);
                max = Math.pow(bytes.base, power + 1);

                if (value === null || value === 0 || value >= min && value < max) {
                    suffix += bytes.suffixes[power];

                    if (min > 0) {
                        value = value / min;
                    }

                    break;
                }
            }

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + suffix;
        },
        unformat: function(string) {
            var value = numeral._.stringToNumber(string),
                power,
                bytesMultiplier;

            if (value) {
                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                    if (numeral._.includes(string, decimal.suffixes[power])) {
                        bytesMultiplier = Math.pow(decimal.base, power);

                        break;
                    }

                    if (numeral._.includes(string, binary.suffixes[power])) {
                        bytesMultiplier = Math.pow(binary.base, power);

                        break;
                    }
                }

                value *= (bytesMultiplier || 1);
            }

            return value;
        }
    });
})();


(function() {
        numeral.register('format', 'currency', {
        regexps: {
            format: /(\$)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                symbols = {
                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                },
                output,
                symbol,
                i;

            // strip format of spaces and $
            format = format.replace(/\s?\$\s?/, '');

            // format the number
            output = numeral._.numberToFormat(value, format, roundingFunction);

            // update the before and after based on value
            if (value >= 0) {
                symbols.before = symbols.before.replace(/[\-\(]/, '');
                symbols.after = symbols.after.replace(/[\-\)]/, '');
            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
                symbols.before = '-' + symbols.before;
            }

            // loop through each before symbol
            for (i = 0; i < symbols.before.length; i++) {
                symbol = symbols.before[i];

                switch (symbol) {
                    case '$':
                        output = numeral._.insert(output, locale.currency.symbol, i);
                        break;
                    case ' ':
                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                        break;
                }
            }

            // loop through each after symbol
            for (i = symbols.after.length - 1; i >= 0; i--) {
                symbol = symbols.after[i];

                switch (symbol) {
                    case '$':
                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                        break;
                    case ' ':
                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                        break;
                }
            }


            return output;
        }
    });
})();


(function() {
        numeral.register('format', 'exponential', {
        regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
        },
        format: function(value, format, roundingFunction) {
            var output,
                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
                parts = exponential.split('e');

            format = format.replace(/e[\+|\-]{1}0/, '');

            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

            return output + 'e' + parts[1];
        },
        unformat: function(string) {
            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
                value = Number(parts[0]),
                power = Number(parts[1]);

            power = numeral._.includes(string, 'e-') ? power *= -1 : power;

            function cback(accum, curr, currI, O) {
                var corrFactor = numeral._.correctionFactor(accum, curr),
                    num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
                return num;
            }

            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
        }
    });
})();


(function() {
        numeral.register('format', 'ordinal', {
        regexps: {
            format: /(o)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                output,
                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

            // check for space before
            format = format.replace(/\s?o/, '');

            ordinal += locale.ordinal(value);

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + ordinal;
        }
    });
})();


(function() {
        numeral.register('format', 'percentage', {
        regexps: {
            format: /(%)/,
            unformat: /(%)/
        },
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            if (numeral.options.scalePercentBy100) {
                value = value * 100;
            }

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.numberToFormat(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        },
        unformat: function(string) {
            var number = numeral._.stringToNumber(string);
            if (numeral.options.scalePercentBy100) {
                return number * 0.01;
            }
            return number;
        }
    });
})();


(function() {
        numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        },
        unformat: function(string) {
            var timeArray = string.split(':'),
                seconds = 0;

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
        }
    });
})();

return numeral;
}));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGU4NmRkOWI2OTUwNmI1YTUzMDMiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbnVtZXJhbC9udW1lcmFsLmpzIl0sIm5hbWVzIjpbImNvdXJzZVZhbHVlIiwiZm9ybWF0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDM0RBOztBQUNBOzs7Ozs7QUFIQTtBQUNBO0FBSUEsSUFBTUEsY0FBYyx1QkFBUSxJQUFSLEVBQWNDLE1BQWQsQ0FBcUIsU0FBckIsQ0FBcEI7QUFDQUMsUUFBUUMsR0FBUiwwQkFBbUNILFdBQW5DLHVCOzs7Ozs7QUNOQSx5Qzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQsRUFBRTtBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELHlEQUF5RDtBQUM3RztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFEQUFxRCxFQUFFOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCLGdDQUFnQztBQUMzRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RCxZQUFZO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QyxFQUFFOztBQUVoRDs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQSxDQUFDIiwiZmlsZSI6Ii4vYXNzZXRzL2pzL2FwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZTg2ZGQ5YjY5NTA2YjVhNTMwMyIsIi8vIEltcG9ydCBvZiBTQ1NTIGhlcmUgaXMgcmVxdWlyZWQgdG8gbWFyayBpdCBhcyBhIGRlcGVuZGVuY3lcbi8vIGFuZCB0byBlbmFibGUgZXh0cmFjdGlvbiBhcyBDU1MgYW5kIGluamVjdGlvbiBvZiBzdHlsZSBpbnRvIGluZGV4Lmh0bWxcbmltcG9ydCAnLi9hc3NldHMvc2Nzcy9hcHAuc2Nzcyc7XG5pbXBvcnQgbnVtZXJhbCBmcm9tIFwibnVtZXJhbFwiO1xuXG5jb25zdCBjb3Vyc2VWYWx1ZSA9IG51bWVyYWwoMTAwMCkuZm9ybWF0KFwiJDAsMC4wMFwiKTtcbmNvbnNvbGUubG9nKGBJIHdvdWxkIGxpa2UgdG8gcGF5ICR7Y291cnNlVmFsdWV9IGZvciB0aGlzIGNvdXJzZWApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISBAcHJlc2VydmVcbiAqIG51bWVyYWwuanNcbiAqIHZlcnNpb24gOiAyLjAuNlxuICogYXV0aG9yIDogQWRhbSBEcmFwZXJcbiAqIGxpY2Vuc2UgOiBNSVRcbiAqIGh0dHA6Ly9hZGFtd2RyYXBlci5naXRodWIuY29tL051bWVyYWwtanMvXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbC5udW1lcmFsID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgVmFyaWFibGVzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdmFyIG51bWVyYWwsXG4gICAgICAgIF8sXG4gICAgICAgIFZFUlNJT04gPSAnMi4wLjYnLFxuICAgICAgICBmb3JtYXRzID0ge30sXG4gICAgICAgIGxvY2FsZXMgPSB7fSxcbiAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjdXJyZW50TG9jYWxlOiAnZW4nLFxuICAgICAgICAgICAgemVyb0Zvcm1hdDogbnVsbCxcbiAgICAgICAgICAgIG51bGxGb3JtYXQ6IG51bGwsXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybWF0OiAnMCwwJyxcbiAgICAgICAgICAgIHNjYWxlUGVyY2VudEJ5MTAwOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjdXJyZW50TG9jYWxlOiBkZWZhdWx0cy5jdXJyZW50TG9jYWxlLFxuICAgICAgICAgICAgemVyb0Zvcm1hdDogZGVmYXVsdHMuemVyb0Zvcm1hdCxcbiAgICAgICAgICAgIG51bGxGb3JtYXQ6IGRlZmF1bHRzLm51bGxGb3JtYXQsXG4gICAgICAgICAgICBkZWZhdWx0Rm9ybWF0OiBkZWZhdWx0cy5kZWZhdWx0Rm9ybWF0LFxuICAgICAgICAgICAgc2NhbGVQZXJjZW50QnkxMDA6IGRlZmF1bHRzLnNjYWxlUGVyY2VudEJ5MTAwXG4gICAgICAgIH07XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgQ29uc3RydWN0b3JzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLy8gTnVtZXJhbCBwcm90b3R5cGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gTnVtZXJhbChpbnB1dCwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBudW1iZXI7XG4gICAgfVxuXG4gICAgbnVtZXJhbCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciB2YWx1ZSxcbiAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICB1bmZvcm1hdEZ1bmN0aW9uLFxuICAgICAgICAgICAgcmVnZXhwO1xuXG4gICAgICAgIGlmIChudW1lcmFsLmlzTnVtZXJhbChpbnB1dCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gaW5wdXQudmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dCA9PT0gMCB8fCB0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT09IG51bGwgfHwgXy5pc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy56ZXJvRm9ybWF0ICYmIGlucHV0ID09PSBvcHRpb25zLnplcm9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubnVsbEZvcm1hdCAmJiBpbnB1dCA9PT0gb3B0aW9ucy5udWxsRm9ybWF0IHx8ICFpbnB1dC5yZXBsYWNlKC9bXjAtOV0rL2csICcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoa2luZCBpbiBmb3JtYXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4cCA9IHR5cGVvZiBmb3JtYXRzW2tpbmRdLnJlZ2V4cHMudW5mb3JtYXQgPT09ICdmdW5jdGlvbicgPyBmb3JtYXRzW2tpbmRdLnJlZ2V4cHMudW5mb3JtYXQoKSA6IGZvcm1hdHNba2luZF0ucmVnZXhwcy51bmZvcm1hdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVnZXhwICYmIGlucHV0Lm1hdGNoKHJlZ2V4cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRzW2tpbmRdLnVuZm9ybWF0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHVuZm9ybWF0RnVuY3Rpb24gPSB1bmZvcm1hdEZ1bmN0aW9uIHx8IG51bWVyYWwuXy5zdHJpbmdUb051bWJlcjtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdW5mb3JtYXRGdW5jdGlvbihpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcihpbnB1dCl8fCBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBOdW1lcmFsKGlucHV0LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8vIHZlcnNpb24gbnVtYmVyXG4gICAgbnVtZXJhbC52ZXJzaW9uID0gVkVSU0lPTjtcblxuICAgIC8vIGNvbXBhcmUgbnVtZXJhbCBvYmplY3RcbiAgICBudW1lcmFsLmlzTnVtZXJhbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTnVtZXJhbDtcbiAgICB9O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uc1xuICAgIG51bWVyYWwuXyA9IF8gPSB7XG4gICAgICAgIC8vIGZvcm1hdHMgbnVtYmVycyBzZXBhcmF0b3JzLCBkZWNpbWFscyBwbGFjZXMsIHNpZ25zLCBhYmJyZXZpYXRpb25zXG4gICAgICAgIG51bWJlclRvRm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlID0gbG9jYWxlc1tudW1lcmFsLm9wdGlvbnMuY3VycmVudExvY2FsZV0sXG4gICAgICAgICAgICAgICAgbmVnUCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9wdERlYyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxlYWRpbmdDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgYWJiciA9ICcnLFxuICAgICAgICAgICAgICAgIHRyaWxsaW9uID0gMTAwMDAwMDAwMDAwMCxcbiAgICAgICAgICAgICAgICBiaWxsaW9uID0gMTAwMDAwMDAwMCxcbiAgICAgICAgICAgICAgICBtaWxsaW9uID0gMTAwMDAwMCxcbiAgICAgICAgICAgICAgICB0aG91c2FuZCA9IDEwMDAsXG4gICAgICAgICAgICAgICAgZGVjaW1hbCA9ICcnLFxuICAgICAgICAgICAgICAgIG5lZyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFiYnJGb3JjZSwgLy8gZm9yY2UgYWJicmV2aWF0aW9uXG4gICAgICAgICAgICAgICAgYWJzLFxuICAgICAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICAgICAgcG93ZXIsXG4gICAgICAgICAgICAgICAgaW50LFxuICAgICAgICAgICAgICAgIHByZWNpc2lvbixcbiAgICAgICAgICAgICAgICBzaWduZWQsXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRzLFxuICAgICAgICAgICAgICAgIG91dHB1dDtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIG5ldmVyIGZvcm1hdCBhIG51bGwgdmFsdWVcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgfHwgMDtcblxuICAgICAgICAgICAgYWJzID0gTWF0aC5hYnModmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBzZWUgaWYgd2Ugc2hvdWxkIHVzZSBwYXJlbnRoZXNlcyBmb3IgbmVnYXRpdmUgbnVtYmVyIG9yIGlmIHdlIHNob3VsZCBwcmVmaXggd2l0aCBhIHNpZ25cbiAgICAgICAgICAgIC8vIGlmIGJvdGggYXJlIHByZXNlbnQgd2UgZGVmYXVsdCB0byBwYXJlbnRoZXNlc1xuICAgICAgICAgICAgaWYgKG51bWVyYWwuXy5pbmNsdWRlcyhmb3JtYXQsICcoJykpIHtcbiAgICAgICAgICAgICAgICBuZWdQID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvW1xcKHxcXCldL2csICcnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJysnKSB8fCBudW1lcmFsLl8uaW5jbHVkZXMoZm9ybWF0LCAnLScpKSB7XG4gICAgICAgICAgICAgICAgc2lnbmVkID0gbnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJysnKSA/IGZvcm1hdC5pbmRleE9mKCcrJykgOiB2YWx1ZSA8IDAgPyBmb3JtYXQuaW5kZXhPZignLScpIDogLTE7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL1tcXCt8XFwtXS9nLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlZSBpZiBhYmJyZXZpYXRpb24gaXMgd2FudGVkXG4gICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJ2EnKSkge1xuICAgICAgICAgICAgICAgIGFiYnJGb3JjZSA9IGZvcm1hdC5tYXRjaCgvYShrfG18Ynx0KT8vKTtcblxuICAgICAgICAgICAgICAgIGFiYnJGb3JjZSA9IGFiYnJGb3JjZSA/IGFiYnJGb3JjZVsxXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHNwYWNlIGJlZm9yZSBhYmJyZXZpYXRpb25cbiAgICAgICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJyBhJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYWJiciA9ICcgJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShuZXcgUmVnRXhwKGFiYnIgKyAnYVtrbWJ0XT8nKSwgJycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFicyA+PSB0cmlsbGlvbiAmJiAhYWJickZvcmNlIHx8IGFiYnJGb3JjZSA9PT0gJ3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyaWxsaW9uXG4gICAgICAgICAgICAgICAgICAgIGFiYnIgKz0gbG9jYWxlLmFiYnJldmlhdGlvbnMudHJpbGxpb247XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyB0cmlsbGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFicyA8IHRyaWxsaW9uICYmIGFicyA+PSBiaWxsaW9uICYmICFhYmJyRm9yY2UgfHwgYWJickZvcmNlID09PSAnYicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmlsbGlvblxuICAgICAgICAgICAgICAgICAgICBhYmJyICs9IGxvY2FsZS5hYmJyZXZpYXRpb25zLmJpbGxpb247XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyBiaWxsaW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWJzIDwgYmlsbGlvbiAmJiBhYnMgPj0gbWlsbGlvbiAmJiAhYWJickZvcmNlIHx8IGFiYnJGb3JjZSA9PT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1pbGxpb25cbiAgICAgICAgICAgICAgICAgICAgYWJiciArPSBsb2NhbGUuYWJicmV2aWF0aW9ucy5taWxsaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC8gbWlsbGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFicyA8IG1pbGxpb24gJiYgYWJzID49IHRob3VzYW5kICYmICFhYmJyRm9yY2UgfHwgYWJickZvcmNlID09PSAnaycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhvdXNhbmRcbiAgICAgICAgICAgICAgICAgICAgYWJiciArPSBsb2NhbGUuYWJicmV2aWF0aW9ucy50aG91c2FuZDtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAvIHRob3VzYW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG9wdGlvbmFsIGRlY2ltYWxzXG4gICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJ1suXScpKSB7XG4gICAgICAgICAgICAgICAgb3B0RGVjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnWy5dJywgJy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYnJlYWsgbnVtYmVyIGFuZCBmb3JtYXRcbiAgICAgICAgICAgIGludCA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IGZvcm1hdC5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgdGhvdXNhbmRzID0gZm9ybWF0LmluZGV4T2YoJywnKTtcbiAgICAgICAgICAgIGxlYWRpbmdDb3VudCA9IChmb3JtYXQuc3BsaXQoJy4nKVswXS5zcGxpdCgnLCcpWzBdLm1hdGNoKC8wL2cpIHx8IFtdKS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChwcmVjaXNpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKHByZWNpc2lvbiwgJ1snKSkge1xuICAgICAgICAgICAgICAgICAgICBwcmVjaXNpb24gPSBwcmVjaXNpb24ucmVwbGFjZSgnXScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uLnNwbGl0KCdbJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWwgPSBudW1lcmFsLl8udG9GaXhlZCh2YWx1ZSwgKHByZWNpc2lvblswXS5sZW5ndGggKyBwcmVjaXNpb25bMV0ubGVuZ3RoKSwgcm91bmRpbmdGdW5jdGlvbiwgcHJlY2lzaW9uWzFdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbCA9IG51bWVyYWwuXy50b0ZpeGVkKHZhbHVlLCBwcmVjaXNpb24ubGVuZ3RoLCByb3VuZGluZ0Z1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnQgPSBkZWNpbWFsLnNwbGl0KCcuJylbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKGRlY2ltYWwsICcuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbCA9IGxvY2FsZS5kZWxpbWl0ZXJzLmRlY2ltYWwgKyBkZWNpbWFsLnNwbGl0KCcuJylbMV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHREZWMgJiYgTnVtYmVyKGRlY2ltYWwuc2xpY2UoMSkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWwgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGludCA9IG51bWVyYWwuXy50b0ZpeGVkKHZhbHVlLCAwLCByb3VuZGluZ0Z1bmN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgYWJicmV2aWF0aW9uIGFnYWluIGFmdGVyIHJvdW5kaW5nXG4gICAgICAgICAgICBpZiAoYWJiciAmJiAhYWJickZvcmNlICYmIE51bWJlcihpbnQpID49IDEwMDAgJiYgYWJiciAhPT0gbG9jYWxlLmFiYnJldmlhdGlvbnMudHJpbGxpb24pIHtcbiAgICAgICAgICAgICAgICBpbnQgPSBTdHJpbmcoTnVtYmVyKGludCkgLyAxMDAwKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWJicikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGxvY2FsZS5hYmJyZXZpYXRpb25zLnRob3VzYW5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJiciA9IGxvY2FsZS5hYmJyZXZpYXRpb25zLm1pbGxpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBsb2NhbGUuYWJicmV2aWF0aW9ucy5taWxsaW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJiciA9IGxvY2FsZS5hYmJyZXZpYXRpb25zLmJpbGxpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBsb2NhbGUuYWJicmV2aWF0aW9ucy5iaWxsaW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJiciA9IGxvY2FsZS5hYmJyZXZpYXRpb25zLnRyaWxsaW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIGZvcm1hdCBudW1iZXJcbiAgICAgICAgICAgIGlmIChudW1lcmFsLl8uaW5jbHVkZXMoaW50LCAnLScpKSB7XG4gICAgICAgICAgICAgICAgaW50ID0gaW50LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIG5lZyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnQubGVuZ3RoIDwgbGVhZGluZ0NvdW50KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGxlYWRpbmdDb3VudCAtIGludC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ID0gJzAnICsgaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRob3VzYW5kcyA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaW50ID0gaW50LnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEnICsgbG9jYWxlLmRlbGltaXRlcnMudGhvdXNhbmRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcuJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbnQgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3V0cHV0ID0gaW50ICsgZGVjaW1hbCArIChhYmJyID8gYWJiciA6ICcnKTtcblxuICAgICAgICAgICAgaWYgKG5lZ1ApIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAobmVnUCAmJiBuZWcgPyAnKCcgOiAnJykgKyBvdXRwdXQgKyAobmVnUCAmJiBuZWcgPyAnKScgOiAnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzaWduZWQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBzaWduZWQgPT09IDAgPyAobmVnID8gJy0nIDogJysnKSArIG91dHB1dCA6IG91dHB1dCArIChuZWcgPyAnLScgOiAnKycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmVnKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9ICctJyArIG91dHB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHVuZm9ybWF0cyBudW1iZXJzIHNlcGFyYXRvcnMsIGRlY2ltYWxzIHBsYWNlcywgc2lnbnMsIGFiYnJldmlhdGlvbnNcbiAgICAgICAgc3RyaW5nVG9OdW1iZXI6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZXNbb3B0aW9ucy5jdXJyZW50TG9jYWxlXSxcbiAgICAgICAgICAgICAgICBzdHJpbmdPcmlnaW5hbCA9IHN0cmluZyxcbiAgICAgICAgICAgICAgICBhYmJyZXZpYXRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB0aG91c2FuZDogMyxcbiAgICAgICAgICAgICAgICAgICAgbWlsbGlvbjogNixcbiAgICAgICAgICAgICAgICAgICAgYmlsbGlvbjogOSxcbiAgICAgICAgICAgICAgICAgICAgdHJpbGxpb246IDEyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhYmJyZXZpYXRpb24sXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICByZWdleHA7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnplcm9Gb3JtYXQgJiYgc3RyaW5nID09PSBvcHRpb25zLnplcm9Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubnVsbEZvcm1hdCAmJiBzdHJpbmcgPT09IG9wdGlvbnMubnVsbEZvcm1hdCB8fCAhc3RyaW5nLnJlcGxhY2UoL1teMC05XSsvZywgJycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZS5kZWxpbWl0ZXJzLmRlY2ltYWwgIT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuL2csICcnKS5yZXBsYWNlKGxvY2FsZS5kZWxpbWl0ZXJzLmRlY2ltYWwsICcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChhYmJyZXZpYXRpb24gaW4gYWJicmV2aWF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZWdleHAgPSBuZXcgUmVnRXhwKCdbXmEtekEtWl0nICsgbG9jYWxlLmFiYnJldmlhdGlvbnNbYWJicmV2aWF0aW9uXSArICcoPzpcXFxcKXwoXFxcXCcgKyBsb2NhbGUuY3VycmVuY3kuc3ltYm9sICsgJyk/KD86XFxcXCkpPyk/JCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdPcmlnaW5hbC5tYXRjaChyZWdleHApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAqPSBNYXRoLnBvdygxMCwgYWJicmV2aWF0aW9uc1thYmJyZXZpYXRpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5lZ2F0aXZlIG51bWJlclxuICAgICAgICAgICAgICAgIHZhbHVlICo9IChzdHJpbmcuc3BsaXQoJy0nKS5sZW5ndGggKyBNYXRoLm1pbihzdHJpbmcuc3BsaXQoJygnKS5sZW5ndGggLSAxLCBzdHJpbmcuc3BsaXQoJyknKS5sZW5ndGggLSAxKSkgJSAyID8gMSA6IC0xO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG5vbiBudW1iZXJzXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1teMC05XFwuXSsvZywgJycpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgKj0gTnVtYmVyKHN0cmluZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNOYU46IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGVzOiBmdW5jdGlvbihzdHJpbmcsIHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5pbmRleE9mKHNlYXJjaCkgIT09IC0xO1xuICAgICAgICB9LFxuICAgICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHN0cmluZywgc3ViU3RyaW5nLCBzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5zbGljZSgwLCBzdGFydCkgKyBzdWJTdHJpbmcgKyBzdHJpbmcuc2xpY2Uoc3RhcnQpO1xuICAgICAgICB9LFxuICAgICAgICByZWR1Y2U6IGZ1bmN0aW9uKGFycmF5LCBjYWxsYmFjayAvKiwgaW5pdGlhbFZhbHVlKi8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLnJlZHVjZSBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY2FsbGJhY2sgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0ID0gT2JqZWN0KGFycmF5KSxcbiAgICAgICAgICAgICAgICBsZW4gPSB0Lmxlbmd0aCA+Pj4gMCxcbiAgICAgICAgICAgICAgICBrID0gMCxcbiAgICAgICAgICAgICAgICB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGsgPCBsZW4gJiYgIShrIGluIHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoayA+PSBsZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdFtrKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgICAgICAgIGlmIChrIGluIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgdFtrXSwgaywgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZXMgdGhlIG11bHRpcGxpZXIgbmVjZXNzYXJ5IHRvIG1ha2UgeCA+PSAxLFxuICAgICAgICAgKiBlZmZlY3RpdmVseSBlbGltaW5hdGluZyBtaXNjYWxjdWxhdGlvbnMgY2F1c2VkIGJ5XG4gICAgICAgICAqIGZpbml0ZSBwcmVjaXNpb24uXG4gICAgICAgICAqL1xuICAgICAgICBtdWx0aXBsaWVyOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJ0cy5sZW5ndGggPCAyID8gMSA6IE1hdGgucG93KDEwLCBwYXJ0c1sxXS5sZW5ndGgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogR2l2ZW4gYSB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLCByZXR1cm5zIHRoZSBtYXhpbXVtXG4gICAgICAgICAqIG11bHRpcGxpZXIgdGhhdCBtdXN0IGJlIHVzZWQgdG8gbm9ybWFsaXplIGFuIG9wZXJhdGlvbiBpbnZvbHZpbmdcbiAgICAgICAgICogYWxsIG9mIHRoZW0uXG4gICAgICAgICAqL1xuICAgICAgICBjb3JyZWN0aW9uRmFjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHJldHVybiBhcmdzLnJlZHVjZShmdW5jdGlvbihhY2N1bSwgbmV4dCkge1xuICAgICAgICAgICAgICAgIHZhciBtbiA9IF8ubXVsdGlwbGllcihuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW0gPiBtbiA/IGFjY3VtIDogbW47XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEltcGxlbWVudGF0aW9uIG9mIHRvRml4ZWQoKSB0aGF0IHRyZWF0cyBmbG9hdHMgbW9yZSBsaWtlIGRlY2ltYWxzXG4gICAgICAgICAqXG4gICAgICAgICAqIEZpeGVzIGJpbmFyeSByb3VuZGluZyBpc3N1ZXMgKGVnLiAoMC42MTUpLnRvRml4ZWQoMikgPT09ICcwLjYxJykgdGhhdCBwcmVzZW50XG4gICAgICAgICAqIHByb2JsZW1zIGZvciBhY2NvdW50aW5nLSBhbmQgZmluYW5jZS1yZWxhdGVkIHNvZnR3YXJlLlxuICAgICAgICAgKi9cbiAgICAgICAgdG9GaXhlZDogZnVuY3Rpb24odmFsdWUsIG1heERlY2ltYWxzLCByb3VuZGluZ0Z1bmN0aW9uLCBvcHRpb25hbHMpIHtcbiAgICAgICAgICAgIHZhciBzcGxpdFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpLFxuICAgICAgICAgICAgICAgIG1pbkRlY2ltYWxzID0gbWF4RGVjaW1hbHMgLSAob3B0aW9uYWxzIHx8IDApLFxuICAgICAgICAgICAgICAgIGJvdW5kZWRQcmVjaXNpb24sXG4gICAgICAgICAgICAgICAgb3B0aW9uYWxzUmVnRXhwLFxuICAgICAgICAgICAgICAgIHBvd2VyLFxuICAgICAgICAgICAgICAgIG91dHB1dDtcblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBzbWFsbGVzdCBwcmVjaXNpb24gdmFsdWUgcG9zc2libGUgdG8gYXZvaWQgZXJyb3JzIGZyb20gZmxvYXRpbmcgcG9pbnQgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIGlmIChzcGxpdFZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICBib3VuZGVkUHJlY2lzaW9uID0gTWF0aC5taW4oTWF0aC5tYXgoc3BsaXRWYWx1ZVsxXS5sZW5ndGgsIG1pbkRlY2ltYWxzKSwgbWF4RGVjaW1hbHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYm91bmRlZFByZWNpc2lvbiA9IG1pbkRlY2ltYWxzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb3dlciA9IE1hdGgucG93KDEwLCBib3VuZGVkUHJlY2lzaW9uKTtcblxuICAgICAgICAgICAgLy8gTXVsdGlwbHkgdXAgYnkgcHJlY2lzaW9uLCByb3VuZCBhY2N1cmF0ZWx5LCB0aGVuIGRpdmlkZSBhbmQgdXNlIG5hdGl2ZSB0b0ZpeGVkKCk6XG4gICAgICAgICAgICBvdXRwdXQgPSAocm91bmRpbmdGdW5jdGlvbih2YWx1ZSArICdlKycgKyBib3VuZGVkUHJlY2lzaW9uKSAvIHBvd2VyKS50b0ZpeGVkKGJvdW5kZWRQcmVjaXNpb24pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9uYWxzID4gbWF4RGVjaW1hbHMgLSBib3VuZGVkUHJlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uYWxzUmVnRXhwID0gbmV3IFJlZ0V4cCgnXFxcXC4/MHsxLCcgKyAob3B0aW9uYWxzIC0gKG1heERlY2ltYWxzIC0gYm91bmRlZFByZWNpc2lvbikpICsgJ30kJyk7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2Uob3B0aW9uYWxzUmVnRXhwLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gYXZhbGlhYmxlIG9wdGlvbnNcbiAgICBudW1lcmFsLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gYXZhbGlhYmxlIGZvcm1hdHNcbiAgICBudW1lcmFsLmZvcm1hdHMgPSBmb3JtYXRzO1xuXG4gICAgLy8gYXZhbGlhYmxlIGZvcm1hdHNcbiAgICBudW1lcmFsLmxvY2FsZXMgPSBsb2NhbGVzO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBjdXJyZW50IGxvY2FsZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsb2NhbGUga2V5LlxuICAgIG51bWVyYWwubG9jYWxlID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY3VycmVudExvY2FsZSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuY3VycmVudExvY2FsZTtcbiAgICB9O1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGxvYWRlZCBsb2NhbGUgZGF0YS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudFxuICAgIC8vIGdsb2JhbCBsb2NhbGUgb2JqZWN0LlxuICAgIG51bWVyYWwubG9jYWxlRGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbb3B0aW9ucy5jdXJyZW50TG9jYWxlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICghbG9jYWxlc1trZXldKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbG9jYWxlIDogJyArIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbG9jYWxlc1trZXldO1xuICAgIH07XG5cbiAgICBudW1lcmFsLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGRlZmF1bHRzKSB7XG4gICAgICAgICAgICBvcHRpb25zW3Byb3BlcnR5XSA9IGRlZmF1bHRzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBudW1lcmFsLnplcm9Gb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgb3B0aW9ucy56ZXJvRm9ybWF0ID0gdHlwZW9mKGZvcm1hdCkgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogbnVsbDtcbiAgICB9O1xuXG4gICAgbnVtZXJhbC5udWxsRm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICBvcHRpb25zLm51bGxGb3JtYXQgPSB0eXBlb2YoZm9ybWF0KSA9PT0gJ3N0cmluZycgPyBmb3JtYXQgOiBudWxsO1xuICAgIH07XG5cbiAgICBudW1lcmFsLmRlZmF1bHRGb3JtYXQgPSBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0Rm9ybWF0ID0gdHlwZW9mKGZvcm1hdCkgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogJzAuMCc7XG4gICAgfTtcblxuICAgIG51bWVyYWwucmVnaXN0ZXIgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBmb3JtYXQpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAodGhpc1t0eXBlICsgJ3MnXVtuYW1lXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihuYW1lICsgJyAnICsgdHlwZSArICcgYWxyZWFkeSByZWdpc3RlcmVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc1t0eXBlICsgJ3MnXVtuYW1lXSA9IGZvcm1hdDtcblxuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH07XG5cblxuICAgIG51bWVyYWwudmFsaWRhdGUgPSBmdW5jdGlvbih2YWwsIGN1bHR1cmUpIHtcbiAgICAgICAgdmFyIF9kZWNpbWFsU2VwLFxuICAgICAgICAgICAgX3Rob3VzYW5kU2VwLFxuICAgICAgICAgICAgX2N1cnJTeW1ib2wsXG4gICAgICAgICAgICBfdmFsQXJyYXksXG4gICAgICAgICAgICBfYWJick9iaixcbiAgICAgICAgICAgIF90aG91c2FuZFJlZ0V4LFxuICAgICAgICAgICAgbG9jYWxlRGF0YSxcbiAgICAgICAgICAgIHRlbXA7XG5cbiAgICAgICAgLy9jb2VyY2UgdmFsIHRvIHN0cmluZ1xuICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbCArPSAnJztcblxuICAgICAgICAgICAgaWYgKGNvbnNvbGUud2Fybikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTnVtZXJhbC5qczogVmFsdWUgaXMgbm90IHN0cmluZy4gSXQgaGFzIGJlZW4gY28tZXJjZWQgdG86ICcsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3RyaW0gd2hpdGVzcGFjZXMgZnJvbSBlaXRoZXIgc2lkZXNcbiAgICAgICAgdmFsID0gdmFsLnRyaW0oKTtcblxuICAgICAgICAvL2lmIHZhbCBpcyBqdXN0IGRpZ2l0cyByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAoISF2YWwubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdmFsIGlzIGVtcHR5IHJldHVybiBmYWxzZVxuICAgICAgICBpZiAodmFsID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9nZXQgdGhlIGRlY2ltYWwgYW5kIHRob3VzYW5kcyBzZXBhcmF0b3IgZnJvbSBudW1lcmFsLmxvY2FsZURhdGFcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhlIGN1bHR1cmUgaXMgdW5kZXJzdG9vZCBieSBudW1lcmFsLiBpZiBub3QsIGRlZmF1bHQgaXQgdG8gY3VycmVudCBsb2NhbGVcbiAgICAgICAgICAgIGxvY2FsZURhdGEgPSBudW1lcmFsLmxvY2FsZURhdGEoY3VsdHVyZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvY2FsZURhdGEgPSBudW1lcmFsLmxvY2FsZURhdGEobnVtZXJhbC5sb2NhbGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldHVwIHRoZSBkZWxpbWl0ZXJzIGFuZCBjdXJyZW5jeSBzeW1ib2wgYmFzZWQgb24gY3VsdHVyZS9sb2NhbGVcbiAgICAgICAgX2N1cnJTeW1ib2wgPSBsb2NhbGVEYXRhLmN1cnJlbmN5LnN5bWJvbDtcbiAgICAgICAgX2FiYnJPYmogPSBsb2NhbGVEYXRhLmFiYnJldmlhdGlvbnM7XG4gICAgICAgIF9kZWNpbWFsU2VwID0gbG9jYWxlRGF0YS5kZWxpbWl0ZXJzLmRlY2ltYWw7XG4gICAgICAgIGlmIChsb2NhbGVEYXRhLmRlbGltaXRlcnMudGhvdXNhbmRzID09PSAnLicpIHtcbiAgICAgICAgICAgIF90aG91c2FuZFNlcCA9ICdcXFxcLic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhvdXNhbmRTZXAgPSBsb2NhbGVEYXRhLmRlbGltaXRlcnMudGhvdXNhbmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWRhdGluZyBjdXJyZW5jeSBzeW1ib2xcbiAgICAgICAgdGVtcCA9IHZhbC5tYXRjaCgvXlteXFxkXSsvKTtcbiAgICAgICAgaWYgKHRlbXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5zdWJzdHIoMSk7XG4gICAgICAgICAgICBpZiAodGVtcFswXSAhPT0gX2N1cnJTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3ZhbGlkYXRpbmcgYWJicmV2aWF0aW9uIHN5bWJvbFxuICAgICAgICB0ZW1wID0gdmFsLm1hdGNoKC9bXlxcZF0rJC8pO1xuICAgICAgICBpZiAodGVtcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIGlmICh0ZW1wWzBdICE9PSBfYWJick9iai50aG91c2FuZCAmJiB0ZW1wWzBdICE9PSBfYWJick9iai5taWxsaW9uICYmIHRlbXBbMF0gIT09IF9hYmJyT2JqLmJpbGxpb24gJiYgdGVtcFswXSAhPT0gX2FiYnJPYmoudHJpbGxpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhvdXNhbmRSZWdFeCA9IG5ldyBSZWdFeHAoX3Rob3VzYW5kU2VwICsgJ3syfScpO1xuXG4gICAgICAgIGlmICghdmFsLm1hdGNoKC9bXlxcZC4sXS9nKSkge1xuICAgICAgICAgICAgX3ZhbEFycmF5ID0gdmFsLnNwbGl0KF9kZWNpbWFsU2VwKTtcbiAgICAgICAgICAgIGlmIChfdmFsQXJyYXkubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKF92YWxBcnJheS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoICEhIF92YWxBcnJheVswXS5tYXRjaCgvXlxcZCsuKlxcZCQvKSAmJiAhX3ZhbEFycmF5WzBdLm1hdGNoKF90aG91c2FuZFJlZ0V4KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF92YWxBcnJheVswXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoICEhIF92YWxBcnJheVswXS5tYXRjaCgvXlxcZCskLykgJiYgIV92YWxBcnJheVswXS5tYXRjaChfdGhvdXNhbmRSZWdFeCkgJiYgISEgX3ZhbEFycmF5WzFdLm1hdGNoKC9eXFxkKyQvKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCAhISBfdmFsQXJyYXlbMF0ubWF0Y2goL15cXGQrLipcXGQkLykgJiYgIV92YWxBcnJheVswXS5tYXRjaChfdGhvdXNhbmRSZWdFeCkgJiYgISEgX3ZhbEFycmF5WzFdLm1hdGNoKC9eXFxkKyQvKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBOdW1lcmFsIFByb3RvdHlwZVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIG51bWVyYWwuZm4gPSBOdW1lcmFsLnByb3RvdHlwZSA9IHtcbiAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bWVyYWwodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdDogZnVuY3Rpb24oaW5wdXRTdHJpbmcsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3ZhbHVlLFxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGlucHV0U3RyaW5nIHx8IG9wdGlvbnMuZGVmYXVsdEZvcm1hdCxcbiAgICAgICAgICAgICAgICBraW5kLFxuICAgICAgICAgICAgICAgIG91dHB1dCxcbiAgICAgICAgICAgICAgICBmb3JtYXRGdW5jdGlvbjtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYSByb3VuZGluZ0Z1bmN0aW9uXG4gICAgICAgICAgICByb3VuZGluZ0Z1bmN0aW9uID0gcm91bmRpbmdGdW5jdGlvbiB8fCBNYXRoLnJvdW5kO1xuXG4gICAgICAgICAgICAvLyBmb3JtYXQgYmFzZWQgb24gdmFsdWVcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCAmJiBvcHRpb25zLnplcm9Gb3JtYXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvcHRpb25zLnplcm9Gb3JtYXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsICYmIG9wdGlvbnMubnVsbEZvcm1hdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG9wdGlvbnMubnVsbEZvcm1hdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChraW5kIGluIGZvcm1hdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5tYXRjaChmb3JtYXRzW2tpbmRdLnJlZ2V4cHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRzW2tpbmRdLmZvcm1hdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IG51bWVyYWwuXy5udW1iZXJUb0Zvcm1hdDtcblxuICAgICAgICAgICAgICAgIG91dHB1dCA9IGZvcm1hdEZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGlucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnB1dDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBfLmNvcnJlY3Rpb25GYWN0b3IuY2FsbChudWxsLCB0aGlzLl92YWx1ZSwgdmFsdWUpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjYmFjayhhY2N1bSwgY3VyciwgY3VyckksIE8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW0gKyBNYXRoLnJvdW5kKGNvcnJGYWN0b3IgKiBjdXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBfLnJlZHVjZShbdGhpcy5fdmFsdWUsIHZhbHVlXSwgY2JhY2ssIDApIC8gY29yckZhY3RvcjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHN1YnRyYWN0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBfLmNvcnJlY3Rpb25GYWN0b3IuY2FsbChudWxsLCB0aGlzLl92YWx1ZSwgdmFsdWUpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjYmFjayhhY2N1bSwgY3VyciwgY3VyckksIE8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW0gLSBNYXRoLnJvdW5kKGNvcnJGYWN0b3IgKiBjdXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBfLnJlZHVjZShbdmFsdWVdLCBjYmFjaywgTWF0aC5yb3VuZCh0aGlzLl92YWx1ZSAqIGNvcnJGYWN0b3IpKSAvIGNvcnJGYWN0b3I7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBtdWx0aXBseTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNiYWNrKGFjY3VtLCBjdXJyLCBjdXJySSwgTykge1xuICAgICAgICAgICAgICAgIHZhciBjb3JyRmFjdG9yID0gXy5jb3JyZWN0aW9uRmFjdG9yKGFjY3VtLCBjdXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChhY2N1bSAqIGNvcnJGYWN0b3IpICogTWF0aC5yb3VuZChjdXJyICogY29yckZhY3RvcikgLyBNYXRoLnJvdW5kKGNvcnJGYWN0b3IgKiBjb3JyRmFjdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBfLnJlZHVjZShbdGhpcy5fdmFsdWUsIHZhbHVlXSwgY2JhY2ssIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZGl2aWRlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2JhY2soYWNjdW0sIGN1cnIsIGN1cnJJLCBPKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBfLmNvcnJlY3Rpb25GYWN0b3IoYWNjdW0sIGN1cnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGFjY3VtICogY29yckZhY3RvcikgLyBNYXRoLnJvdW5kKGN1cnIgKiBjb3JyRmFjdG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBfLnJlZHVjZShbdGhpcy5fdmFsdWUsIHZhbHVlXSwgY2JhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZGlmZmVyZW5jZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhudW1lcmFsKHRoaXMuX3ZhbHVlKS5zdWJ0cmFjdCh2YWx1ZSkudmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBEZWZhdWx0IExvY2FsZSAmJiBGb3JtYXRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBudW1lcmFsLnJlZ2lzdGVyKCdsb2NhbGUnLCAnZW4nLCB7XG4gICAgICAgIGRlbGltaXRlcnM6IHtcbiAgICAgICAgICAgIHRob3VzYW5kczogJywnLFxuICAgICAgICAgICAgZGVjaW1hbDogJy4nXG4gICAgICAgIH0sXG4gICAgICAgIGFiYnJldmlhdGlvbnM6IHtcbiAgICAgICAgICAgIHRob3VzYW5kOiAnaycsXG4gICAgICAgICAgICBtaWxsaW9uOiAnbScsXG4gICAgICAgICAgICBiaWxsaW9uOiAnYicsXG4gICAgICAgICAgICB0cmlsbGlvbjogJ3QnXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGluYWw6IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMDtcbiAgICAgICAgICAgIHJldHVybiAofn4obnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICB9LFxuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgc3ltYm9sOiAnJCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgbnVtZXJhbC5yZWdpc3RlcignZm9ybWF0JywgJ2JwcycsIHtcbiAgICAgICAgICAgIHJlZ2V4cHM6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IC8oQlBTKS8sXG4gICAgICAgICAgICAgICAgdW5mb3JtYXQ6IC8oQlBTKS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3BhY2UgPSBudW1lcmFsLl8uaW5jbHVkZXMoZm9ybWF0LCAnIEJQUycpID8gJyAnIDogJycsXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dDtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKiAxMDAwMDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmUgQlBTXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL1xccz9CUFMvLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBudW1lcmFsLl8ubnVtYmVyVG9Gb3JtYXQodmFsdWUsIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKG91dHB1dCwgJyknKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQuc3BsaXQoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5zcGxpY2UoLTEsIDAsIHNwYWNlICsgJ0JQUycpO1xuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBzcGFjZSArICdCUFMnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5mb3JtYXQ6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiArKG51bWVyYWwuXy5zdHJpbmdUb051bWJlcihzdHJpbmcpICogMC4wMDAxKS50b0ZpeGVkKDE1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59KSgpO1xuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlY2ltYWwgPSB7XG4gICAgICAgICAgICBiYXNlOiAxMDAwLFxuICAgICAgICAgICAgc3VmZml4ZXM6IFsnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddXG4gICAgICAgIH0sXG4gICAgICAgIGJpbmFyeSA9IHtcbiAgICAgICAgICAgIGJhc2U6IDEwMjQsXG4gICAgICAgICAgICBzdWZmaXhlczogWydCJywgJ0tpQicsICdNaUInLCAnR2lCJywgJ1RpQicsICdQaUInLCAnRWlCJywgJ1ppQicsICdZaUInXVxuICAgICAgICB9O1xuXG4gICAgdmFyIGFsbFN1ZmZpeGVzID0gIGRlY2ltYWwuc3VmZml4ZXMuY29uY2F0KGJpbmFyeS5zdWZmaXhlcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBkZWNpbWFsLnN1ZmZpeGVzLmluZGV4T2YoaXRlbSkgPCAwO1xuICAgICAgICB9KSk7XG4gICAgICAgIHZhciB1bmZvcm1hdFJlZ2V4ID0gYWxsU3VmZml4ZXMuam9pbignfCcpO1xuICAgICAgICAvLyBBbGxvdyBzdXBwb3J0IGZvciBCUFMgKGh0dHA6Ly93d3cuaW52ZXN0b3BlZGlhLmNvbS90ZXJtcy9iL2Jhc2lzcG9pbnQuYXNwKVxuICAgICAgICB1bmZvcm1hdFJlZ2V4ID0gJygnICsgdW5mb3JtYXRSZWdleC5yZXBsYWNlKCdCJywgJ0IoPyFQUyknKSArICcpJztcblxuICAgIG51bWVyYWwucmVnaXN0ZXIoJ2Zvcm1hdCcsICdieXRlcycsIHtcbiAgICAgICAgcmVnZXhwczoge1xuICAgICAgICAgICAgZm9ybWF0OiAvKFswXFxzXWk/YikvLFxuICAgICAgICAgICAgdW5mb3JtYXQ6IG5ldyBSZWdFeHAodW5mb3JtYXRSZWdleClcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0LFxuICAgICAgICAgICAgICAgIGJ5dGVzID0gbnVtZXJhbC5fLmluY2x1ZGVzKGZvcm1hdCwgJ2liJykgPyBiaW5hcnkgOiBkZWNpbWFsLFxuICAgICAgICAgICAgICAgIHN1ZmZpeCA9IG51bWVyYWwuXy5pbmNsdWRlcyhmb3JtYXQsICcgYicpIHx8IG51bWVyYWwuXy5pbmNsdWRlcyhmb3JtYXQsICcgaWInKSA/ICcgJyA6ICcnLFxuICAgICAgICAgICAgICAgIHBvd2VyLFxuICAgICAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgICAgICBtYXg7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmVcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9cXHM/aT9iLywgJycpO1xuXG4gICAgICAgICAgICBmb3IgKHBvd2VyID0gMDsgcG93ZXIgPD0gYnl0ZXMuc3VmZml4ZXMubGVuZ3RoOyBwb3dlcisrKSB7XG4gICAgICAgICAgICAgICAgbWluID0gTWF0aC5wb3coYnl0ZXMuYmFzZSwgcG93ZXIpO1xuICAgICAgICAgICAgICAgIG1heCA9IE1hdGgucG93KGJ5dGVzLmJhc2UsIHBvd2VyICsgMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IDAgfHwgdmFsdWUgPj0gbWluICYmIHZhbHVlIDwgbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1ZmZpeCArPSBieXRlcy5zdWZmaXhlc1twb3dlcl07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyBtaW47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG91dHB1dCA9IG51bWVyYWwuXy5udW1iZXJUb0Zvcm1hdCh2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCArIHN1ZmZpeDtcbiAgICAgICAgfSxcbiAgICAgICAgdW5mb3JtYXQ6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gbnVtZXJhbC5fLnN0cmluZ1RvTnVtYmVyKHN0cmluZyksXG4gICAgICAgICAgICAgICAgcG93ZXIsXG4gICAgICAgICAgICAgICAgYnl0ZXNNdWx0aXBsaWVyO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHBvd2VyID0gZGVjaW1hbC5zdWZmaXhlcy5sZW5ndGggLSAxOyBwb3dlciA+PSAwOyBwb3dlci0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1lcmFsLl8uaW5jbHVkZXMoc3RyaW5nLCBkZWNpbWFsLnN1ZmZpeGVzW3Bvd2VyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzTXVsdGlwbGllciA9IE1hdGgucG93KGRlY2ltYWwuYmFzZSwgcG93ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1lcmFsLl8uaW5jbHVkZXMoc3RyaW5nLCBiaW5hcnkuc3VmZml4ZXNbcG93ZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXNNdWx0aXBsaWVyID0gTWF0aC5wb3coYmluYXJ5LmJhc2UsIHBvd2VyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSAqPSAoYnl0ZXNNdWx0aXBsaWVyIHx8IDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuICAgICAgICBudW1lcmFsLnJlZ2lzdGVyKCdmb3JtYXQnLCAnY3VycmVuY3knLCB7XG4gICAgICAgIHJlZ2V4cHM6IHtcbiAgICAgICAgICAgIGZvcm1hdDogLyhcXCQpL1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGUgPSBudW1lcmFsLmxvY2FsZXNbbnVtZXJhbC5vcHRpb25zLmN1cnJlbnRMb2NhbGVdLFxuICAgICAgICAgICAgICAgIHN5bWJvbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZTogZm9ybWF0Lm1hdGNoKC9eKFtcXCt8XFwtfFxcKHxcXHN8XFwkXSopLylbMF0sXG4gICAgICAgICAgICAgICAgICAgIGFmdGVyOiBmb3JtYXQubWF0Y2goLyhbXFwrfFxcLXxcXCl8XFxzfFxcJF0qKSQvKVswXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3V0cHV0LFxuICAgICAgICAgICAgICAgIHN5bWJvbCxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICAvLyBzdHJpcCBmb3JtYXQgb2Ygc3BhY2VzIGFuZCAkXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvXFxzP1xcJFxccz8vLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIGZvcm1hdCB0aGUgbnVtYmVyXG4gICAgICAgICAgICBvdXRwdXQgPSBudW1lcmFsLl8ubnVtYmVyVG9Gb3JtYXQodmFsdWUsIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbik7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgYmVmb3JlIGFuZCBhZnRlciBiYXNlZCBvbiB2YWx1ZVxuICAgICAgICAgICAgaWYgKHZhbHVlID49IDApIHtcbiAgICAgICAgICAgICAgICBzeW1ib2xzLmJlZm9yZSA9IHN5bWJvbHMuYmVmb3JlLnJlcGxhY2UoL1tcXC1cXChdLywgJycpO1xuICAgICAgICAgICAgICAgIHN5bWJvbHMuYWZ0ZXIgPSBzeW1ib2xzLmFmdGVyLnJlcGxhY2UoL1tcXC1cXCldLywgJycpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDAgJiYgKCFudW1lcmFsLl8uaW5jbHVkZXMoc3ltYm9scy5iZWZvcmUsICctJykgJiYgIW51bWVyYWwuXy5pbmNsdWRlcyhzeW1ib2xzLmJlZm9yZSwgJygnKSkpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2xzLmJlZm9yZSA9ICctJyArIHN5bWJvbHMuYmVmb3JlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBiZWZvcmUgc3ltYm9sXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltYm9scy5iZWZvcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBzeW1ib2xzLmJlZm9yZVtpXTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3ltYm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbnVtZXJhbC5fLmluc2VydChvdXRwdXQsIGxvY2FsZS5jdXJyZW5jeS5zeW1ib2wsIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbnVtZXJhbC5fLmluc2VydChvdXRwdXQsICcgJywgaSArIGxvY2FsZS5jdXJyZW5jeS5zeW1ib2wubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBlYWNoIGFmdGVyIHN5bWJvbFxuICAgICAgICAgICAgZm9yIChpID0gc3ltYm9scy5hZnRlci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHN5bWJvbHMuYWZ0ZXJbaV07XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN5bWJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICckJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IGkgPT09IHN5bWJvbHMuYWZ0ZXIubGVuZ3RoIC0gMSA/IG91dHB1dCArIGxvY2FsZS5jdXJyZW5jeS5zeW1ib2wgOiBudW1lcmFsLl8uaW5zZXJ0KG91dHB1dCwgbG9jYWxlLmN1cnJlbmN5LnN5bWJvbCwgLShzeW1ib2xzLmFmdGVyLmxlbmd0aCAtICgxICsgaSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IGkgPT09IHN5bWJvbHMuYWZ0ZXIubGVuZ3RoIC0gMSA/IG91dHB1dCArICcgJyA6IG51bWVyYWwuXy5pbnNlcnQob3V0cHV0LCAnICcsIC0oc3ltYm9scy5hZnRlci5sZW5ndGggLSAoMSArIGkpICsgbG9jYWxlLmN1cnJlbmN5LnN5bWJvbC5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoKTtcblxuXG4oZnVuY3Rpb24oKSB7XG4gICAgICAgIG51bWVyYWwucmVnaXN0ZXIoJ2Zvcm1hdCcsICdleHBvbmVudGlhbCcsIHtcbiAgICAgICAgcmVnZXhwczoge1xuICAgICAgICAgICAgZm9ybWF0OiAvKGVcXCt8ZS0pLyxcbiAgICAgICAgICAgIHVuZm9ybWF0OiAvKGVcXCt8ZS0pL1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQsXG4gICAgICAgICAgICAgICAgZXhwb25lbnRpYWwgPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFudW1lcmFsLl8uaXNOYU4odmFsdWUpID8gdmFsdWUudG9FeHBvbmVudGlhbCgpIDogJzBlKzAnLFxuICAgICAgICAgICAgICAgIHBhcnRzID0gZXhwb25lbnRpYWwuc3BsaXQoJ2UnKTtcblxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL2VbXFwrfFxcLV17MX0wLywgJycpO1xuXG4gICAgICAgICAgICBvdXRwdXQgPSBudW1lcmFsLl8ubnVtYmVyVG9Gb3JtYXQoTnVtYmVyKHBhcnRzWzBdKSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCArICdlJyArIHBhcnRzWzFdO1xuICAgICAgICB9LFxuICAgICAgICB1bmZvcm1hdDogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBudW1lcmFsLl8uaW5jbHVkZXMoc3RyaW5nLCAnZSsnKSA/IHN0cmluZy5zcGxpdCgnZSsnKSA6IHN0cmluZy5zcGxpdCgnZS0nKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE51bWJlcihwYXJ0c1swXSksXG4gICAgICAgICAgICAgICAgcG93ZXIgPSBOdW1iZXIocGFydHNbMV0pO1xuXG4gICAgICAgICAgICBwb3dlciA9IG51bWVyYWwuXy5pbmNsdWRlcyhzdHJpbmcsICdlLScpID8gcG93ZXIgKj0gLTEgOiBwb3dlcjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2JhY2soYWNjdW0sIGN1cnIsIGN1cnJJLCBPKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBudW1lcmFsLl8uY29ycmVjdGlvbkZhY3RvcihhY2N1bSwgY3VyciksXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IChhY2N1bSAqIGNvcnJGYWN0b3IpICogKGN1cnIgKiBjb3JyRmFjdG9yKSAvIChjb3JyRmFjdG9yICogY29yckZhY3Rvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bWVyYWwuXy5yZWR1Y2UoW3ZhbHVlLCBNYXRoLnBvdygxMCwgcG93ZXIpXSwgY2JhY2ssIDEpO1xuICAgICAgICB9XG4gICAgfSk7XG59KSgpO1xuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgbnVtZXJhbC5yZWdpc3RlcignZm9ybWF0JywgJ29yZGluYWwnLCB7XG4gICAgICAgIHJlZ2V4cHM6IHtcbiAgICAgICAgICAgIGZvcm1hdDogLyhvKS9cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlID0gbnVtZXJhbC5sb2NhbGVzW251bWVyYWwub3B0aW9ucy5jdXJyZW50TG9jYWxlXSxcbiAgICAgICAgICAgICAgICBvdXRwdXQsXG4gICAgICAgICAgICAgICAgb3JkaW5hbCA9IG51bWVyYWwuXy5pbmNsdWRlcyhmb3JtYXQsICcgbycpID8gJyAnIDogJyc7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmVcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9cXHM/by8sICcnKTtcblxuICAgICAgICAgICAgb3JkaW5hbCArPSBsb2NhbGUub3JkaW5hbCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIG91dHB1dCA9IG51bWVyYWwuXy5udW1iZXJUb0Zvcm1hdCh2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCArIG9yZGluYWw7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuICAgICAgICBudW1lcmFsLnJlZ2lzdGVyKCdmb3JtYXQnLCAncGVyY2VudGFnZScsIHtcbiAgICAgICAgcmVnZXhwczoge1xuICAgICAgICAgICAgZm9ybWF0OiAvKCUpLyxcbiAgICAgICAgICAgIHVuZm9ybWF0OiAvKCUpL1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBzcGFjZSA9IG51bWVyYWwuXy5pbmNsdWRlcyhmb3JtYXQsICcgJScpID8gJyAnIDogJycsXG4gICAgICAgICAgICAgICAgb3V0cHV0O1xuXG4gICAgICAgICAgICBpZiAobnVtZXJhbC5vcHRpb25zLnNjYWxlUGVyY2VudEJ5MTAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIDEwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHNwYWNlIGJlZm9yZSAlXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvXFxzP1xcJS8sICcnKTtcblxuICAgICAgICAgICAgb3V0cHV0ID0gbnVtZXJhbC5fLm51bWJlclRvRm9ybWF0KHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuXG4gICAgICAgICAgICBpZiAobnVtZXJhbC5fLmluY2x1ZGVzKG91dHB1dCwgJyknKSkge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5zcGxpdCgnJyk7XG5cbiAgICAgICAgICAgICAgICBvdXRwdXQuc3BsaWNlKC0xLCAwLCBzcGFjZSArICclJyk7XG5cbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQuam9pbignJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCArIHNwYWNlICsgJyUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9LFxuICAgICAgICB1bmZvcm1hdDogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgbnVtYmVyID0gbnVtZXJhbC5fLnN0cmluZ1RvTnVtYmVyKHN0cmluZyk7XG4gICAgICAgICAgICBpZiAobnVtZXJhbC5vcHRpb25zLnNjYWxlUGVyY2VudEJ5MTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlciAqIDAuMDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9XG4gICAgfSk7XG59KSgpO1xuXG5cbihmdW5jdGlvbigpIHtcbiAgICAgICAgbnVtZXJhbC5yZWdpc3RlcignZm9ybWF0JywgJ3RpbWUnLCB7XG4gICAgICAgIHJlZ2V4cHM6IHtcbiAgICAgICAgICAgIGZvcm1hdDogLyg6KS8sXG4gICAgICAgICAgICB1bmZvcm1hdDogLyg6KS9cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiBmdW5jdGlvbih2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHZhbHVlIC8gNjAgLyA2MCksXG4gICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoKHZhbHVlIC0gKGhvdXJzICogNjAgKiA2MCkpIC8gNjApLFxuICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLnJvdW5kKHZhbHVlIC0gKGhvdXJzICogNjAgKiA2MCkgLSAobWludXRlcyAqIDYwKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBob3VycyArICc6JyArIChtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcykgKyAnOicgKyAoc2Vjb25kcyA8IDEwID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHMpO1xuICAgICAgICB9LFxuICAgICAgICB1bmZvcm1hdDogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgdGltZUFycmF5ID0gc3RyaW5nLnNwbGl0KCc6JyksXG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IDA7XG5cbiAgICAgICAgICAgIC8vIHR1cm4gaG91cnMgYW5kIG1pbnV0ZXMgaW50byBzZWNvbmRzIGFuZCBhZGQgdGhlbSBhbGwgdXBcbiAgICAgICAgICAgIGlmICh0aW1lQXJyYXkubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgLy8gaG91cnNcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIChOdW1iZXIodGltZUFycmF5WzBdKSAqIDYwICogNjApO1xuICAgICAgICAgICAgICAgIC8vIG1pbnV0ZXNcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIChOdW1iZXIodGltZUFycmF5WzFdKSAqIDYwKTtcbiAgICAgICAgICAgICAgICAvLyBzZWNvbmRzXG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgKyBOdW1iZXIodGltZUFycmF5WzJdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZUFycmF5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIC8vIG1pbnV0ZXNcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIChOdW1iZXIodGltZUFycmF5WzBdKSAqIDYwKTtcbiAgICAgICAgICAgICAgICAvLyBzZWNvbmRzXG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgKyBOdW1iZXIodGltZUFycmF5WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoc2Vjb25kcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKCk7XG5cbnJldHVybiBudW1lcmFsO1xufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL251bWVyYWwvbnVtZXJhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9