import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import moment from 'moment'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import Authorization from '../template/Authorization'
import LabelAndInput from '../template/LabelAndInput';

import { getList, destroy } from '../../redux/inspection/action/inspectionAction'

import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export class Inspection extends Component {

    componentDidMount() {
        this.props.getList()
    }

    getColumns() {
        return [
            {
                name: 'Código Vistoria',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Empresa',
                selector: 'company.companyName',
                sortable: true,
            },
            {
                name: 'Vistoriador',
                selector: 'user.name',
                sortable: true,
            },
            {
                name: 'Data da Vistoria',
                selector: 'created_at',
                sortable: true,
                format: row => moment(row.created_at).format('DD/MM/YYYY HH:mm:ss')
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
                format: row => {
                    switch (row.status) {
                        case 0:
                            return <span className={`badge badge-warning py-2 px-3`}>Em aberto</span>
                        case 1:
                            return <span className={`badge badge-danger py-2 px-3`}>Cancelada</span>
                        case 2:
                            return <span className={`badge badge-success py-2 px-3`}>Finalizada</span>
                        default:
                            return 'Não possui status'
                    }
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <Authorization permission={['Administrador']}>
                                <button
                                    className="btn btn-info btn-sm"
                                    title="Acessar Detalhes da Vistoria"
                                    onClick={() => this.props.history.push(`/app/vistorias/detalhes/${record.id}`)}
                                >
                                    <i className="fa fa-eye"></i>
                                    <span className='ml-1'>Detalhes da Vistoria</span>
                                </button>
                            </Authorization>
                        </Fragment>
                    );
                }
            }
        ]
    }

    onSubmit = data => {
        this.props.getList(data)
    }

    renderForm() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="row">
                    <Field
                        cols="12 3"
                        name="id"
                        type="text"
                        component={LabelAndInput}
                        label="Código Vistoria:"
                    />
                    <div className="form-group col-xs-12 col-sm-3">
                        <label>Status:</label>
                        <Field name="status" component="select" className='form-control'>
                            <option value="">Selecione um valor</option>
                            <option value='0'>Em aberto</option>
                            <option value='1'>Cancelada</option>
                            <option value='2'>Finalizada</option>                                        
                        </Field>
                    </div>
                    <Field
                        cols="12 3"
                        name="companyName"
                        type="text"
                        component={LabelAndInput}
                        label="Empresa:"
                    />
                    <Field
                        cols="12 3"
                        name="userName"
                        type="text"
                        component={LabelAndInput}
                        label="Vistoriador:"
                    />
                    <Field
                        cols="12 3"
                        name="inDateInspection"
                        type="date"
                        component={LabelAndInput}
                        label="Data Inicial:"
                    />
                    <Field
                        cols="12 3"
                        name="outDateInspection"
                        type="date"
                        component={LabelAndInput}
                        label="Data Final:"
                    />
                </div>
                <button
                    className="btn btn-primary float-right mb-4"
                    type="submit">
                    <i className="fas fa-filter"></i> Filtrar
                </button>
            </form>
        )
    }

    render() {
        return (
            <div>

                <ContentHeader title='Consulta Vistorias' small='' />
                <Content>
                    <div className="card-body">
                        {this.renderForm()}
                        <DataTableExtensions
                            columns={this.getColumns()}
                            data={this.props.list}
                            export={false}
                            print={false}
                            filterPlaceholder="Buscar Dados"
                        >
                            <DataTable
                                columns={this.getColumns()}
                                data={this.props.list}
                                pagination
                                noHeader
                                className="table table-bordered table-striped"
                                paginationComponentOptions={
                                    {
                                        rowsPerPageText: 'Registros por página:',
                                        rangeSeparatorText: 'de',
                                        noRowsPerPage: false,
                                        selectAllRowsItem: false,
                                        selectAllRowsItemText: 'Todos'
                                    }

                                }
                            />
                        </DataTableExtensions>
                    </div>
                </Content>
            </div>
        )
    }
}


Inspection = withRouter(Inspection)
Inspection = reduxForm({ form: 'inspectionFilters' })(Inspection)
const mapStateToProps = state => ({ list: state.Inspections.listInspections })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, destroy }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Inspection)
