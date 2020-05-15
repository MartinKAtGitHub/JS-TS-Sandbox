"use strict";
$(document).ready(function () {
    sideNavSetup();
    clock();
    employeeTblWithSorting();
    CalculatorStart();
});
function sideNavSetup() {
    var toggleSideNavBtns = $(".toggle-side-nav-btn");
    var displaySections = $(".display-section");
    var sideNavBar = $("#sideNav");
    var openNav = false;
    toggleSideNavBtns.click(function () {
        openNav = !openNav;
        if (openNav) {
            sideNavBar.css("width", "250px");
        }
        else {
            sideNavBar.css("width", "0px");
        }
    });
    displaySections.each(function (i, element) {
        var section = $(element);
        var sectionName = section.data("sectionName");
        var newATag = $("<a href='#section" + i + "'></a>");
        section.attr('id', "section" + i);
        newATag.click(function () {
            var _a;
            $('html,body').animate({ scrollTop: (_a = section.offset()) === null || _a === void 0 ? void 0 : _a.top }, 'slow');
        });
        if (sectionName != undefined) {
            newATag.text("" + sectionName);
        }
        else {
            newATag.text("section " + (i + 1));
        }
        sideNavBar.append(newATag);
    });
}
// ----------------------- Time! 24Hour Clock, Analog Clock and Background Clock?  -----------------------------------
// Js clock, 24Hour clock, analog clock and a image based clock(bg-image is scrolling based on time)
function clock() {
    var clockDesc = $("#clockDescription");
    var clockTypeDigitalTxt = $("#digitalClockText");
    var digitalClockContainer = $("#digitalClockContainer");
    var analogClockContainer = $("#analogClockContainer");
    var toggleClockTypeBtn = $("#toggleClockTypeBtn");
    var clockBg = $("#clockBG");
    var secHand = $("#clockHandSec");
    var minHand = $("#clockHandMin");
    var hourHand = $("#clockHandHour");
    var onReadyDate = new Date();
    // the degrees a hand moves per second
    var anglePerTickSecHand = 360 / 60;
    var anglePerTickMinHand = (360 / 60) / 60;
    var anglePerTickHourHand = ((360 / 12) / 60) / 60;
    var secInHour = 3600;
    var secInDay = 86400;
    var bgWidth = 3072;
    var scale = 28.125;
    var tempImg = new Image();
    tempImg.src = clockBg.css("background-image").replace(/"/g, "").replace(/url\(|\)$/ig, "");
    tempImg.onload = function () {
        bgWidth = tempImg.width;
        scale = secInDay / bgWidth;
    };
    //const bgWidth = tempImg.width;
    //const scale = secInDay / 3072;
    var currentMinInSec = onReadyDate.getMinutes() * 60 + onReadyDate.getSeconds();
    var currentHourInSec = (onReadyDate.getHours() * 60) * 60 + currentMinInSec;
    clockBg.css("background-position-x", (currentHourInSec / scale) * -1);
    // Toggle clock type button
    toggleClockTypeBtn.click(function () {
        analogClockContainer.toggle();
        digitalClockContainer.toggle();
        if (analogClockContainer.is(":hidden")) {
            toggleClockTypeBtn.text("Analog Clock");
        }
        else {
            toggleClockTypeBtn.text("24 hour Clock");
        }
    });
    function onTick() {
        var sec = new Date().getSeconds();
        var min = new Date().getMinutes();
        var hour = new Date().getHours();
        // we get the time in single digit values so we need to append a 0 to make in look like 01 instead of 1
        var secString = sec < 10 ? "0" + sec : sec;
        var minString = min < 10 ? "0" + min : min;
        var hourString = hour < 10 ? "0" + hour : hour;
        clockTypeDigitalTxt.text("[" + hourString + ":" + minString + ":" + secString + "]");
        secHand.css({
            '-webkit-transform': 'rotate(' + sec * anglePerTickSecHand + 'deg)',
            '-moz-transform': 'rotate(' + sec * anglePerTickSecHand + 'deg)',
            '-ms-transform': 'rotate(' + sec * anglePerTickSecHand + 'deg)',
            'transform': 'rotate(' + sec * anglePerTickSecHand + 'deg)'
        });
        minHand.css({
            '-webkit-transform': 'rotate(' + currentMinInSec * anglePerTickMinHand + 'deg)',
            '-moz-transform': 'rotate(' + currentMinInSec * anglePerTickMinHand + 'deg)',
            '-ms-transform': 'rotate(' + currentMinInSec * anglePerTickMinHand + 'deg)',
            'transform': 'rotate(' + currentMinInSec * anglePerTickMinHand + 'deg)'
        });
        hourHand.css({
            '-webkit-transform': 'rotate(' + currentHourInSec * anglePerTickHourHand + 'deg)',
            '-moz-transform': 'rotate(' + currentHourInSec * anglePerTickHourHand + 'deg)',
            '-ms-transform': 'rotate(' + currentHourInSec * anglePerTickHourHand + 'deg)',
            'transform': 'rotate(' + currentHourInSec * anglePerTickHourHand + 'deg)'
        });
        // The art doesn't align as well as i want, but it demonstrates the purpose. the Bg is synced with the time
        clockBg.css("background-position-x", (currentHourInSec / scale) * -1);
        currentMinInSec++;
        currentHourInSec++;
        if (currentMinInSec >= secInHour) {
            currentMinInSec = 0;
        }
        if (currentHourInSec >= secInDay) {
            currentHourInSec = 0;
        }
    }
    setInterval(onTick, 1000);
}
// ----------------------- Sorting Data in a Table | A lot of plugins for this .... -----------------------------------
function employeeTblWithSorting() {
    var Employee = /** @class */ (function () {
        function Employee(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }
        Employee.prototype.getRole = function () {
            return "user";
        };
        Employee.prototype.getFullName = function () {
            return this.firstName + " " + this.lastName;
        };
        return Employee;
    }());
    var employees = [
        new Employee("Bob", "Amon", 53),
        new Employee("Dane", "Childe", 23),
        new Employee("Erick", "Bower", 31),
        new Employee("Cena", "Dick", 40),
        new Employee("Andrew", "Edd", 40)
    ];
    var empTbl = $("#employeeTbl tbody");
    function mapArryToTbl(employeesList) {
        var tblRowString = "";
        employeesList.forEach(function (employee) {
            tblRowString += "<tr><td>" + employee.firstName + "</td>\n            <td>" + employee.lastName + "</td><td>" + employee.age + "</td></tr>";
        });
        // empTbl.replaceWith("<tbody>" + tblRowString + "</tbody>")
        empTbl.html(tblRowString);
    }
    (function sortingTableArraySort() {
        var sortByFirstNameBtn = $("#sortByFirstNameBtn");
        var sortByLastNameBtn = $("#sortByLastNameBtn");
        var sortByAge = $("#sortByAge");
        var sortFirstNameAscending = true;
        var sortLastNameAscending = true;
        var sortAgeAscending = true;
        sortByFirstNameBtn.click(function () {
            var sortedList = employees.sort(function (a, b) {
                var firstNameA = a.firstName.toUpperCase();
                var firstNameB = b.firstName.toUpperCase();
                if (sortFirstNameAscending) {
                    if (firstNameA < firstNameB) {
                        return -1;
                    }
                    if (firstNameA > firstNameB) {
                        return 1;
                    }
                }
                else {
                    if (firstNameA > firstNameB) {
                        return -1;
                    }
                    if (firstNameA < firstNameB) {
                        return 1;
                    }
                }
                return 0;
            });
            sortFirstNameAscending = !sortFirstNameAscending;
            mapArryToTbl(sortedList);
        });
        sortByLastNameBtn.click(function () {
            var sortedList = employees.sort(function (a, b) {
                var lastNameA = a.lastName.toUpperCase();
                var lastNameB = b.lastName.toUpperCase();
                if (sortLastNameAscending) {
                    if (lastNameA < lastNameB) {
                        return -1;
                    }
                    if (lastNameA > lastNameB) {
                        return 1;
                    }
                }
                else {
                    if (lastNameA > lastNameB) {
                        return -1;
                    }
                    if (lastNameA < lastNameB) {
                        return 1;
                    }
                }
                return 0;
            });
            sortLastNameAscending = !sortLastNameAscending;
            mapArryToTbl(sortedList);
        });
        sortByAge.click(function () {
            var sortedList = employees.sort(function (a, b) {
                if (sortAgeAscending) {
                    return a.age - b.age;
                }
                else {
                    return b.age - a.age;
                }
            });
            sortAgeAscending = !sortAgeAscending;
            mapArryToTbl(sortedList);
        });
        mapArryToTbl(employees);
    })();
    (function sortTableManual() {
        var tblBody = $("#employeeTbl tbody");
        var sortByFirstNameBtn = $("#sortManualByFirstNameBtn");
        var sortByLastNameBtn = $("#sortManualByLastNameBtn");
        var sortByAge = $("#sortManualByAge");
        sortByFirstNameBtn.click(function () {
            sort(0, "string");
        });
        sortByLastNameBtn.click(function () {
            sort(1, "string");
        });
        sortByAge.click(function () {
            sort(2, "number");
        });
        // this is a W3S implementation adjusted with JQ
        function sort(n, type) {
            var i;
            var rows = tblBody.children().length;
            var x;
            var y;
            var switching = true;
            var shouldSwitch = false;
            var switchCount = 0;
            var dir = "asc";
            while (switching) {
                switching = false;
                for (i = 0; i < rows - 1; i++) {
                    shouldSwitch = false;
                    x = tblBody.children().eq(i).children().eq(n);
                    y = tblBody.children().eq(i + 1).children().eq(n);
                    if (dir === "asc") {
                        if (type === "number") {
                            if (Number(x[0].innerHTML) > Number(y[0].innerHTML)) {
                                shouldSwitch = true;
                                break;
                            }
                        }
                        else {
                            if (x[0].innerHTML.toLowerCase() > y[0].innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                                break;
                            }
                        }
                    }
                    else if (dir === "desc") {
                        if (type === "number") {
                            if (Number(x[0].innerHTML) < Number(y[0].innerHTML)) {
                                shouldSwitch = true;
                                break;
                            }
                        }
                        else {
                            if (x[0].innerHTML.toLowerCase() < y[0].innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                                break;
                            }
                        }
                    }
                }
                if (shouldSwitch) {
                    tblBody.children().eq(i + 1).insertBefore(tblBody.children().eq(i));
                    switching = true;
                    switchCount++;
                }
                else {
                    if (switchCount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }
    })();
}
// Gonna do this without JQuery
function CalculatorStart() {
    // Gonna leave this as an example
    var mainDisplay = document.querySelector("#calcDisplayText");
    var backDisplayText = document.querySelector("#calcBackDisplayText");
    // Its a good practice to use data attributes, makes it more clear that its being used in a script, rather then a class or id   
    var clearAllBtn = document.querySelector("[data-clear]");
    var backSpaceBtn = document.querySelector("[data-backspace]");
    var equalsBtn = document.querySelector("[data-equals]");
    var numBtns = document.querySelectorAll("[data-num]");
    var operationBtns = document.querySelectorAll("[data-operation]");
    var operation = "";
    var currentText = "";
    var lastText = "";
    var startNewCalculation = false;
    // instantly call function, gives a description on what is happening
    (function onClickNumBtnsSetup() {
        var _loop_1 = function (i) {
            var element = numBtns[i];
            element.addEventListener("click", function () {
                appendValue(element.textContent);
            });
        };
        for (var i = 0; i < numBtns.length; i++) {
            _loop_1(i);
        }
    })();
    (function onClickOperationBtnsSetup() {
        var _loop_2 = function (i) {
            var element = operationBtns[i];
            element.addEventListener("click", function () {
                setOperation(element.textContent);
            });
        };
        for (var i = 0; i < operationBtns.length; i++) {
            _loop_2(i);
        }
    })();
    (function onClickBackSpaceSetup() {
        backSpaceBtn.addEventListener("click", function () {
            backSpace();
        });
    })();
    (function onClickClearAllSetup() {
        clearAllBtn.addEventListener("click", function () {
            clearAll();
        });
    })();
    (function onClickEqualsBtnSetUp() {
        equalsBtn.addEventListener("click", function () {
            calculate();
        });
    })();
    function updateAllDisplays() {
        mainDisplay.textContent = currentText;
        if (operation != "") {
            backDisplayText.textContent = lastText + " " + operation;
        }
        else {
            backDisplayText.textContent = "";
        }
    }
    function clearAll() {
        currentText = "";
        lastText = "";
        operation = "";
        updateAllDisplays();
    }
    function backSpace() {
        currentText = currentText.slice(0, -1);
        updateAllDisplays();
    }
    function appendValue(text) {
        if (text === "." && currentText.includes(".")) {
            return;
        }
        if (startNewCalculation === true) {
            currentText = "";
            updateAllDisplays();
            startNewCalculation = false;
        }
        currentText += text;
        updateAllDisplays();
    }
    function setOperation(operationSymbol) {
        if (currentText === "") {
            return;
        }
        if (lastText !== "") {
            console.log("CALC");
            calculate();
        }
        console.log("UP");
        operation = operationSymbol;
        lastText = currentText;
        currentText = "";
        updateAllDisplays();
    }
    function calculate() {
        var sum;
        var prev = parseFloat(lastText);
        var current = parseFloat(currentText);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (operation) {
            case "+":
                sum = prev + current;
                break;
            case "-":
                sum = prev - current;
                break;
            case "*":
                sum = prev * current;
                break;
            case "/":
                sum = prev / current;
                break;
            default:
                return;
        }
        currentText = sum.toString();
        lastText = "";
        operation = "";
        startNewCalculation = true;
        updateAllDisplays();
    }
}
