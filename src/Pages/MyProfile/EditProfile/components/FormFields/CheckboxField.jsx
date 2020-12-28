import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';

export default function CheckboxField(props) {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
  const [touched, error] = at(meta, 'touched', 'error');
  let errorControl = touched && error;
  if (errorControl === undefined) errorControl = true;
  else if (errorControl === true) errorControl = false;
  else errorControl = true;
  function _renderHelperText() {
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest} error={errorControl}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
