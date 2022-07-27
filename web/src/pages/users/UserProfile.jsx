import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'

import { updatePassword, updateEmail } from '../../redux/users/action/userProfileAction'

export class UserProfile extends Component {
    onSubmitEmail = async (values, dispatch) => {
        await this.props.updateEmail(values)
    }
    onSubmitPassword = async (values, dispatch) => {
        await this.props.updatePassword(values)
    }
    render() {
        const {handleSubmit} = this.props

        return (
            <div>
                <ContentHeader title='Perfil Usuário'/>
                <Content>
                    <div className="card-body">
                        <div className="col-12">
                        <div className="card">
                        <div className="card-header p-2">
                            <ul className="nav nav-pills">
                            <li className="nav-item"><a className="nav-link active" href="#alterEmail" data-toggle="tab">Alterar Email</a></li>
                            <li className="nav-item"><a className="nav-link" href="#alterPassword" data-toggle="tab">Alterar Senha</a></li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content">
                            <div className="active tab-pane" id="alterEmail">
                                <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmitEmail)}>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <Field name="email" component="input" type="email" className="form-control" id="inputEmail" placeholder="Email"></Field>
                                        </div>
                                        <div className="box-footer  justify-content-end ">
                                            <button type='submit' className="btn btn-primary float-right">Alterar Email</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            <div className="tab-pane" id="alterPassword">
                                <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmitPassword)}>
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Senha</label>
                                        <div className="col-sm-10">
                                            <Field name="password" component="input" type="password" className="form-control" id="inputPassword" placeholder="Senha"></Field>
                                        </div>
                                        <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirme sua Senha</label>
                                        <div className="col-sm-10">
                                            <Field name="confirmPassword" component="input" type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirme sua Senha"></Field>
                                        </div>
                                        <div className="box-footer float-right">
                                            <button type='submit' className="btn btn-primary">Alterar Senha</button>
                                        </div>
                                    </div>
                                 </form>
                            </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </Content>
            </div>
        )
    }
}
UserProfile = withRouter(UserProfile)
UserProfile = reduxForm({form: 'userProfileForm'})(UserProfile)
const mapDispactchToProps = dispatch => bindActionCreators({updatePassword, updateEmail}, dispatch)
export default connect(null, mapDispactchToProps)(UserProfile)


