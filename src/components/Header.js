import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = (props) => {
    return (
        <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
}
class Header extends React.Component {
    state = {}
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to="/home" className="navbar-brand">
                        {this.props.appName.toLowerCase()}
                    </Link>
                    <LoggedOutView currentUser={this.props}/>
                </div>
            </nav>
        );
    }
}

export default Header;