import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate } from '../../redux/companies/action/companiesAction'
import { getList } from '../../redux/companies/action/sectorsAction'

import LabelAneInput from '../template/LabelAndInput'

export class CompanyForm extends Component {
    componentDidMount(){
        this.props.getList()

        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
    }

    renderSelect(){
        return this.props.list.map(el => <option key={el.id} value={el.id}>{el.name}</option>)
    }

    render() {
        const {handleSubmit} = this.props
        const button = this.props.disabled ?
        ''
        : 
        <div className="box-footer">
            <button type='submit' className="btn btn-primary">{this.props.labelButton}</button>
        </div>

        return (
                    <form onSubmit={handleSubmit}>
                        <div className="box-body">
                            <div className="row">
                                <h4 className="col-12">Dados Gerais</h4>
                                <Field 
                                    name='companyName' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Razão Social:' cols='12 6' placeholder='Informe a Razão Social'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='name' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Nome:' cols='12 6' placeholder='Informe o nome da empresa'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='cnpj' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='CNPJ:' cols='12 4' placeholder='Informe o CNPJ'
                                    required={true}
                                    disabled={this.props.disabled}
                                    normalize={(input) => {
                                        if (!input) return;
                                    
                                        return input
                                            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                                            .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                                            .replace(/(\d{3})(\d)/, '$1.$2')
                                            .replace(/(\d{3})(\d)/, '$1/$2')
                                            .replace(/(\d{4})(\d)/, '$1-$2')
                                            .replace(/(-\d{2})\d+?$/, '$1');
                                        }}
                                    />
                                <Field 
                                    name='email' 
                                    component={LabelAneInput} 
                                    type='email'
                                    label='Email:' cols='12 4' placeholder='Informe o email'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='tel' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Telefone:' cols='12 4' placeholder='Informe o telefone'
                                    disabled={this.props.disabled}
                                    normalize={(input) => {
                                        if (!input) return;
                                    
                                        return input
                                            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                                            .replace(/(\d{2})(\d)/, '($1) $2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                                            .replace(/(\d{4})(\d)/, '$1-$2')
                                            .replace(/(-\d{5})\d+?$/, '$1');
                                        }}
                                    />
                                <Field 
                                    name='cnae' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='CNAE:' cols='12 4' placeholder='Informe o CNAE'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='riskLevel' 
                                    component={LabelAneInput} 
                                    type='number'
                                    label='Grau de Risco:' cols='12 4' placeholder='Informe o grau de risco'
                                    disabled={this.props.disabled}
                                    />   
                                <Field 
                                    name='recurrence' 
                                    component={LabelAneInput} 
                                    type='number'
                                    label='Recorrência de vistorias: ' cols='12 4' placeholder='Informe a quantidade de dias'
                                    disabled={this.props.disabled}
                                    />                                     
                                <div className="form-group col-xs-12 col-sm-12">
                                    <label>Setor: *</label>
                                    <Field name="sector_id" component="select" className='form-control' required={true} disabled={this.props.disabled}>
                                        <option value="">Selecione uma setor</option>
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
                                            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                                            .replace(/(-\d{3})\d+?$/, '$1');
                                        }}
                                    /> 
                            </div>
                        </div>
                        <div className="box-footer">
                            {button}
                        </div>
                    </form>
        )
    }
}


CompanyForm = withRouter(CompanyForm)
CompanyForm = reduxForm({form: 'companyForm'})(CompanyForm)
const mapStateToProps = state => ({list: state.Sectors.listSectors})
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate, getList}, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(CompanyForm)

