import './App.css';
import useToast from './hooks/toast';
import Toast from './components/Toast';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navbar from './components/NavBar';
import routes from './routes';
import { useSelector } from 'react-redux';


function App() {
  const toasts = useSelector(state => state.toast.toasts)
  
  const {deleteToast} = useToast();


  return (
    
    <Router>
      <Navbar/>
      <Toast 
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <div className="container">
        <Switch>
          {routes.map((route, i) =>{
            return (
              <Route 
                key={i} 
                exact path={route.path} 
                component={route.component}
              >
              </Route>
          )})}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
