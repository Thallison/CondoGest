import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate, update } from '../../redux/companies/action/sectorAccountsAction'
import { getList } from '../../redux/accounts/action/accountsAction'
import LabelAndCheckboxInput from '../template/LabelAndCheckboxInput'
import Accordion from '../template/Accordion'

export class SectorAccountForm extends Component {
    componentDidMount(){
        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
        this.props.getList('Ativo')
    }

    renderCategory(){
        var uniqueCategory = this.props.list.map(item => item.category)
         .filter((value, index, self) => self.indexOf(value) === index)
        
        return uniqueCategory.map(category => {
            let accounts = this.props.list.filter((value) => value.category === category)
            return (
                <Accordion key={category} title={category}>
                    {accounts.map(account => 
                        <Field key={account.id}
                        name={`account.${account.id}`} 
                        component={LabelAndCheckboxInput} 
                        type='checkbox'
                        label={account.codeAccount + ' - ' + account.description}
                        id={account.id}
                        padding={''}
                        /> 
                    )}
                </Accordion>
            )
        })
    }

    onSubmit = (values, _, props) => {
        this.props.update(values,this.props.match.params.id)
    }

    render() {
        const {handleSubmit} = this.props
        return (
                    
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <div className="box-body">
                            {this.renderCategory()}
                        </div>
                        <div className="box-footer">
                            <button type='submit' className="btn btn-primary">{this.props.labelButton}</button>
                        </div>
                        
                    </form>
        )
    }
}


SectorAccountForm = withRouter(SectorAccountForm)
SectorAccountForm = reduxForm({form: 'sectorAccountForm'})(SectorAccountForm)
const mapStateToProps = state => ({list: state.Accounts.listAccounts})
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate, getList, update}, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(SectorAccountForm)

