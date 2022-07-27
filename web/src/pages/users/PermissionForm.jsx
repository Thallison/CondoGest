import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate } from '../../redux/permissions/action/permissionsAction'
import LabelAndInput from '../template/LabelAndInput'

export class PermissionForm extends Component {
    render() {
        const {handleSubmit} = this.props

        return (
                    <form onSubmit={handleSubmit}>
                                <Field 
                                    name='name' 
                                    component={LabelAndInput} 
                                    type='text'
                                    label='Nome do perfil:' cols='12' placeholder='Informe o nome do perfil'
                                    required={true}
                                    />
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                            <button type='submit' className="btn btn-success" onClick={()=> window.$('#modal-perfil').modal('hide')} >{this.props.labelButton}</button>
                        </div>
                    </form>
        )
    }
}


PermissionForm = withRouter(PermissionForm)
PermissionForm = reduxForm({form: 'roleForm'})(PermissionForm)
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate}, dispatch)
export default connect(null, mapDispactchToProps)(PermissionForm)

