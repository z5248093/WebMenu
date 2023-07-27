import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import LogIn from './LogIn';

function HomePage() {
	return (
		<Router>
			<Navbar/>
			<Switch>
				<Route path='/' exact component={Menu}/>
        		<Route path='/menu' exact component={Menu}/>
        		<Route path='/signin' component={LogIn}/>
			</Switch>
		</Router>
	);
}

export default HomePage;