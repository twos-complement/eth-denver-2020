import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import resolve from 'did-resolver';

export const timeSince = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const dateFormat = d && `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  const seconds = Math.floor(((new Date().getTime() / 1000) - date / 1000));

  let interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return dateFormat;
  }

  const hh = d.getHours();
  let h = hh;
  let m = d.getMinutes();
  let dd = 'AM';
  m = m < 10 ? `0${m}` : m;

  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h == 0) {
    h = 12;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${h}:${m}${dd}`;
  if (interval === 1) return `${h}:${m}${dd}`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${h}:${m}${dd}`;
  if (interval === 1) return `${h}:${m}${dd}`;

  return `${h}:${m}${dd}`;
};

export const getAddrFromDid = async (did) => {
  const doc = await resolve(did);
  return doc.publicKey[2].ethereumAddress;
}

function compareSimpleObject(obj1, obj2) {
  if (!obj1 || !obj2) {
    return false
  }
  return JSON.stringify(obj1) === JSON.stringify(obj2) 
};

export const getDaysToExpiration = function getDaysToExpiration(date) {
  return differenceInCalendarDays(new Date(date), new Date());
};

export const compareStepsArray = function compareStepsArray(arr1, arr2) {
  if(!arr1 || !arr2) {
    return false;
  }
  if(arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((step1) => {
    const step2 = arr2.find((step2) => step2.id === step1.id);
    return compareSimpleObject(step1, step2);
  });
};

export const expandTemplate = function expandTemplate(template, values) {
  return values.reduce((s, v, i) => s + v + template[i + 1], template[0])
};

export const createTheme = function createTheme(theme) {
  function bindFunctionsToTheme(func) {
    if (typeof func === "function") {
      return func.bind(theme);
    }

    if (typeof func !== "object")
      return func;

    for (const key in func) {
      func[key] = bindFunctionsToTheme(func[key]);        
    }

    return func;
  }

  return bindFunctionsToTheme(theme);
};

export const detectScrollbarWidth = function detectScrollbarWidth() {
  try {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);
    window.scrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  }
  catch (e) { 
    return 0;
  }
};

// function to remove timezone change
export const convertDate = function convertDate(date) {
  if (date) {
    date = new Date (date);
    return new Date (date.getFullYear(), date.getMonth(), date.getDate());
  }
};

export const dateToDayOfWeek = function dateToDayOfWeek(date) {
  date = new Date(date);
  const daysOfWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return daysOfWeek[date.getDay()];
};

export const elipsisText = function elipsisText(text, maxlength = 26) {
  return text.length > maxlength ? `${text.substr(0, maxlength - 4)}...` : text;
}