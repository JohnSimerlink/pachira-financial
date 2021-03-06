import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setGrowthAssumptions } from '../../actions'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Snacker from '../commons/Snacker'

import { AVERAGE_INFLATION_RATE, AGGRESSIVE_RATE_OF_RETURN, MODERATE_RATE_OF_RETURN, CONSERVATIVE_RATE_OF_RETURN } from '../../utils/config-state'
import { toRatePercentage } from '../../utils/formatting-tools'


class GrowthAssumptions extends Component {

  constructor(props){
    super(props)
    this.state={
      inflation: AVERAGE_INFLATION_RATE,
      growthStep1: AGGRESSIVE_RATE_OF_RETURN,
      growthStep2: MODERATE_RATE_OF_RETURN,
      growthStep3: CONSERVATIVE_RATE_OF_RETURN
    }
  }

  componentWillMount() {
    if (this.props.growthAssumptions) {
      this.setState(this.props.growthAssumptions)
    }
  }

  setGrowthAssumptions() {
    // make sure state is a Number (using RegEx formatting could make value a string)
    let data = this.state
    data.inflation = Number(data.inflation)
    data.growthStep1 = Number(data.growthStep1)
    data.growthStep2 = Number(data.growthStep2)
    data.growthStep3 = Number(data.growthStep3)
    // send component's state to server and set Redux store.
    this.props.setGrowthAssumptions(this.state)
  }


  render(){

    // initialize message from snackbox that renders at the bottom on the screen when helper is clicked.
    const snackerMessage = 'Time Horizon is the years before retirement. As you get closer to retirement, it is often recommended to invest more conservatively, which tend to yield lower returns'

    return (

      <Grid className="" container spacing={0} style={{padding: 1}}>

        <Grid item xs={12} sm={9} lg={6} xl={6}>
          <Paper className="">
            <Toolbar className="card-header">
              <Typography className='flex' variant="title" color="inherit">
                Growth Assumptions
              </Typography>
              <Snacker message={snackerMessage}/>
            </Toolbar>

            <TextField
              value={this.state.inflation>20.999 ? 20 : this.state.inflation}
              color="secondary"
              id="textarea"
              label="Expected Inflation"
              className='textField-short'
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = toRatePercentage(e.target.value)
                this.setState({inflation: (value)})
              }}
            />

            <TextField
              value={this.state.growthStep1>100 ? 100 : this.state.growthStep1}
              color="secondary"
              id="textarea"
              label="Expected Growth 1"
              className='textField-short'
              margin="normal"
              helperText="time horizon > 10 years"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = toRatePercentage(e.target.value)
                this.setState({growthStep1: (value)})
              }}
            />

            <TextField
              value={this.state.growthStep2>100 ? 100 : this.state.growthStep2}
              color="secondary"
              id="textarea"
              label="Expected Growth 2"
              className='textField-short'
              margin="normal"
              helperText= 'time horizon < 10 yrs'
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = toRatePercentage(e.target.value)
                this.setState({growthStep2: (value)})
              }}
            />

            <TextField
              value={this.state.growthStep3>100 ? 100 : this.state.growthStep3}
              color="secondary"
              id="textarea"
              label="Expected Growth 3"
              className='textField-short'
              margin="normal"
              helperText="in retirement"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              onChange={(e)=>{
                e.preventDefault()
                let value = toRatePercentage(e.target.value)
                this.setState({growthStep3: (value)})
              }}
            />

          </Paper>
          <div className="my-1">
            <Button
              onClick={this.props.handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e)=>{
                e.preventDefault()
                this.setGrowthAssumptions()
                this.props.handleNext()
              }}
            >
              Next
            </Button>
          </div>
        </Grid>
      </Grid>

    );
  }


}

function mapStateToProps({ growthAssumptions }) {
  return { growthAssumptions }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setGrowthAssumptions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowthAssumptions);
