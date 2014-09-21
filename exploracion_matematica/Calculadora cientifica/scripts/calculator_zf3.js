
//---------------------------------+
//  CARPE  Calculator ZF           |
//  Script version 3.0             |
//  2005 - 09 - 02                 |
//  By Tom Hermansson Snickars     |
//  Copyright CARPE Design 2005 -  |
//---------------------------------+

var timer = null; 
var display = getCookie("zf_display");
if (display == null) display = 0;
var dot = getCookie("zf_dot");
if (dot == null) dot = 0;
var bracket = getCookie("zf_bracket");
if (bracket == null) bracket = 0;
var mem = getCookie("zf_mem");
if (mem == null) mem = 0;
var rate = getCookie("zf_rate");
if (rate == null) rate = 1;

function showDisplay()
{
	document.calculator.expr.value = display
}

function keyBoard(key)
{
    if ((key < 106) && (key > 95)) enter(key - 96);
    if ((key < 58) && (key > 47)) enter(key - 48);
    if ((key == 8) || (key == 46) || (key == 67)) clearDisplay();
    if (key == 13) calc();        // "Enter"
    if ((key == 110) || (key == 188) || (key == 190)) enter(".");
    if ((key == 107) || (key == 187)) enter("+");
    if ((key == 109) || (key == 189)) enter("-");
    if ((key == 106) || (key == 191)) enter("*");
    if (key == 111) enter("/");   // "/" 
    if (key == 77) pop_mem();     // "M" 
    if (key == 83) push_mem();    // "S" 
    if (key == 82) set_rate();    // "R" 
    if (key == 84) to_rate();     // "T" 
    if (key == 89) from_rate();   // "Y" 
}

function setCookie(name, value)
{
	var curCookie = name + "=" + value + "; expires=" + "Wednesday, 09-Nov-50 23:12:40 GMT";
	document.cookie = curCookie;
}

function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
		begin += 2;
	}
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
		end = dc.length;
	}
    return unescape(dc.substring(begin + prefix.length, end));
}

function error(errorstring)
{
	alert("Calculator error:\n" + errorstring);
}

function enter(string)
{
	if (document.calculator.expr.value == '0') {
		if (string == "(") {
			bracket ++;
		}
		if (string == ".") {
			dot ++;
		}
		else {
			dot = 0;
		}
		if ((string == ")") || (string == "e")) {
			error("Illegal entry");
			string = "0";
		}
		document.calculator.expr.value = string;
		if (string == "*" || string == "/" || string == ".") {
			document.calculator.expr.value = "0" + string
		}
	}
	else {
		disp = new String(document.calculator.expr.value);
		last = disp.substring(disp.length - 1, disp.length);
		if (last == "(") {
		    if (string == '.') {
				dot ++;
			}
			if (string == "*" || string == "/" || string == ")" || string == "e") {
				error("Illegal entry");
				string = ""
			}
			if (string == "(") {
				bracket ++;
			}
		}
		if (last == ")") {
			if (string == '.') {
				dot ++;
			}
			if (string == "*" || string == "/" || string == "-" || string == "+") {
				print(string);
				string = ""
			}
			else {
				if (((string != "") && (bracket < 0)) || (string == ".")) {
					error("Illegal entry");
					string="";
				}
			}
			if (string == ")") {
				bracket -- ;
				if (bracket < 0) {
					calc();
					string = ""
				}
			}
		}
		if (last=="e") {
			if (string == '.') {
				error("Illegal entry");
				string = "";
				dot=0
			}
			if (string == "*" || string == "e" || string == "/" || string == "(" || string == ")") {
				error("Illegal entry");
				dot = 0;
				string = ""
			}
		}
		if (last == ".") {
			if (string == '.') {
				error("Illegal entry");
				string = "";
				dot = 0
			}
			if (string == "*" || string == "." || string == "e" || string == "/" || string == "-" || string == "+" || string == "(" || string == ")") {
				error("Illegal entry");
				string = ""
			}
		}
		if (last == "+" || last == "-" || last == "*" || last == "/") {
			if (string == '.') {
				dot ++;
				if (dot > 1) {
					error("Illegal entry");
					string="";
					dot = 0
			}
		}
		if (string == "e" || string == ")" || string == "*" || string == "/" || string == "-" || string == "+") {
			error("Illegal entry");
			string = "";
		}
		if (string == "(") {
			bracket ++;
			print(string);
			string = ""
		}
	}
	if (last=="0" || last=="1" || last=="2" || last=="3" || last=="4" || last=="5" || last=="6" || last=="7" || last=="8" || last=="9") {
		if (string == '.') {
			dot ++;
			if (dot > 1) {
				error("Illegal entry");
				string = "";
			}
		}
		if (string == "*" || string=="e" || string=="/" || string=="-" || string=="+" || string==")") {
			dot=0;
		}
		if (string == "(") {
			error("Illegal entry");
			string = "";
			dot = 0
		}
		if (string == ")") {
			bracket --;
			if (bracket < 0) {
				calc();
				dot = 0;
				string = ""
			}
		}
	}
	print(string);
}}

function print(string)
{
	document.calculator.expr.value = document.calculator.expr.value + string;
}

function calc()
{
	document.calculator.expr.value = eval(document.calculator.expr.value);
	bracket = 0;
	dot = 0;
}

