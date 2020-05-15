$(document).ready(() => {

    sideNavSetup();
    clock();
    employeeTblWithSorting();
    CalculatorStart();
});


function sideNavSetup() {
    let toggleSideNavBtns = $(".toggle-side-nav-btn");
    let displaySections = $(".display-section");
    let sideNavBar = $("#sideNav");
    let openNav = false;

    toggleSideNavBtns.click(() => {
        openNav = !openNav;
        if (openNav) {
            sideNavBar.css("width", "250px");
        } else {
            sideNavBar.css("width", "0px");
        }
    });

    displaySections.each((i, element) => {
        let section = $(element);

        let sectionName = section.data("sectionName");
        let newATag = $(`<a href='#section${i}'></a>`);

        section.attr('id', `section${i}`);
        newATag.click(() => {
            $('html,body').animate({ scrollTop: section.offset()?.top }, 'slow');
        });

        if (sectionName != undefined) {
            newATag.text(`${sectionName}`);
        } else {
            newATag.text(`section ${i + 1}`);
        }
        sideNavBar.append(newATag);

    });
}


// ----------------------- Time! 24Hour Clock, Analog Clock and Background Clock?  -----------------------------------

// Js clock, 24Hour clock, analog clock and a image based clock(bg-image is scrolling based on time)
function clock() {
    const clockDesc = $("#clockDescription");
    const clockTypeDigitalTxt = $("#digitalClockText");
    const digitalClockContainer = $("#digitalClockContainer");
    const analogClockContainer = $("#analogClockContainer");
    const toggleClockTypeBtn = $("#toggleClockTypeBtn");
    const clockBg = $("#clockBG");

    const secHand = $("#clockHandSec");
    const minHand = $("#clockHandMin");
    const hourHand = $("#clockHandHour");

    const onReadyDate = new Date();

    // the degrees a hand moves per second
    const anglePerTickSecHand = 360 / 60;
    const anglePerTickMinHand = (360 / 60) / 60;
    const anglePerTickHourHand = ((360 / 12) / 60) / 60;

    const secInHour = 3600;
    const secInDay = 86400;

    let bgWidth = 3072;
    let scale = 28.125;

    var tempImg = new Image();
    tempImg.src = clockBg.css("background-image").replace(/"/g, "").replace(/url\(|\)$/ig, "");
    tempImg.onload = function () {
        bgWidth = tempImg.width;
        scale = secInDay / bgWidth;
    }

    //const bgWidth = tempImg.width;
    //const scale = secInDay / 3072;

    let currentMinInSec = onReadyDate.getMinutes() * 60 + onReadyDate.getSeconds();
    let currentHourInSec = (onReadyDate.getHours() * 60) * 60 + currentMinInSec;
    clockBg.css("background-position-x", (currentHourInSec / scale) * -1);

    // Toggle clock type button
    toggleClockTypeBtn.click(() => {
        analogClockContainer.toggle();
        digitalClockContainer.toggle();

        if (analogClockContainer.is(":hidden")) {
            toggleClockTypeBtn.text("Analog Clock");
        } else {
            toggleClockTypeBtn.text("24 hour Clock");
        }

    });

    function onTick() {

        let sec = new Date().getSeconds();
        let min = new Date().getMinutes();
        let hour = new Date().getHours();

        // we get the time in single digit values so we need to append a 0 to make in look like 01 instead of 1
        let secString = sec < 10 ? "0" + sec : sec;
        let minString = min < 10 ? "0" + min : min;
        let hourString = hour < 10 ? "0" + hour : hour;

        clockTypeDigitalTxt.text(`[${hourString}:${minString}:${secString}]`);


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

    class Employee {
        firstName: string;
        lastName: string;
        age: number;

        constructor(firstName: string, lastName: string, age: number) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }

        getRole() {
            return "user";
        }

        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }


    let employees: Employee[] = [
        new Employee("Bob", "Amon", 53),
        new Employee("Dane", "Childe", 23),
        new Employee("Erick", "Bower", 31),
        new Employee("Cena", "Dick", 40),
        new Employee("Andrew", "Edd", 40)
    ];

    const empTbl = $("#employeeTbl tbody");

    function mapArryToTbl(employeesList: Employee[]) {
        let tblRowString = "";
        employeesList.forEach(employee => {
            tblRowString += `<tr><td>${employee.firstName}</td>
            <td>${employee.lastName}</td><td>${employee.age}</td></tr>`;
        });
        // empTbl.replaceWith("<tbody>" + tblRowString + "</tbody>")
        empTbl.html(tblRowString);
    }

    (function sortingTableArraySort() {

        const sortByFirstNameBtn = $("#sortByFirstNameBtn");
        const sortByLastNameBtn = $("#sortByLastNameBtn");
        const sortByAge = $("#sortByAge");

        let sortFirstNameAscending = true;
        let sortLastNameAscending = true;
        let sortAgeAscending = true;




        sortByFirstNameBtn.click(() => {
            let sortedList = employees.sort(function (a, b) {
                var firstNameA = a.firstName.toUpperCase();
                var firstNameB = b.firstName.toUpperCase();
                if (sortFirstNameAscending) {
                    if (firstNameA < firstNameB) {
                        return -1;
                    }
                    if (firstNameA > firstNameB) {
                        return 1;
                    }

                } else {
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


        sortByLastNameBtn.click(() => {
            let sortedList = employees.sort(function (a, b) {
                var lastNameA = a.lastName.toUpperCase();
                var lastNameB = b.lastName.toUpperCase();
                if (sortLastNameAscending) {
                    if (lastNameA < lastNameB) {
                        return -1;
                    }
                    if (lastNameA > lastNameB) {
                        return 1;
                    }

                } else {
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

        sortByAge.click(() => {
            let sortedList = employees.sort(function (a, b) {
                if (sortAgeAscending) {
                    return a.age - b.age;
                } else {
                    return b.age - a.age;
                }
            });
            sortAgeAscending = !sortAgeAscending;
            mapArryToTbl(sortedList);
        });

        mapArryToTbl(employees);
    })();

    (function sortTableManual() {

        let tblBody = $("#employeeTbl tbody");
        const sortByFirstNameBtn = $("#sortManualByFirstNameBtn");
        const sortByLastNameBtn = $("#sortManualByLastNameBtn");
        const sortByAge = $("#sortManualByAge");


        sortByFirstNameBtn.click(() => {
            sort(0, "string");
        });
        sortByLastNameBtn.click(() => {
            sort(1, "string");
        });

        sortByAge.click(() => {
            sort(2, "number");
        });

        // this is a W3S implementation adjusted with JQ
        function sort(n: number, type: string) {

            let i: number;
            let rows = tblBody.children().length;
            let x: JQuery<HTMLElement>;
            let y: JQuery<HTMLElement>;
            let switching = true;
            let shouldSwitch = false;
            let switchCount = 0;

            let dir = "asc";

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
                        } else {
                            if (x[0].innerHTML.toLowerCase() > y[0].innerHTML.toLowerCase()) {
                                shouldSwitch = true;
                                break;
                            }
                        }


                    } else if (dir === "desc") {

                        if (type === "number") {
                            if (Number(x[0].innerHTML) < Number(y[0].innerHTML)) {
                                shouldSwitch = true;
                                break;
                            }
                        } else {
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
                } else {

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
    const mainDisplay = document.querySelector("#calcDisplayText")!;
    const backDisplayText = document.querySelector("#calcBackDisplayText")!;

    // Its a good practice to use data attributes, makes it more clear that its being used in a script, rather then a class or id   
    const clearAllBtn = document.querySelector("[data-clear]")!;
    const backSpaceBtn = document.querySelector("[data-backspace]")!;
    const equalsBtn = document.querySelector("[data-equals]")!;

    const numBtns = document.querySelectorAll("[data-num]")!;
    const operationBtns = document.querySelectorAll("[data-operation]")!;

    let operation = "";
    let currentText = "";
    let lastText = "";
    let startNewCalculation = false;

    // instantly call function, gives a description on what is happening
    (function onClickNumBtnsSetup() {
        for (let i = 0; i < numBtns.length; i++) {
            const element = numBtns[i];
            element.addEventListener("click", () => {
                appendValue(element.textContent as string);
            });
        }
    })();

    (function onClickOperationBtnsSetup() {
        for (let i = 0; i < operationBtns.length; i++) {
            const element = operationBtns[i];
            element.addEventListener("click", () => {
                setOperation(element.textContent as string);
            });
        }
    })();

    (function onClickBackSpaceSetup() {
        backSpaceBtn.addEventListener("click", () => {
            backSpace();
        });
    })();

    (function onClickClearAllSetup() {
        clearAllBtn.addEventListener("click", () => {
            clearAll();
        });
    })();

    (function onClickEqualsBtnSetUp() {
        equalsBtn.addEventListener("click", () => {
            calculate();
        });
    })();

    function updateAllDisplays() {
        mainDisplay.textContent = currentText;
        if (operation != "") {
            backDisplayText.textContent = `${lastText} ${operation}`;
        } else {
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

    function appendValue(text: string) {
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

    function setOperation(operationSymbol: string) {
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
        let sum: number;
        const prev = parseFloat(lastText);
        const current = parseFloat(currentText);

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