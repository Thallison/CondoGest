import React from 'react'
import Grid from '../template/Grid'

export default props =>(
    <Grid cols="12 12 12 3">
    <div className={`small-box bg-${props.color}`}>
        <div className="inner">
            <h3>{props.amount}</h3>

            <p>{props.text}</p>
        </div>
        <div className="icon">
            <i className={`fas fa-${props.icon}`}></i>
        </div>
    </div>
</Grid>
)
