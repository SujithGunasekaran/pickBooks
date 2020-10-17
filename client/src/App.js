import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Component/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Product from './Pages/Product';
import Footer from './Component/Footer';
import Shop from './Pages/Shop';
import Shipping from './Pages/Shipping';
import Logout from './Pages/Logout';
import Cart from './Pages/Cart';
import ForgorPassword from './Pages/ForgotPassword';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Profile from './Pages/profile';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Login" exact component={Login} />
          <Route path="/Logout" exact component={Logout} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/ForgotPassword" exact component={ForgorPassword}/>
          <Route path="/Product/:ProductType/:ProductName" exact component={Product} />
          <Route path="/Shop/:BookType" exact component={Shop} />
          <Route path="/Shipping/:BookType/:BookQuantity/:BookName" exact component={Shipping}/>
          <Route path="/Contact" exact component={Contact}/>
          <Route path="/About" exact component={About}/>
          <Route path="/Cart" exact component={Cart}/>
          <Route path="/Profile" exact component={Profile} />
        </Switch>
      </Router>
  );
}

export default App;
