import React from 'react'
import Authorization from './Authorization'

export default props => (
    <Authorization permission={props.permission}>
        <li className='nav-item'>
            <a href={props.path} className='nav-link'>
                <i className={`fas fa-${props.icon} nav-icon`}></i> <p>{props.label}</p>
            </a>
        </li>
    </Authorization>
)



