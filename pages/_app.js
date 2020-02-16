import App from 'next/app'

import { AuthProvider } from '../components/hoc/withAuth'
import { BoxProvider } from '../components/hoc/withBox'
import { NotificationsProvider } from '../components/hoc/withNotifications'
import ErrorBoundary from '../components/errors/ErrorBoundary'
import PublicLayout from '../components/layouts/PublicLayout';

// Styled Components Theme:
import { ThemeProvider } from 'styled-components';
import theme from '../util/theme';
import { createTheme, detectScrollbarWidth } from '../util/helpers';

// Material UI Theme:
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import desktopMuiTheme from '../util/muiTheme';
import mobileMuiTheme from '../util/mobileMuiTheme';

import GlobalStyle from '../util/GlobalStyle';
import { createMuiTheme } from '@material-ui/core/styles';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    let muiTheme = desktopMuiTheme;

    const mergedTheme = createMuiTheme({
      ...muiTheme(theme),
      ...createTheme(theme),
    });

    return (
      <ThemeProvider theme={mergedTheme}>
        <MuiThemeProvider theme={mergedTheme}>      
          <CssBaseline />
          <GlobalStyle />
          <ErrorBoundary>
            <PublicLayout>
              <AuthProvider>
                <BoxProvider>
                  <NotificationsProvider>
                    <Component {...pageProps} />
                  </NotificationsProvider>
                </BoxProvider>
              </AuthProvider>
            </PublicLayout>
          </ErrorBoundary>
        </MuiThemeProvider>
      </ThemeProvider>      
    )
  }
}

export default MyApp
