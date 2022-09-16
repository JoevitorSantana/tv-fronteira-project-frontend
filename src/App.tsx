import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { AppProvider } from './hooks';
import { Computers } from './pages/Computers';
import { CreateComputer } from './pages/CreateComputer';
import { Home } from './pages/Home';
import { ListUsers } from './pages/ListUsers';
import { Login } from './pages/Login';
//import Map from './pages/Map';
import { MyProfile } from './pages/MyProfile';
import { Register } from './pages/Register';
import { ShowComputerDetails } from './pages/ShowComputerDetails';
import { UpdateProfile } from './pages/UpdateUser';
import { Route } from './routes/Route';
import GlobalStyle from './styles/global';


function App() {

  return (
    <>
      <Router>
        <AppProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/users/create" exact component={Register}/>  
            {/*scriptLoaded && (
              <Route path="/map" exact component={() => <Map mapType={google.maps.MapTypeId.SATELLITE} mapTypeControl={true}/>}/>
            )*/}                              
            <Route path="/computers" exact component={Computers} isPrivate />
            <Route path="/computers/create" exact component={CreateComputer} isPrivate />
            <Route path="/users/profile" exact component={MyProfile} isPrivate/>
            <Route path="/users/update" exact component={UpdateProfile} isPrivate/>
            <Route path="/users" exact component={ListUsers} isPrivate/>
            <Route path="/computers/computer/:id" exact component={ShowComputerDetails} isPrivate/>            
          </Switch>
        </AppProvider>
        <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
