import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import CssBaseline from 'material-ui/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    ) as any;
  }

  return WithRoot;
}

export default withRoot;
