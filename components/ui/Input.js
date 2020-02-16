import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { InputAdornment } from '@material-ui/core';

import validators from '../../util/validators';

const Wrapper = styled.div`${({ theme: {dp, ...theme}, ...props }) => css`
  margin: ${dp(5)} 0 ${dp(15)};
`}`;

const HelperText = styled.span`${({ theme: {dp, ...theme}, ...props }) => css`
  display: grid;
  grid-template-columns: 1fr auto;
`}`;

const Input = ({
  id,
  label,
  value,
  setter,
  errors: parentErrors,
  validations,
  kind,
  onBlur,
  onFocus,
  onKeyPress,
  serverError,
  helperText,
  subLabel,
  className,
  helperAdornment,
}) => {

  const [errors, setErrors] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setErrors([]);
    if(hasChanged) {
      validate(value);
    }
  }, [value]);

  function validate(newValue) {

    if (!validations) return;

    const errors = validations.map(validation => {
      if (typeof validation === "function")
        return validation(newValue);
      
      return validators[validation](newValue);
    }).filter(e => !!e);

    // Set errors locally (at input level):
    setErrors(errors);

    if (errors.length > 0 && parentErrors) {
      // Set errors on parent errors object (at form level):
      parentErrors.setErrors({
        ...parentErrors.errors,
        [label]: errors,
      });
    } else if (errors.length === 0 && parentErrors && parentErrors.errors[label]) {
      // Unset errors on parent errors object (at form level):
      let updatedErrors = Object.assign({}, parentErrors.errors);
      delete updatedErrors[label];
      parentErrors.setErrors(updatedErrors);
    }
  }

  // Proxy MUI Props:
  const muiProps = {};
  if (kind === `textarea`) {
    muiProps.multiline = true;
    muiProps.rows = 4;
    muiProps.rowsMax = 4;
  }

  // If no local errors, check & show server errors:
  if (errors.length === 0 && serverError) {
    errors.push(serverError);
  }

  return (
    <Wrapper className={className}>
      <TextField
        id={id}
        label={label}
        value={value}
        variant="outlined"
        onChange={e => {
          setHasChanged(true);
          setter(e.target.value);
        }}
        onKeyPress={onKeyPress}
        error={errors.length > 0}
        helperText={<HelperText><span>{errors[0] || helperText || null}</span>{helperAdornment}</HelperText>}
        required={validations && validations.includes(`required`)}
        fullWidth={true}
        onBlur={() => {
          onBlur(!errors.length, hasChanged);
          setHasChanged(false);
        }}
        onFocus={onFocus}
        {...muiProps}
        InputProps={subLabel && {
          endAdornment: <InputAdornment position="end">{subLabel}</InputAdornment>,
        }}
      />
    </Wrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setter: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
  }),
  validations: PropTypes.array,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  kind: PropTypes.oneOf([`textarea`, `select`]),
  serverError: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,

  // Addition to the helper text that's displayed at the end
  helperAdornment: PropTypes.string,
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Input.defaultProps = {
  value: undefined,
  defaultValue: null,
  validations: [],
  kind: null,
  onBlur: () => {},
  onFocus: null,
  errors: null,
  serverError: null,
  helperText: null,
  subLabel: null,
  className: null,
  helperAdornment: null,
};

export default Input;