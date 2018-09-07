import React, { Component } from 'react';

import logo from '../svg/logo.svg';

class Header extends Component {
    render() {
        return (<header className="App-header mb-2">
            <h1 className="App-title"><img src={logo} className="App-logo" alt="logo" /> Welcome to React</h1>
        </header>);
    }

}

export default Header;
