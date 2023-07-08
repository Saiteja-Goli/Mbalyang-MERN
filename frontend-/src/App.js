import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
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
