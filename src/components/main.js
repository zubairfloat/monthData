import React, { useEffect, useState } from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import data from './datafile'
import './style.css'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Main = () => {
  const [dataArray, setDataArray] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { daily } = data.v1
  console.log(daily)
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const [yearsValue, setYearsValue] = useState(year)
  const [monthValue, setMonthValue] = useState(month)
  const [daysValues, setDaysValues] = useState()
  const [dateValue, setDateValue] = useState(date)

  useEffect(() => {
    const value = daily[yearsValue][monthValue]
    const pageData = page * limit
    const days = dateValue - pageData
    var keys = Object.keys(value)
    let newArray = []
    keys.forEach((data) => {
      if (data > days && data <= days + 10) {
        let arrayValue = value[data]
        arrayValue['date'] = data
        newArray.push(arrayValue)
      }
    })

    setDataArray(newArray)
  }, [])

  const handlePrev = () => {
    var value = daily[yearsValue][monthValue]
    let newDateValue = dateValue
    setPage(page + 1)
    let PageValue = page + 1
    if (daysValues <= 0) {
      setMonthValue(monthValue - 1)
      value = daily[yearsValue][monthValue - 1]
      setDateValue(value.length - 1)
      newDateValue = value.length - 1
      setPage(1)
      PageValue = 1
    }
    const pageData = PageValue * limit
    const days = newDateValue - pageData
    setDaysValues(days)
    var keys = Object.keys(value)
    keys.shift()
    let newArray = []
    keys.forEach((data) => {
      if (data > days && data <= days + 10) {
        let arrayValue = value[data]
        arrayValue['date'] = data
        newArray.push(arrayValue)
      }
    })
    setDataArray(newArray)
  }
  const handleNext = () => {
    let value = daily[yearsValue][monthValue]
    let newDateValue = dateValue
    setPage(page - 1)
    let PageValue = page - 1
    if ((daysValues >= 20 && value.length <= 31) || daysValues >= 21) {
      setMonthValue(monthValue + 1)
      value = daily[yearsValue][monthValue + 1]
      setDateValue(10)
      newDateValue = 10
      setPage(1)
      PageValue = 1
    }
    const pageData = PageValue * limit
    const days = newDateValue - pageData
    setDaysValues(days)
    var keys = Object.keys(value)
    keys.shift()
    let newArray = []
    keys.forEach((data) => {
      if (data > days && data <= days + 10) {
        let arrayValue = value[data]
        arrayValue['date'] = data
        newArray.push(arrayValue)
      }
    })
    setDataArray(newArray)
  }
  return (
    <div>
      <h2>
        {monthNames[monthValue - 1]} , {yearsValue}
      </h2>
      <div className="mainDiv3Rows">
        <div>
          <button onClick={handlePrev}>Prev</button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Call Cost</TableCell>
                  <TableCell>Call Duration</TableCell>
                  <TableCell>Call Completed</TableCell>
                  <TableCell>Call Faild</TableCell>
                  <TableCell>Cents Deposit</TableCell>
                  <TableCell>Cents WithDraws</TableCell>
                  <TableCell>Duals Earns</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataArray.map((row) => {
                  return (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.date} , {monthNames[monthValue - 1]} , {yearsValue}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.call_cost}
                      </TableCell>
                      <TableCell>{row.call_duration}</TableCell>
                      <TableCell>{row.call_nr_completed}</TableCell>
                      <TableCell>{row.call_nr_failed}</TableCell>
                      <TableCell>{row.cents_deposit}</TableCell>
                      <TableCell>{row.cents_withdraw}</TableCell>
                      <TableCell>{row.duals_earn}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          {dataArray.length !== 0 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  )
}

export default Main

// <div>
// {dataArray.length === 0 ? (
//   <h3>No data</h3>
// ) : (
//   dataArray.map((data) => {
//     const cost = data?.call_cost
//     const call = data?.call_nr_completed

//     return (
//       <div className="mainDivMap">
//         <p>{cost}</p>
//         <p>{call}</p>
//       </div>
//     )
//   })
// )}
// </div>
