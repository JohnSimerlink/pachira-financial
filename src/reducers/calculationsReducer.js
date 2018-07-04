
import { SET_ASSUMPTIONS, SET_GROWTH_ASSUMPTIONS, SET_CURRENT_STATUS, SET_PENSIONS, SET_RENTALS, RESULTS_ID } from "../actions/types";
import { calculateFinancials, } from '../utils'

export default function(state = {}, action) {
  let newState = Object.assign({}, state)
    switch (action.type) {
        case SET_ASSUMPTIONS:

          newState.assumptions = action.payload

          return newState

        case SET_GROWTH_ASSUMPTIONS:

          newState.growthAssumptions = action.payload

          return newState

        case SET_CURRENT_STATUS:

          newState.currentStatus = action.payload

          //store yearly contributions
          newState.currentStatus.yearlyContributions = action.payload.contributions*12

          return newState

        case SET_PENSIONS:

          newState.pensions = action.payload

          // store yearly income from each pension
          for (let i=1; i<newState.pensions.pensionEntries+1; i++) {
            newState.pensions['pension'+i].yearlyIncome = newState.pensions['pension'+i].monthlyIncome*12
          }

          return newState

        case SET_RENTALS:

          newState.rentals = action.payload
          for (let i=1; i<newState.rentals.pensionEntries+1; i++) {
            newState.rentals['rental'+i].yearlyIncome = newState.rentals['rental'+i].monthlyIncome*12
          }

          let data = calculateFinancials(newState)

          newState.data = data

          let storingLocal = {data: data.data, data2: data.data2, pensionEntries: newState.pensions.pensionEntries, rentalEntries: newState.rentals.rentalEntries}

          localStorage.setItem(RESULTS_ID, JSON.stringify(storingLocal))

          return newState


      default:
        return state;
    }
  }