function clearDisplay()
{
	document.calculator.expr.value = "0";
	bracket = 0;
	dot = 0;
}

function set_rate()
{
	rate = eval(document.calculator.expr.value);
	document.calculator.expr.value = rate;
	setCookie("zf_rate", rate);
}

function from_rate()
{
	document.calculator.expr.value = rate * eval(document.calculator.expr.value);
}

function to_rate()
{
	document.calculator.expr.value = eval(document.calculator.expr.value) / rate;
}

function push_mem()
{
	document.calculator.expr.value = eval(document.calculator.expr.value);
	mem = eval(document.calculator.expr.value);
	setCookie("zf_mem", mem)
}

function clear_mem()
{
	mem = '0';
	setCookie("zf_mem", mem);
}

function pop_mem()
{
	if (mem != 0) {
		enter(mem)
	}
}

function plus_mem()
{
	document.calculator.expr.value = eval(document.calculator.expr.value);
	mem = eval(document.calculator.expr.value) + mem;
	setCookie("zf_mem", mem);
}

function minus_mem()
{
	document.calculator.expr.value = eval(document.calculator.expr.value);
	mem = mem - eval(document.calculator.expr.value);
	setCookie("zf_mem", mem);
}

function power(y)
{
	document.calculator.expr.value = eval(Math.pow(eval(document.calculator.expr.value), y));
}

function power_x(y)
{
	document.calculator.expr.value = eval(Math.pow(y, eval(document.calculator.expr.value)));
}

function power_m()
{
	document.calculator.expr.value = eval(document.calculator.expr.value);
	document.calculator.expr.value = eval(Math.pow(eval(document.calculator.expr.value), eval(mem)));
}

function fac()
{
	x = eval(document.calculator.expr.value);
	if ((x < 0) || ((x - Math.floor(x)) != 0)) {
        document.calculator.expr.value = 'Error'
	}
    else {
		if ((x == 0) || (x == 1)) {
			y = '1';
			document.calculator.expr.value = eval(y);
		}
		else {
			y = '1';
			for (i = 1; i <= x; i ++) {
				y = y * i;
			}
            document.calculator.expr.value = eval(y);
		}
	}
}

function sin()
{
	document.calculator.expr.value = eval(Math.sin(eval(document.calculator.expr.value)))
}

function cos()
{
	document.calculator.expr.value = eval(Math.cos(eval(document.calculator.expr.value)))
}

function tan()
{
	document.calculator.expr.value = eval(Math.tan(eval(document.calculator.expr.value)))
}

function invsin()
{
	document.calculator.expr.value = 
		eval(Math.atan2(eval(document.calculator.expr.value),
			Math.sqrt(1 - Math.pow(eval(document.calculator.expr.value), 2))))
}

function invcos()
{
	document.calculator.expr.value =
		eval(Math.atan2(Math.sqrt(1 -
		Math.pow(eval(document.calculator.expr.value), 2)),
		eval(document.calculator.expr.value)));
}

function invtan()
{
	x = eval(document.calculator.expr.value);
	document.calculator.expr.value =
		eval(Math.atan2(x / Math.sqrt(1 + Math.pow(x, 2)), 1 / Math.sqrt(1 + Math.pow(x, 2))))
}

function asin()
{
	document.calculator.expr.value = eval(Math.asin(eval(document.calculator.expr.value)))
}

function acos()
{
	document.calculator.expr.value = eval(Math.acos(eval(document.calculator.expr.value)))
}

function atan()
{
	document.calculator.expr.value = eval(Math.atan(eval(document.calculator.expr.value)))
}

function ln()
{
	document.calculator.expr.value = eval(Math.log(eval(document.calculator.expr.value)))
}

function log()
{
	document.calculator.expr.value = eval(Math.log(eval(document.calculator.expr.value)) / Math.LN10)
}

function log()
{
	document.calculator.expr.value = eval(Math.log(eval(document.calculator.expr.value)) / Math.LN10)
}

function inv()
{
	calc();
	document.calculator.expr.value = eval('1/' + document.calculator.expr.value)
}

function neg()
{
	calc();
	document.calculator.expr.value = eval(-document.calculator.expr.value);
}

function stopcalc()
{
	setCookie("zf_display", document.calculator.expr.value);
	clearTimeout(timer)
}

function start()
{
	var time = new Date()
	var date = time.getDate()
	var month = time.getMonth()
	var y = time.getYear();
	var year = y % 100;
	year += (year < 38) ? 2000 : 1900;
	year = year - ((year > 100) ? ((Math.floor(year/100))*100) : 0);
	var hours = time.getHours()
	year = ((year < 10) ? "0" : "") + year
	month = month + 1;
	month = ((month < 10) ? "0" : "") + month
	date = ((date < 10) ? "0" : "") + date
	hours = ((hours < 10) ? "0" : "") + hours
	var minutes = time.getMinutes()
	minutes = ((minutes < 10) ? "0" : "") + minutes
	var seconds = time.getSeconds()
	seconds = ((seconds < 10) ? "0" : "") + seconds
	var clock = hours + ":" + minutes + ":" + seconds
	var calendar = year + "-" + month + "-" + date
	document.calculator.digiwatch.value = clock
	document.calculator.datewatch.value = calendar
	timer = setTimeout("start()",1000)
}