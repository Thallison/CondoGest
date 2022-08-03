import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { reduxForm, Field, getFormValues } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import LabelAndInput from '../template/LabelAndInput'
import Grid from '../template/Grid'
import Accordion from '../template/Accordion'

import { getList as getListCompanies } from '../../redux/companies/action/companiesAction'
import { getList as getListAccounts } from '../../redux/accounts/action/accountsAction'
import { create,update, showUpdate } from '../../redux/inspection/action/inspectionAction'
import { showSectorInspection } from '../../redux/companies/action/sectorAccountsAction'

const InputCheckbox = (props) => (
    <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
        <input {...props.input} data-toggle="collapse" data-target={`#collapse${props.id}`}
            type={props.type}
            className="custom-control-input"
            id={props.id}
        />
        <label className="custom-control-label" htmlFor={props.id}>{props.label}</label>
    </div>
);

const InputText = (props) => (
    <Grid cols="12 6">
        <label htmlFor={props.id}>{props.label}</label>
        <input {...props.input}
            type='text'
            className="form-control"
            id={props.id}
        />
    </Grid>
);

const InputRadio = (props) => (
    <div className="custom-control custom-radio">
        <input {...props.input} className="custom-control-input" type={props.type} id={props.id} required={props.required} />
        <label htmlFor={props.id} className="custom-control-label">{props.label}</label>
    </div>
);

const InputTextArea = props => (
    <Grid cols="12 9">
        <label>Observação:</label>
        <textarea {...props.input} name={props.name} className="form-control" rows="2" placeholder="Digite uma observação"></textarea>
    </Grid>
);

let Account = props => {
    let applicable = false
    if (typeof props.fields !== 'undefined') {
        if (typeof props.fields.account[props.id] !== 'undefined')
            applicable = props.fields.account[props.id].applicable
    }
    return (
        <>
            <div className="form-group col-12">
                <div>{props.labelAccount}</div>
                <span>Aplicável?</span>
                <Field
                    name={`account[${props.id}].applicable`}
                    id={props.id}
                    type='checkbox'
                    label=''
                    component={InputCheckbox}
                />
            </div>
            {}
            <div id={`collapse${props.id}`} className={`form-group collapse col-12 ${applicable ? 'show' : ''}`}>
                <div className='row'>
                    <Grid cols="12 3">
                        <span>Status de Adequação</span>
                        <Field
                            name={`account[${props.id}].status`}
                            label="Não atendido"
                            type="radio"
                            value="1"
                            id={`account[${props.id}].radio1`}
                            component={InputRadio}
                            required={applicable}
                        />
                        <Field
                            name={`account[${props.id}].status`}
                            label="Não atendido, mas com iniciativas"
                            type="radio"
                            value="2"
                            id={`account[${props.id}].radio2`}
                            component={InputRadio}
                            required={applicable}
                        />
                        <Field
                            name={`account[${props.id}].status`}
                            label="Atende, mas há ressalvas"
                            type="radio"
                            value="3"
                            id={`account[${props.id}].radio3`}
                            component={InputRadio}
                            required={applicable}
                        />
                        <Field
                            name={`account[${props.id}].status`}
                            label="Atende"
                            type="radio"
                            value="4"
                            id={`account[${props.id}].radio4`}
                            component={InputRadio}
                            required={applicable}
                        />
                    </Grid>
                    <Field name={`account[${props.id}].observation`} component={InputTextArea} />
                    <Field name={`account[${props.id}].who`} label="Quem:" component={InputText} />
                    <Field name={`account[${props.id}].when`} label="Quando:" component={InputText} />

                </div>
            </div>
        </>
    )
};

const mapStateToProps1 = state => ({
    fields: getFormValues("inspectionForm")(state)
})
Account = connect(mapStateToProps1)(Account)





export class InspectionRegister extends Component {
    componentDidMount() {
        this.props.getListCompanies('Ativo')
        this.props.getListAccounts('Ativo')
        if (this.props.match.params.id) {
            this.props.showUpdate(this.props.match.params.id)
        } else {
            this.props.initialize({
                account: []
            });
        }
    }

