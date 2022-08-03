import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'

import {update } from '../../redux/companies/action/sectorAccountsAction'

import SectorAccountForm from './SectorAccountForm'

export class SectorAccountRegister extends Component {
    render() {
        const labelButton = "Atribuir Normas ao Setor";

        return (
            <div>
                <ContentHeader title='Atribuir Normas ao Setor'/> 
                <Content>
                    <div className="card-body">
                        <SectorAccountForm onSubmit={this.props.update} labelButton = {labelButton}/>
                    </div>
                </Content>
            </div>
        )
    }
}
SectorAccountRegister = withRouter(SectorAccountRegister)
const mapDispactchToProps = dispatch => bindActionCreators({update}, dispatch)
export default connect(null, mapDispactchToProps)(SectorAccountRegister)


