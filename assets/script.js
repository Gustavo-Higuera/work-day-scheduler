// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
var dayEl = $("#currentDay");

var btnEl = $(".save-btn");

function getDate() {
  setInterval(() => {
    $(dayEl).text(moment().format("MMMM Do, YYYY hh:mm:ssa"));
  }, 0);

}

function checkTimeBlock() {
  // this is setting the current time to just the day and hour it currently is, this is setting the minute second and ms to 0
  var currentTime = moment().set({
    "minute": "0",
    "second": "0",
    "millisecond": "0"
  });

  console.log(currentTime);

  // each row class in the html will be targeted by this each function
  $(".row").each(function () {
    // "this" is referring to the .row class, and it is targeting the child w/ class .hour, and pulling the text from it
    var timeBlockText = $(this).children(".hour").text();
    console.log(timeBlockText);

    // the text that was saved into timeBlockText is being converted into a moment object and is given the moment format of hA
    var timeBlock = moment(timeBlockText, "hA");
    console.log(timeBlock);

    // WHEN I scroll down
    // THEN I am presented with time blocks for standard business hours
    // WHEN I view the time blocks for that day
    // THEN each time block is color-coded to indicate whether it is in the past, present, or future

    if (timeBlock.isBefore(currentTime)) {
      $(this).children(".timeblock").addClass("past");
    } else if (timeBlock.isAfter(currentTime)) {
      $(this).children(".timeblock").addClass("future");
    } else {
      $(this).children(".timeblock").addClass("present");
    }
  })
}

function getStorage() {
  //Looping through each one of timeBlock textarea
  $(".timeblock").each(function () {
    //selecteing the Id for that textarea that' we're looping through
    var textId = $(this).attr("id");
    //Selecting the text value from local storage, using the velue text id that we got above
    var textValue = localStorage.getItem(textId)
    //display the text Value on each one of the text area
    $(this).val(textValue)
  })
}

btnEl.on("click", function () {
  var textValue = $(this).siblings(".timeblock").val();
  console.log(textValue);
  var textId = $(this).siblings(".timeblock").attr("id");
  localStorage.setItem(textId, textValue)
})


// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

getStorage();
getDate();
checkTimeBlock();
