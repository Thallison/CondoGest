import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate } from '../../redux/standards/action/standardsAction'
import LabelAneInput from '../template/LabelAndInput'

const renderTextArea = props => (
    <div className='form-group col-xs-12 col-sm-12'>
        <label>{props.label}</label>
        <div>
            <textarea className="form-control" rows="3" {...props.input} placeholder={props.placeholder} disabled={props.disabled} />
        </div>
    </div>
);

export class StandardForm extends Component {
    componentDidMount(){
        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
    }

    renderSelect(){
        const listCategoy = [
            'NR 01 - Disposições Gerais',
            'NR 02 - Inspeção Prévia',
            'NR 03 - Embargo ou Interdição',
            'NR 04 - Serviços Especializados em Eng. de Segurança e em Medicina do Trabalho',
            'NR 05 - Comissão Interna de Prevenção de Acidentes',
            'NR 06 - Equipamentos de Proteção Individual - EPI',
            'NR 07 - Programas de Controle Médico de Saúde Ocupacional',
            'NR 08 - Edificações',
            'NR 09 - Programas de Prevenção de Riscos Ambientais',
            'NR 10 - Segurança em Instalações e Serviços em Eletricidade',
            'NR 11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais',
            'NR 12 - Máquinas e Equipamentos',
            'NR 13 - Caldeiras, Vasos de Pressão e Tabulações e Tanques Metálicos de Armazenamento',
            'NR 14 - Fornos',
            'NR 15 - Atividades e Operações Insalubres',
            'NR 16 - Atividades e Operações Perigosas',
            'NR 17 - Ergonomia',
            'NR 18 - Condições e Meio Ambiente de Trabalho na Indústria da Construção',
            'NR 19 - Explosivos',
            'NR 20 - Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',
            'NR 21 - Trabalhos a Céu Aberto',
            'NR 22 - Segurança e Saúde Ocupacional na Mineração',
            'NR 23 - Proteção Contra Incêndios',
            'NR 24 - Condições Sanitárias e de Conforto nos Locais de Trabalho',
            'NR 25 - Resíduos Industriais',
            'NR 26 - Sinalização de Segurança',
            'NR 27 - Registro Profissional do Técnico de Segurança do Trabalho no MTB',
            'NR 28 - Fiscalização e Penalidades',
            'NR 29 - Segurança e Saúde no Trabalho Portuário',
            'NR 30 - Segurança e Saúde no Trabalho Aquaviário',
            'NR 31 - Segurança e Saúde no Trabalho na Agricultura, Pecuária Silvicultura, Exploração Florestal e Aquicultura',
            'NR 32 - Segurança e Saúde no Trabalho em Estabelecimentos de Saúde',
            'NR 33 - Segurança e Saúde no Trabalho em Espaços Confinados',
            'NR 34 - Condições e Meio Ambiente de Trabalho na Indústria da Construção, Reparação e Desmonte Naval',
            'NR 35 - Trabalho em Altura  ',
            'NR 36 - Segurança e Saúde no Trabalho em Empresas de Abate e Processamento de Carnes e Derivados',
            'NR 37 - Segurança e Saúde em Plataformas de Petróleo'
        ]
        var count = 1;
        return listCategoy.map(el => <option key={count++} value={el}>{el}</option>)
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
                                    name='codeStandard' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Código Norma' cols='12 6' placeholder='Informe o código norma'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <Field 
                                    name='name' 
                                    component={LabelAneInput} 
                                    type='text'
                                    label='Nome:' cols='12 6' placeholder='Informe o nome completo'
                                    required={true}
                                    disabled={this.props.disabled}
                                    />
                                <div className="form-group col-xs-12 col-sm-12">
                                    <label>Categoria: * </label>
                                    <Field name="category" component="select" className='form-control' disabled={this.props.disabled}>
                                        {this.renderSelect()}                                        
                                    </Field>
                                </div>
                                <Field name="description" label='Descrição:' placeholder='Informe a descrição' component={renderTextArea} className='form-control' disabled={this.props.disabled}/>
                            </div>
                            
                        </div>
                        {button}
                    </form>
        )
    }
}


StandardForm = withRouter(StandardForm)
StandardForm = reduxForm({form: 'standardForm'})(StandardForm)
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate}, dispatch)
export default connect(null, mapDispactchToProps)(StandardForm)

