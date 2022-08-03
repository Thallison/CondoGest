import React from 'react'
import Grid from './Grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label + (props.required? ' * ': '')}</label>
            <input {...props.input} className={'form-control ' + props.className}
                placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type} 
                required={props.required}
                disabled={props.disabled}
                />
            {(props.prefix? <span class="input-prefix">{props.prefix}</span>: '')}
        </div>
    </Grid>
)