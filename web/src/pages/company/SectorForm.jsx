import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from 'redux-form'

import LabelAndInput from '../template/LabelAndInput'

export class SectorForm extends Component {
    render() {
        const {handleSubmit} = this.props

        return (
                    <form onSubmit={handleSubmit}>
                                <Field 
                                    name='name' 
                                    component={LabelAndInput} 
                                    type='text'
                                    label='Nome do setor:' cols='12' placeholder='Informe o nome do setor'
                                    required={true}
                                    />
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                            <button type='submit' className="btn btn-primary" onClick={()=> window.$('#modal-sector').modal('hide')} >{this.props.labelButton}</button>
                        </div>
                    </form>
        )
    }
}


SectorForm = withRouter(SectorForm)
SectorForm = reduxForm({form: 'sectorForm'})(SectorForm)
export default SectorForm

