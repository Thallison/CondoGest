import React from 'react'
import Authorization from './Authorization'

export default props => (
    <Authorization permission={props.permission}>
        <li className="nav-item has-treeview" style={{cursor:'pointer'}}>
            <a href="/#" className="nav-link">
                <i className={`nav-icon fas fa-${props.icon}`}></i>
                <p>
                    {props.label}
                    <i className="fas fa-angle-left right"></i>
                </p>
            </a>
            <ul className='nav nav-treeview'>
                {props.children}
            </ul>
        </li>
    </Authorization>
)