import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'fontsource-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'



ReactDOM.render(
  // <ThemeProvider theme={theme}>
  //   <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  // </ThemeProvider>,
  document.getElementById('root')
)


