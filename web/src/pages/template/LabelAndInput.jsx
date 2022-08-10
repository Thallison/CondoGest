import React from 'react'
import Grid from './Grid'
import {TYPE_DATE} from '../../utils/constants'
import Moment from 'moment';

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label + (props.required? ' * ': '')}</label>
            <input {...props.input} className={'form-control ' + props.className}
                placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type} 
                required={props.required}
                disabled={props.disabled}
                value= {props.type === TYPE_DATE ? Moment(new Date(props.input.value)).format("YYYY-MM-DD") : props.input.value}
                />
            {(props.prefix? <span class="input-prefix">{props.prefix}</span>: '')}
        </div>
    </Grid>
)