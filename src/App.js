import React from 'react';
import TablaConsumo from './components/table';
import './App.css';

function App() {

  return (
    <>
     <main className='App'>
            <div  style={{textAlign:'center',justifyItems:'center', justifyContent:'center',  display:'flex'}}>
              <TablaConsumo />
            </div>
          </main>
    </>
         
  );
}

export default App;
