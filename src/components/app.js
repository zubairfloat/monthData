import data from './datafile'
var yearsArray = Object.keys(data)
var result = []
var viewType = 'Month'
debugger
for (var i = 0; i < yearsArray.length; i++) {
  // Years loop
  let year = parseInt(yearsArray[i])
  let withDrawTotal = 0

  var monthsArray = Object.keys(jsonData[year])

  for (var k = 0; k < monthsArray.length; k++) {
    // Months loop
    let month = monthsArray[k]
    withDrawTotal = 0

    if (jsonData[year][month] != null) {
      for (l = 0; l < Object.keys(jsonData[year][month]).length; l++) {
        // Days loop
        if (
          jsonData[year][month][l] != null &&
          jsonData[year][month][l] != undefined
        ) {
          withDrawTotal += jsonData[year][month][l].duals_earn
        }
      }
      if (viewType !== 'Year') {
        var Earning = {
          year,
          type: 'Earning',
          month,
          count: withDrawTotal,
        }

        result.push(Earning)
      }
    }
  }

  if (viewType === 'Year') {
    var Earning = {
      year,
      type: 'Earning',
      count: withDrawTotal,
    }

    result.push(Earning)
  }
}

console.log(result.reverse((x) => x.year))
