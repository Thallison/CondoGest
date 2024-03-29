import React from 'react'
import Grid from './Grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label + (props.required? ' * ': '')}</label>
            <input {...props.input} className='form-control'
                placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type} 
                required={props.required}
                />
        </div>
    </Grid>
)