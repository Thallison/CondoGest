import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'

import { create, update } from '../../redux/accounts/action/accountsAction'

import AccountForm from './AccountForm'

export class AccountRegister extends Component {
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
                <ContentHeader title='Cadastrar Contas'/> 
                <Content>
                    <div className="card-body">
                        <AccountForm onSubmit={onSubmit} labelButton = {labelButton} disabled={disabled}/>
                    </div>
                </Content>
            </div>
        )
    }
}
AccountRegister = withRouter(AccountRegister)
const mapDispactchToProps = dispatch => bindActionCreators({create, update}, dispatch)
export default connect(null, mapDispactchToProps)(AccountRegister)


