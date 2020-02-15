import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorType: null,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    this.setState({
      errorType: 'UKNOWN',
    })

    // Handle custom errors:
    // ...

    super.componentDidCatch(error, info)
  }

  render() {
    // Render custom error messages:
    if (this.state.hasError) {
      switch (this.state.errorType) {
        default:
          return <h1>Something went wrong.</h1>
      }
    }

    return this.props.children
  }
}

export default ErrorBoundary
