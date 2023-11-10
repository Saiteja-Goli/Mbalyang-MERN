import './App.css';
import Allroutes from './Components/Allroutes';
import {AuthcontextProvider} from "./context/Authcontext"


function App() {
  return (
    <div className="App">
     <AuthcontextProvider>
     <Allroutes/>
     </AuthcontextProvider>
      
   
    </div>
  );
}

export default App;
