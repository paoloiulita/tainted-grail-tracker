import React from 'react';
import { Typography, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box className="error-boundary">
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" paragraph>
            The application encountered an unexpected error. Please try refreshing the page.
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box className="error-details">
              <Typography variant="subtitle2" color="error">
                Error Details (Development Only):
              </Typography>
              <pre className="error-stack">
                {this.state.error && this.state.error.toString()}
                {'\n\nStack Trace:'}
                {this.state.errorInfo.componentStack}
              </pre>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
            className="mt-4"
          >
            Refresh Application
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;