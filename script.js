function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
  
    return reversedStr;
  }
  
  function isPalindrome(str){
    var reverse = reverseStr(str);
    return reverse === str;
  }
  
  function convertDateToStr(date){
    var dateStr = { day : '', month : '', year : ''};
  
    if(date.day < 10){
      dateStr.day = '0' + date.day; //adding string to number converts whole thing to string
    }
    else{
      dateStr.day = date.day.toString();
    }
    if(date.month < 10){
      dateStr.month = '0' + date.month;
    }
    else{
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfAllDateFormats = getAllDateFormats(date);
    var flag = false;
    for(i = 0; i < listOfAllDateFormats.length; i++){
      if(isPalindrome(listOfAllDateFormats[i])){
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(month === 2){
      if(isLeapYear(year)){
        if(day > 29){
          day = 1;
          month++;
        }
      }
      else{
        if(day > 28){
          day = 1;
          month++;
        }
      }
    }
    else{
      if(day > daysInMonth[month - 1]){
        day = 1;
        month++;
      }
    }
  
    if(month > 12){
      month = 1;
      year++;
    }
  
    return {
      day : day,
      month : month,
      year : year
    };
  }
  
  function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      counter++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
  }
  
  function getPreviousDate(date){
    day = date.day - 1;
    month = date.month;
    year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(day === 0){
      month--;
      if(month === 0){
        day = 31;
        month = 12;
        year--;
      }
      else if(month === 2){
        if(isLeapYear(year)){
          day = 29;
        }
        else{
          day = 28;
        }
      }
      else{
        day = daysInMonth[month - 1];
      }
    }
    return {
      day : day,
      month : month,
      year : year
    };
  }
  
  function getPreviousPalindromeDate(date){
    var counter = 0;
    var previousDate = getPreviousDate(date);
  
    while(1){
      counter++;
      var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
      if(isPalindrome){
        break;
      }
      previousDate = getPreviousDate(previousDate);
    }
    return [counter, previousDate];
  }
  
  var bdayInput = document.querySelector("#bday-input");
  var checkButton = document.querySelector("#check-button");
  var resultMessage = document.querySelector("#result");
  
  function clickHandler(){
    var bday = bdayInput.value;
    if(bday !== ''){
      var listOfDate = bday.split('-');
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      }
    }
    var isPalindrome = checkPalindromeForAllDateFormats(date);
    if(isPalindrome){
      resultMessage.innerText = "Yay! Your birthday is a palindrome!! 🥳"
    }
    else{
      var [counter1, nextDate] = getNextPalindromeDate(date);
      var [counter2, previousDate] = getPreviousPalindromeDate(date);
      if(counter1 < counter2){
        resultMessage.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter1} days! 😔`
      }
      else{
        resultMessage.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${counter2} days! 😔`
      }
    }
  }
  
  checkButton.addEventListener('click', clickHandler);