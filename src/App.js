import './App.css';
import ThreeDObjectRender from './ThreeDObjectRender';

function App() {
  const currentObject = {
    objectFile : 
      {
        id : "m0001",
        obj: "NT_NO083.obj",
        mtl: "test.mtl"
      }
  }
  return (
    <div className="App">
      <ThreeDObjectRender threeDObject= { currentObject }></ThreeDObjectRender>
    </div>
  );
}

export default App;
