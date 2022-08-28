import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

export default props => (
    <aside className='main-sidebar sidebar-dark-primary'>
        <Link to={`${process.env.PUBLIC_URL}/app`} className="brand-link">
            <img src={`${process.env.PUBLIC_URL}/c_condogest.png`} alt="Condogest Logo" className="brand-image" />
            <span className="brand-text" style={{marginLeft: 1+'em'}}>Condogest</span>
        </Link >
        <section className="sidebar">
            <Menu />
        </section>
    </aside>
)