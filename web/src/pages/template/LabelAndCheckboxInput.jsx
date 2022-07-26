import React from 'react'


export default props => (
    <div className={"form-group col-12 "+props.padding}>
        <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
        <input {...props.input}
            type={props.type}
            className="custom-control-input " 
            id={props.id}
        />
        <label className="custom-control-label" htmlFor={props.id}>{props.label}</label>
        </div>
    </div>
)