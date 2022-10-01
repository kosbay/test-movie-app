import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Container from './components/Container'
import Details from './components/Details'
import Panel from './components/Panel'
import { MovieProvider } from './contexts/MovieContext'

import './App.css'

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Panel />
                <Container />
              </>
            }
          />
          <Route path="/movie">
            <Route path=":movieId" element={<Details />} />
          </Route>
        </Routes>
      </MovieProvider>
    </div>
  )
}

export default App
