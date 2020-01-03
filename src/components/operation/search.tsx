import React, { useEffect, useState } from 'react';
import { useStyles } from './search_style';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export function Search(props: any) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleStartDateChange = (date: any) => {
      setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
      setEndDate(date);
  };
  const classes = useStyles();
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-from'
          label='Balance from'
          value={startDate}
          name='startDate'
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}/>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          id='date-picker-on'
          label='Balance on'
          value={endDate}
          name='endDate'
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}/>
      </MuiPickersUtilsProvider>
      <Button
        disabled={startDate > endDate}
        className={classes.button}
        variant='contained' color='primary' id='search_balance_btn' type='submit' onClick={(event) => props.handleSearch(event, startDate, endDate)}>
                        Search
      </Button>
    </div>
  );
}
