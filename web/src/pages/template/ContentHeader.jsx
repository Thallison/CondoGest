import React from 'react'

export default props => (
    <section className='content-header'>
        <h1>{props.title} <small className='ml-1'>{props.small}</small></h1>
    </section>
)