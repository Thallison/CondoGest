import React from 'react'
import Grid from '../template/Grid'

export default props =>(
    <Grid cols="12 12 12 4">
    <div className={`small-box bg-${props.color}`}>
        <div className="inner">
            <h2>{props.text}</h2>
            { props.subtext ? <h4>{props.subtext}</h4> : '' }
            <p>{props.amount}</p>
        </div>
        <div className="icon">
            <i className={`fas fa-${props.icon}`}></i>
        </div>
    </div>
</Grid>
)
