import './App.css';
import TodoApp from './Componentes/TodoApp'
import Navbar from './Componentes/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const theme = createTheme({
  palette: {
    primary: {
      main: '#009688'
    },
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoApp />}></Route>
        </Routes>
      </Router>
    </div>
    </ThemeProvider>

  );
}

export default App;