    renderSelectCompany() {
        const options = this.props.listCompanies.map(e => { return { value: e.id, label: e.id + ' - ' + e.companyName + ' - ' + e.cnpj, sector: e.sector_id, companyName: e.companyName } })

        if (this.props.type === 'create') {
            return (
                <Select
                    options={options}
                    placeholder="Selecione a empresa"
                    isClearable
                    onChange={(e) => {
                        this.props.change('company_id', e != null ? e.value : null)
                        this.props.change('companyName', e != null ? e.companyName : null)
                        if (e != null) {
                            this.props.showSectorInspection(e, e.sector)
                        } else {
                            this.props.initialize({
                                account: []
                            });
                        }
                    }

                    }
                />)
        }
    }

    renderCategory() {
        var uniqueCategory = this.props.listAccounts.map(item => item.category)
            .filter((value, index, self) => self.indexOf(value) === index)

        return uniqueCategory.map(category => {
            let accounts = this.props.listAccounts.filter((value) => value.category === category)
            return (
                <Accordion key={category} title={category}>
                    {accounts.map(account =>
                        <Account
                            key={account.id}
                            labelAccount={account.codeAccount + ' - ' + account.description}
                            id={account.id}
                        />
                    )}
                </Accordion>
            )
        })
    }

    renderButtons(){
        var buttonsOpen = null;
        if (this.props.type === 'edit') {
            buttonsOpen = <>
                <button
                    className="btn btn-info mr-1"
                    title="Acessar Detalhes da Vistoria"
                    onClick={() => this.props.history.push(`/app/vistorias/detalhes/${this.props.match.params.id}`)}
                >
                    <i className="fa fa-eye"></i>
                    <span className='ml-1'>Dashboard Vistoria</span>
                </button>
                <button
                    className="btn btn-secondary mr-1"
                    title="Editar Vistoria"
                    onClick={() => this.props.history.push(`/app/vistorias/add/files/${this.props.match.params.id}`)}
                >
                    <i className="fa fa-file-image"></i>
                    <span className='ml-1'>Anexar Evidências</span>
                </button>
            </>
        }
        return buttonsOpen
    }

    render() {
        const { handleSubmit } = this.props

        let onSubmit, labelButton;

        switch (this.props.type) {
            case 'create':
                onSubmit = this.props.create;
                labelButton = "Cadastrar Vistoria";
                break;
            case 'edit':
                onSubmit = this.props.update;
                labelButton = "Alterar Vistoria";
                break;
            case 'view':
                onSubmit = '';
                labelButton = '';
                break;
            default:
                onSubmit = '';
                labelButton = '';
        }

        return (
            <div>
                <ContentHeader title='Cadastrar Vistoria' />
                <Content>
                    <div className="card-body">
                        {this.renderSelectCompany()}
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                            <div className="row">
                                <Field
                                    name='company_id'
                                    component={LabelAndInput}
                                    type='text'
                                    label='Código empresa:' cols='12 3'
                                    required={true}
                                    disabled={true}
                                />
                                <Field
                                    name='companyName'
                                    component={LabelAndInput}
                                    type='text'
                                    label='Nome da empresa:' cols='12 3'
                                    disabled={true}
                                />
                            </div>

                            {this.renderCategory()}
                            <div className="box-footer">
                                {this.renderButtons()}
                                <button type='submit' className="btn btn-primary">{labelButton}</button>
                            </div>
                        </form>
                    </div>
                </Content>
            </div>
        )
    }
}


InspectionRegister = withRouter(InspectionRegister)
InspectionRegister = reduxForm({ form: 'inspectionForm' })(InspectionRegister)
const mapStateToProps = state => ({ listCompanies: state.Companies.listCompanies, listAccounts: state.Accounts.listAccounts })
const mapDispatchToProps = dispatch => bindActionCreators(
    { 
        create, 
        update,
        getListCompanies, 
        getListAccounts, 
        showSectorInspection, 
        showUpdate 
    }
    , dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(InspectionRegister)


