import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {logout, getName } from "../../services/auth";


class Header extends Component{
    handleLogout = async e => {
        e.preventDefault();
        logout();
        this.props.history.push("/");
    }

    render (){
        const userName = getName();
        return(
            <header className="main-header">
                <nav className="navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="/#" role="button"><i className="fas fa-bars"></i></a>
                        </li>
                    </ul>
                            
                    <ul className="navbar-nav ml-auto">
                    
                    <li className="nav-link">Bem vindo, <strong>{userName}</strong></li>
                    <li className="nav-item dropdown">

                        <a className="nav-link" data-toggle="dropdown" href="/#" style={{cursor: 'pointer'}}>
                            <i className="fas fa-cogs"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider"></div>
                            <a href="#app/perfil" className="dropdown-item text-center">Perfil</a>
                            <a href="/#" onClick = {this.handleLogout} className="dropdown-item text-center" style={{cursor: 'pointer'}}>Sair do Sistema</a>
                        </div>
                    </li>

                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(Header);