import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';

import { showUpdate } from '../../redux/condominiums/action/condominiumsAction'
import LabelAneInput from '../template/LabelAndInput'

const renderTextArea = props => (
    <div className='form-group col-xs-12 col-sm-12'>
        <label>{props.label}</label>
        <div>
            <textarea className="form-control" rows="3" {...props.input} placeholder={props.placeholder} disabled={props.disabled} />
        </div>
    </div>
);

export class CondominiumForm extends Component {
    componentDidMount(){

        $('.cep').mask('000.000-00');
  
        $(".cep").change(function(){
            $("#value").html($(this).val().replace(/\D/g,''))
        })
       
        $('.cnpj').mask('00.000.000/0000-00');
  
        $(".cnpj").change(function(){
            $("#value").html($(this).val().replace(/\D/g,''))
        })

        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
    }

    renderSelectStatus() {
        let statusList = ["Ativo", "Inativo", "Desabilitado"];
        const options = statusList.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ));
        return options;
    }

    renderSelectEstados() {
        let estados = [
            { nome: 'Acre', sigla: 'AC' },
            { nome: 'Alagoas', sigla: 'AL' },
            { nome: 'Amapá', sigla: 'AP' },
            { nome: 'Amazonas', sigla: 'AM' },
            { nome: 'Bahia', sigla: 'BA' },
            { nome: 'Ceará', sigla: 'CE' },
            { nome: 'Espírit sigla:  Santo' },
            { nome: 'Goiás', sigla: 'GO' },
            { nome: 'Maranhão', sigla: 'MA' },
            { nome: 'Mato Grosso', sigla: 'MT' },
            { nome: 'Mato Grosso do Sul', sigla: 'MS' },
            { nome: 'Minas Gerais', sigla: 'MG' },
            { nome: 'Pará', sigla: 'PA' },
            { nome: 'Paraíba', sigla: 'PB' },
            { nome: 'Paraná', sigla: 'PR' },
            { nome: 'Pernambuco', sigla: 'PE' },
            { nome: 'Piauí', sigla: 'PI' },
            { nome: 'Rio de Janeiro', sigla: 'RJ' },
            { nome: 'Rio Grande do Norte', sigla: 'RN' },
            { nome: 'Rio Grande do Sul', sigla: 'RS' },
            { nome: 'Rondônia', sigla: 'RO' },
            { nome: 'Roraima', sigla: 'RR' },
            { nome: 'Santa Catarina', sigla: 'SC' },
            { nome: 'São Paulo', sigla: 'SP' },
            { nome: 'Sergipe', sigla: 'SE' },
            { nome: 'Tocantins', sigla: 'TO' }
        ]

        const options = estados.map((e) => (
            <option key={e.sigla} value={e.sigla}>
              {e.nome}
            </option>
        ));
        return options;
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
                                <Field 
                                    name='name' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Nome:' cols='12 12' placeholder='Nome do Condomínio'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='corporatename' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Razão Social:' cols='12 12' placeholder='Razão Social do Condomínio'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='cnpj' 
                                    component={LabelAneInput} 
                                    type='text'
                                    className='cnpj'
                                    label='CNPJ:' cols='12 4' placeholder='Informe o CNPJ'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='email' 
                                    component={LabelAneInput} 
                                    type='email'
                                    label='E-mail:' cols='12 4' placeholder='Informe o e-mail'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <div className="form-group col-xs-12 col-sm-4">
                                    <label>Status: *</label>
                                    <Field
                                        name="status"
                                        component="select"
                                        className="form-control"
                                        required={true}
                                        disabled={this.props.disabled}
                                    >
                                        <option value="">Selecione um status</option>
                                        {this.renderSelectStatus()}
                                    </Field>
                                </div>
                                <Field 
                                    name='address' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Endereço:' cols='12 8' placeholder='Informe o endereço'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='number' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Número:' cols='12 4' placeholder='1234'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='district' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Bairro:' cols='12 3' placeholder='Informe o bairro'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='city' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Cidade:' cols='12 3' placeholder='Informe a cidade'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <div className="form-group col-xs-12 col-sm-3">
                                    <label>Estado: *</label>
                                    <Field
                                        name="status"
                                        component="select"
                                        className="form-control"
                                        required={true}
                                        disabled={this.props.disabled}
                                    >
                                        <option value="">Selecione um estado</option>
                                        {this.renderSelectEstados()}
                                    </Field>
                                </div>
                                <Field 
                                    name='postalcode' 
                                    component={LabelAneInput} 
                                    type='text'
                                    className='cep'
                                    label='CEP:' cols='12 3' placeholder='Informe o CEP'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                            </div>
                            
                        </div>
                        {button}
                    </form>
        )
    }
}

CondominiumForm = withRouter(CondominiumForm)
CondominiumForm = reduxForm({form: 'condominiumForm'})(CondominiumForm)
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate}, dispatch)
export default connect(null, mapDispactchToProps)(CondominiumForm)

