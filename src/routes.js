

import React, { Component } from 'react';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom'
import Login from './component/login/login'
import Dashboard from './component/dashboard/dashboard'
import Ventas from './component/Ventas/ventas'
import './App.css'
import Signup from './component/signup/signup'

class Routes extends Component {
 
    
render(){
    return(

       <Router>
        <Switch>
            <main>
                <Route exact path = "/" component={Ventas}/>
                <Route exact path = "/dashboard" component={Dashboard}/>
                <Route exact path = "/login" component={Login}/>
                <Route exact path = "/signup" component={Signup}/>

            </main>     
        </Switch>   

       </Router> 


    )
}

}

export default Routes