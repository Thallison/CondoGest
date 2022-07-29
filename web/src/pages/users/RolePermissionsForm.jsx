import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate, update } from '../../redux/permissions/action/rolePermissionsAction'
import { getList } from '../../redux/permissions/action/permissionsAction'
import LabelAndCheckboxInput from '../template/LabelAndCheckboxInput'

export class RolePermissionsForm extends Component {
    componentDidMount(){
        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
        this.props.getList()
    }

    renderFormCheckbox(){
        return this.props.list.map(e => {
            return (
                <Field key = {e.id}
                    name={e.slug} 
                    component={LabelAndCheckboxInput} 
                    type='checkbox'
                    label={e.name}
                    id={e.id}
                    padding={e.id !== e.parentId?"pl-5":null}
                    />
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
                            <div className="row">
                                {this.renderFormCheckbox()}
                            </div>
                            
                        </div>
                        <div className="box-footer">
                            <button type='submit' className="btn btn-primary">{this.props.labelButton}</button>

                        </div>
                    </form>
        )
    }
}


RolePermissionsForm = withRouter(RolePermissionsForm)
RolePermissionsForm = reduxForm({form: 'rolePermissionsForm'})(RolePermissionsForm)
const mapStateToProps = state => ({list: state.Roles.listPermissions})
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate, getList, update}, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(RolePermissionsForm)

