import isValidDate from 'date-fns/isValid'

const validators = {

  required: (value) => {
    if (!value || value.length <= 0) {
      return `Required`;
    }

    return false;
  },

  url: (value) => {
    // Allow blank field:
    if (value.length === 0) return false;

    // Validate url format:
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regexp = new RegExp(expression);
    if (!value.match(regexp)) {
      return `Invalid URL`
    }

    return false;
  },

  alphanumeric: (value) => {
    // Allow blank field:
    if (value.length === 0) return false;

    let expression = /^[a-zA-Z0-9_]*$/gi;
    let regexp = new RegExp(expression);
    if (!value.match(regexp)) {
      return `Must be alphanumeric (only letters and numbers allowed)`;
    }

    return false;
  },
  
  numeric_int: (value) => {
    // Allow blank field:
    if (value.length === 0) return false;

    let expression = /^[0-9]*$/gi;
    let regexp = new RegExp(expression);
    if (!value.match(regexp)) {
      return `Must be numeric (only numbers, not decimals allowed)`;
    }

    return false;
  },

  date: (value) => {
    if(value && !isValidDate(value)) {
      return 'Invalid date';
    }
    return false;
  },

};

export default validators;