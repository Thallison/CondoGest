import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'

import { create, update } from '../../redux/users/action/usersAction'

import UserForm from './UserForm'

export class UserRegister extends Component {
    render() {
        let onSubmit, disabled, labelButton;
        
        switch (this.props.type) {
            case 'create':
                onSubmit = this.props.create;
                labelButton = "Cadastrar";
                disabled = false;
                break;
            case 'edit':
                onSubmit = this.props.update;
                labelButton = "Alterar";
                disabled = false;
                break;
            case 'view':
                onSubmit = '';
                labelButton = '';
                disabled = true;
                break;
            default:
                onSubmit = '';
                labelButton = '';
                disabled = '';
        }

        return (
            <div>
                <ContentHeader title='Cadastro Usuário'/> 
                <Content>
                    <div className="card-body">
                        <UserForm onSubmit={onSubmit} labelButton = {labelButton} disabled={disabled}/>
                    </div>
                </Content>
            </div>
        )
    }
}
UserRegister = withRouter(UserRegister)
const mapDispactchToProps = dispatch => bindActionCreators({create, update}, dispatch)
export default connect(null, mapDispactchToProps)(UserRegister)


