/* Required DOM Elements */

/* Form text inputs */
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

/* Error text elements */
const dayError = document.getElementById("dayerror");
const monthError = document.getElementById("montherror");
const yearError = document.getElementById("yearerror");

/* Submit button */
const fireButton = document.getElementById("firebutton");

/* Output text */
const outputYears = document.getElementById("output--years");
const outputMonths = document.getElementById("output--months");
const outputDays = document.getElementById("output--days");

/* Error text to render */
const displayDayError = "Must be a valid day";
const displayMonthError = "Must be a valid month";
const displayYearError = "Must be in the past";
const emptyField = "This field is required";
const nonNumeric = "Must be a numeric value";

/* Current date values & months array (will change if there is a leap year) */
const currentDate = new Date();
const currentDay = parseInt(String(currentDate.getDate()));
const currentMonth = parseInt(String(currentDate.getMonth() + 1));
const currentYear = currentDate.getFullYear();
let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/* Functional Components */

fireButton.addEventListener("click", (e) => {
  e.preventDefault();
  /* User-entered values*/
  const userYear = year.value;
  const userMonth = month.value;
  const userDay = day.value;

  // Check for empty values
  validate(userDay, dayError);
  validate(userMonth, monthError);
  validate(userYear, yearError);

  // Check for field-specific conditions
  if (userYear && userYear > currentYear) {
    yearError.textContent = displayYearError;
  } else if (userYear && userYear <= 0) {
    yearError.textContent = "Must be greater than zero";
  }

  if ((userDay && userDay < 1) || userDay > 31) {
    dayError.textContent = displayDayError;
  }

  if ((userMonth && userMonth < 1) || userMonth > 12) {
    monthError.textContent = displayMonthError;
  }

  // Must pass ALL input conditions to call calculation function
  if (
    !isNaN(userDay) &&
    userDay >= 1 &&
    userDay <= 31 &&
    !isNaN(userMonth) &&
    userMonth >= 1 &&
    userMonth <= 12 &&
    !isNaN(userYear) &&
    userYear <= currentYear
  ) {
    calculateAge(
      userDay,
      userMonth,
      userYear,
      currentDay,
      currentMonth,
      currentYear
    );
  }

  resetInput(day, dayError);
  resetInput(month, monthError);
  resetInput(year, yearError);
});

// empty values function
function validate(itemToCheck, insertionNode) {
  if (itemToCheck.trim() === "" || itemToCheck === undefined) {
    insertionNode.textContent = emptyField;
  } else if (isNaN(itemToCheck)) {
    insertionNode.textContent = nonNumeric;
  }
}

// reset error messages & clear fields on click
function resetInput(itemToReset, deletionNode) {
  itemToReset.addEventListener("click", (e) => {
    itemToReset.value = "";
    deletionNode.textContent = "";
  });
}

// function that calculates age, displays output to screen
function calculateAge(day, month, year, todaysDay, todaysMonth, todaysYear) {
  console.log(typeof todaysDay);
  console.log(typeof currentYear);
  // checks for leap year (thank you StackOverflow!)
  if ((year & 3) == 0 && (year % 25 != 0 || (year & 15) == 0)) {
    daysInMonths[1] = 29;
  }

  if (day > todaysDay) {
    todaysDay += daysInMonths[month - 1];
    todaysMonth -= 1;
  }

  if (month > todaysMonth) {
    todaysYear -= 1;
    todaysMonth += 12;
  }

  let finalDay = todaysDay - day;
  let finalMonth = todaysMonth - month;
  let finalYear = todaysYear - year;

  outputYears.textContent = finalYear;
  outputMonths.textContent = finalMonth;
  outputDays.textContent = finalDay;
}
