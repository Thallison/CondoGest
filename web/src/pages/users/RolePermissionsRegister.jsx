import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'

import {update } from '../../redux/permissions/action/rolePermissionsAction'

import RolePermissionsForm from './RolePermissionsForm'

export class RolePermissionsRegister extends Component {
    render() {
        const labelButton = "Atribuir permissões";

        return (
            <div>
                <ContentHeader title='Atribuir permissões'/> 
                <Content>
                    <div className="card-body">
                        <RolePermissionsForm onSubmit={this.props.update} labelButton = {labelButton}/>
                    </div>
                </Content>
            </div>
        )
    }
}
RolePermissionsRegister = withRouter(RolePermissionsRegister)
const mapDispactchToProps = dispatch => bindActionCreators({update}, dispatch)
export default connect(null, mapDispactchToProps)(RolePermissionsRegister)


