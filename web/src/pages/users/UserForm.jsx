import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { showUpdate } from '../../redux/users/action/usersAction'
import { getList } from '../../redux/permissions/action/rolesAction'
import LabelAneInput from '../template/LabelAndInput'


export class UserForm extends Component {
    componentDidMount(){
        this.props.getList()

        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
    }

    renderSelect(){
        return this.props.list.map(el => <option key={el.id} value={el.slug}>{el.name}</option>)
    }

    render() {
        const {handleSubmit} = this.props
        const button = this.props.disabled ?
        ''
        : 
        <div className="box-footer">
            <button type='submit' className="btn btn-success">{this.props.labelButton}</button>
        </div>

        return (
                    <form onSubmit={handleSubmit}>
                        <div className="box-body">
                            <div className="row">
                                <h4 className="col-12">Dados Gerais</h4>
                                <Field 
                                    name='name' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Nome:' cols='12 8' placeholder='Informe o nome completo'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='dateOfBirth' 
                                    component={LabelAneInput} type='date'
                                    label='Data de Nascimento:' cols='12 4' placeholder='Informe a data de nascimento'
                                    disabled={this.props.disabled}
                                    />
                                <Field name='email' component={LabelAneInput} type='email'
                                    label='Email:' cols='12 4' placeholder='Informe o email'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='cpf' 
                                    component={LabelAneInput} type='text'
                                    label='CPF:' cols='12 4' placeholder='Informe o cpf'
                                    required={true}
                                    disabled={this.props.disabled}
                                    normalize={(input) => {
                                        if (!input) return;
                                    
                                        return input
                                            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                                            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                                            .replace(/(\d{3})(\d)/, '$1.$2')
                                            .replace(/(\d{3})(\d)/, '$1-$2')
                                            .replace(/(-\d{2})\d+?$/, '$1');
                                        }}
                                    />
                                <Field 
                                    name='professionalRegistry' 
                                    component={LabelAneInput} type='text'
                                    label='Registro Profissional:' cols='12 4' placeholder='Informe o registro profissional'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='rg' 
                                    component={LabelAneInput} type='text'
                                    label='RG:' cols='12 4' placeholder='Informe o RG'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='emittingOrgan' 
                                    component={LabelAneInput} type='text'
                                    label='Orgão Emissor:' cols='12 4' placeholder='Informe o Orgão Emissor:'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='issueDate' 
                                    component={LabelAneInput} type='date'
                                    label='Data de Emissão:' cols='12 4' placeholder='Informe o data de emissão'
                                    disabled={this.props.disabled}
                                    />
                            </div>
                            <div className="row">
                                <h4 className="col-12">Nível de Acesso</h4>
                                <div className="form-group col-xs-12 col-sm-4">
                                    <label>Perfil: *</label>
                                    <Field name="role" component="select" className='form-control' required disabled={this.props.disabled}>
                                        <option value="">Selecione um valor</option>
                                        {
                                            this.renderSelect()
                                        }
                                    </Field>
                                </div>
                            </div>
                            <div className="row">
                                <h4 className="col-12">Endereço</h4>
                                <Field 
                                    name='street' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Logradouro:' cols='12 8' placeholder='Informe o logradouro'
                                    disabled={this.props.disabled}
                                    />            
                                <Field 
                                    name='number' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Número:' cols='12 4' placeholder='Informe o número'
                                    disabled={this.props.disabled}
                                    />                                
                                <Field 
                                    name='complement' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Complemento:' cols='12 12' placeholder='Informe o complemento'
                                    disabled={this.props.disabled}
                                    />                                
                                <Field 
                                    name='neighborhood' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Bairro:' cols='12 4' placeholder='Informe o bairro'
                                    disabled={this.props.disabled}
                                    />                                   
                                <Field 
                                    name='city' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Cidade:' cols='12 4' placeholder='Informe a cidade'
                                    disabled={this.props.disabled}
                                    />   
                                <Field 
                                    name='cep' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='CEP:' cols='12 4' placeholder='Informe o CEP'
                                    disabled={this.props.disabled}
                                    normalize={(input) => {
                                        if (!input) return;
                                    
                                        return input
                                            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                                            .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                                            .replace(/(\d{3})(\d)/, '$1-$2')
                                            .replace(/(-\d{3})\d+?$/, '$1');
                                        }}
                                    /> 
                            </div>
                        </div>
                        {button}
                        
                    </form>
        )
    }
}


UserForm = withRouter(UserForm)
UserForm = reduxForm({form: 'userForm'})(UserForm)
const mapStateToProps = state => ({list: state.Roles.listRoles})
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate, getList}, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(UserForm)

