import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';

import { showUpdate } from '../../redux/accounts/action/accountsAction'
import LabelAneInput from '../template/LabelAndInput'

const renderTextArea = props => (
    <div className='form-group col-xs-12 col-sm-12'>
        <label>{props.label}</label>
        <div>
            <textarea className="form-control" rows="3" {...props.input} placeholder={props.placeholder} disabled={props.disabled} />
        </div>
    </div>
);

export class AccountForm extends Component {
    componentDidMount(){

        $('.money').mask('000.000.000.000.000,00', {reverse: true});
  
        $(".money").change(function(){
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
                                    label='Nome:' cols='12 8' placeholder='Identificação da conta'
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
                                    name='price' 
                                    component={LabelAneInput} 
                                    type='text'
                                    className='money prefix'
                                    label='Valor:' cols='12 4' placeholder='Informe o valor'
                                    required={true}
                                    disabled={this.props.disabled}
                                    prefix='R$'
                                    />
                                <Field 
                                    name='duedate' 
                                    component={LabelAneInput} 
                                    type='date'
                                    label='Data de vencimento:' cols='12 4' placeholder='Informe a data de vencimento'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='payday' 
                                    component={LabelAneInput} 
                                    type='date'
                                    label='Data do pagamento:' cols='12 4' placeholder='Informe a data do pagamento'
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name="description" 
                                    label='Descrição:' 
                                    placeholder='Informe a descrição' 
                                    component={renderTextArea} 
                                    className='form-control' 
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='observation' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Observação:' cols='12 12' placeholder='Descreva alguma observação sobre a conta'
                                    disabled={this.props.disabled}
                                    />
                            </div>
                            
                        </div>
                        {button}
                    </form>
        )
    }
}

AccountForm = withRouter(AccountForm)
AccountForm = reduxForm({form: 'accountForm'})(AccountForm)
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate}, dispatch)
export default connect(mapDispactchToProps)(AccountForm)

