import Color from 'color';
import desktopMuiTheme from './muiTheme';
import merge from 'lodash.merge';

const mobileMuiTheme = ({ dp, ...theme }) => merge(desktopMuiTheme({dp, ...theme}), {
  typography: {

  },
});

export default mobileMuiTheme;