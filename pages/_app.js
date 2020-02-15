import App from 'next/app'

import { AuthProvider } from '../components/hoc/withAuth'
import { BoxProvider } from '../components/hoc/withBox'
import ErrorBoundary from '../components/ErrorBoundary'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ErrorBoundary>
        <AuthProvider>
          <BoxProvider>
            <Component {...pageProps} />
          </BoxProvider>
        </AuthProvider>
      </ErrorBoundary>
    )
  }
}

export default MyApp
