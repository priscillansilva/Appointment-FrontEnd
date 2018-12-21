import React, { Component, Fragment } from 'react'
import { Select, FormAlert, Input } from '../components'
import { buildArray, formatDateToDefault } from '../libs/utils'
import { newAvailableDate } from '../requests'

class NewAvailableTime extends Component {
  constructor() {
    super()
    this.state = {
      formSent: false,
      message: '',
      stepDays: 0,
      success: false,
      startDay: '',
      startMonth: '',
      startYear: '',
      finalDay: '',
      finalMonth: '',
      finalYear: '',
      startHour: '',
      finishHour: '',
      step: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleSubmit(event, errors) {
    event.preventDefault()
    if (errors) {
      this.setState({
        formSent: true,
      })
      return
    }
    const startDate = {
      day: this.state.startDay,
      month: this.state.startMonth,
      year: this.state.startYear
    }
    const finalDate = {
      day: this.state.finalDay,
      month: this.state.finalMonth,
      year: this.state.finalYear
    }
    const bodyRequest = {
      startDate: formatDateToDefault(startDate, this.state.startHour),
      finalDate: formatDateToDefault(startDate, this.state.finishHour),
      daysStep: Number(this.state.daysStep),
      step: Number(this.state.step)
    } 
    console.log(bodyRequest)
    newAvailableDate(bodyRequest, (error) => {
      this.setState({
        formSent: true,
        message: error ? "Failed to send new date" : "Created successfully!",
        success: error ? false : true,
      })
    })
    return
  }


  onChange (e) {
      const name = e.target.id
      console.log(e.target.id)
      this.setState({
          [name]: e.target.value,
      })
  }

  render() {
    const days = buildArray(31)
    const months = buildArray(12)
    const years = buildArray(2021, 2018)
    const steps = [10, 20, 30]
    return (
      <Fragment>
        { this.state.formSent && (
          <FormAlert
            success={this.state.success}
            message={this.state.message}
          />
        )}
        <form id="dateform" onSubmit={this.handleSubmit}>
        <p className="font-weight-bold">From</p>
        <div className="form-row">
          <Select
            labelName="Day"
            selectId="startDay"
            formId="dateform"
            selectName="days"
            values={days}
            onChange={this.onChange}
          />
          <Select
            labelName="Month"
            selectId="startMonth"
            formId="dateform"
            selectName="months"
            values={months}
            onChange={this.onChange}
          />
          <Select
            labelName="Year"
            selectId="startYear"
            formId="dateform"
            selectName="years"
            values={years}
            onChange={this.onChange}
          />
        </div>
        <p className="font-weight-bold">To</p>
        <div className="form-row">
          <Select
            labelName="Day"
            selectId="finalDay"
            formId="dateform"
            selectName="days"
            values={days}
            onChange={this.onChange}
          />
          <Select
            labelName="Month"
            selectId="finalMonth"
            formId="dateform"
            selectName="months"
            values={months}
            onChange={this.onChange}
          />
          <Select
            labelName="Year"
            selectId="finalYear"
            formId="dateform"
            selectName="years"
            values={years}
            onChange={this.onChange}
          />
        </div>
        <p className="font-weight-bold">Repeat every:</p>
        <div className="form-group col-md-4">
            <select
              id="stepDays"
              className="form-control"
              onChange={this.onChange}
              name="stepDays"
              form="dateform"
            >
            <option value=""></option>
            <option value={7}>1 week</option>
            <option value={14}>2 weeks</option>
            </select>
        </div>
        <p className="font-weight-bold">Time</p>
        <div className="form-row">
          <Input
            mask="99:00"
            labelFor="startHour"
            labelName="Start at"
            onChange={this.onChange}
            inputType="text"
          />
          <Input
            mask="99:00"
            labelFor="finishHour"
            labelName="Finish at"
            onChange={this.onChange}
            inputType="text"
          />
          <Select
            labelName="Interval (minutes)"
            selectId="step"
            formId="dateform"
            selectName="setps"
            values={steps}
            onChange={this.onChange}
          />
        </div>
          <input type="submit" className="btn btn-success" value="Submit" />
      </form>
      </Fragment>
    );
  }
}

export default NewAvailableTime
