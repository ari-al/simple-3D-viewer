import './App.css';
import ThreeDObjectRender from './ThreeDObjectRender';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

function App() {
  const [id, setId] = useState('');
  let currentObject = {
      id : "m0001",
      obj: "NT_NO083.obj",
      mtl: "test.mtl"
  }

  const onId = e => {
    setId(e.target.id);
  };
  
  useEffect(()=>{
    if(id===''){
      return;
    }
    currentObject = {
      ...currentObject,
      id : id
    }
  },[id]);

  return (
    <div className="App" style = {{"display":"flex", "justfyContent":"space-between"}}>
      <div>
        <button onClick={onId} id="m0001" style = {{"width":"200px", "height":"50px", "display":"block"}}>M0001</button>
        <button onClick={onId} id="m0002" style = {{"width":"200px", "height":"50px", "display":"block"}}>M0002</button>
      </div>
      <ThreeDObjectRender threeDObject= { currentObject }>
        {/* <Viewer></Viewer> */}
      </ThreeDObjectRender>
    </div>
  );
}

export default App;
