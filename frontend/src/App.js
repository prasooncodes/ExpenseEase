import React, {useState, useMemo} from 'react'
import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard'
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import { useGlobalContext } from './context/globalContext'

function PrivateRoute({ children }) {
    const { token } = useGlobalContext()
    return token ? children : <Navigate to="/login" />
}

function App() {
  const [active, setActive] = useState(1)
  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <AppStyled bg={bg} className="App">
      <Router>
        {orbMemo}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>
                    {displayData()}
                  </main>
                </MainLayout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;