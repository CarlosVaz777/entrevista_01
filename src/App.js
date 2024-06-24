import React from 'react';
import TablaConsumo from './components/table';
import './App.css';
import UsersFetchMap from './components/usersFetchMap';

function App() {

  return (
    <>
     <div className='  container' >
            <div  style={{ justifyItems:'center', justifyContent:'center', alignItems:'center', display:'flex' }}>
              <TablaConsumo />
            </div>
            <div style={{ justifyItems:'center', justifyContent:'center', alignItems:'center', display:'flex' }}>
              <UsersFetchMap />
            </div>

          </div>
    </>
         
  )
}

export default App;
