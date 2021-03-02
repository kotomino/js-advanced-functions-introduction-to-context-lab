let createEmployeeRecord = function(array) {
  return { 
    firstName : array[0],
    familyName : array[1],
    title : array[2],
    payPerHour : array[3],
    timeInEvents : [],
    timeOutEvents : [],
  };
}

let createEmployeeRecords = function(employeeRecords) {
  return employeeRecords.map(function(row) {
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10)
  })
  return employeeRecord;
}

let createTimeOutEvent = function(employeeRecord, dateTime) {
  let [date, hour] = dateTime.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10)
  })
  return employeeRecord;
}

let hoursWorkedOnDate = function(employeeRecord, givenDate) {
  let inEvent = employeeRecord.timeInEvents.find(e => e.date === givenDate)
  let outEvent = employeeRecord.timeOutEvents.find(e => e.date === givenDate)

  return (outEvent.hour - inEvent.hour) / 100;
}

let wagesEarnedOnDate = function(employeeRecord, givenDate) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, givenDate) 
  let hourlyWage = employeeRecord.payPerHour;
  return hoursWorked * hourlyWage;
}

let allWagesFor = function(employeeRecord) {
  let eligibleDates = employeeRecord.timeInEvents.map(function(e) {
    return e.date;
  })

  let payable = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employeeRecord, d)
  }, 0)

  return payable;
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
