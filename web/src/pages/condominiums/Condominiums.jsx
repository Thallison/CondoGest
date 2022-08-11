import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import ModalDelete from '../template/ModalDelete'
import Authorization from '../template/Authorization'

import { getList, update, destroy } from '../../redux/condominiums/action/condominiumsAction'

import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export class Condominiums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalDelete: false,
            idDelete: null
        }
        this.setShowModalDelete = this.setShowModalDelete.bind(this);
    }


    setShowModalDelete(bool, idDelete = null) {
        this.setState({
            showModalDelete: bool,
            idDelete: idDelete
        })
    }

    componentDidMount() {
        this.props.getList()
    }

    getColumns() {
        return [
            {
                name: 'Nome',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'CNPJ',
                selector: 'cnpj',
                sortable: true,
            },
            {
                name: 'CEP',
                selector: 'postalCode',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <Authorization permission={['Administrador']}>
                                <button
                                    className="btn btn-info btn-sm"
                                    title="Visualizar"
                                    onClick={() => this.props.history.push(`/app/condominios/view/${record.id}`)}
                                >
                                    <i className="fa fa-eye"></i>
                                </button>
                            </Authorization>
                            <Authorization permission={['Administrador']}>
                                <button
                                    className="btn btn-warning btn-sm"
                                    title="Editar"
                                    onClick={() => this.props.history.push(`/app/condominios/edit/${record.id}`)}
                                >
                                    <i className="fa fa-pen"></i>
                                </button>
                            </Authorization>
                            { record.status !== 'Inativo' ?
                                <Authorization permission={['Administrador']}>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        title="Excluir"
                                        onClick={() =>
                                            this.setShowModalDelete(true, record.id)
                                        }>
                                        <i className="fa fa-trash-alt"></i>
                                    </button>
                                </Authorization>
                                : null
                            }
                            { record.status !== 'Ativo' ?
                                <Authorization permission={['Administrador']}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        title="Ativar"
                                        onClick={() => this.props.update({...record, status: "Ativo"})}>
                                        <i className="fa fa-check"></i>
                                    </button>
                                </Authorization>
                                : null
                            }
                        </Fragment>
                    );
                }
            }
        ]
    }

    render() {
        return (
            <div>
                {this.state.showModalDelete ?
                    <ModalDelete
                        show={this.state.showModalDelete}
                        idDelete={this.state.idDelete}
                        destroy={this.props.destroy}
                        setShowModalDelete={this.setShowModalDelete} />
                    : null}
                <ContentHeader title='Consulta Condomínios' small='' />
                <Content>
                    <div className="card-body">
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


Condominiums = withRouter(Condominiums)
const mapStateToProps = state => ({ list: state.Condominiums.listCondominiums })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, destroy, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Condominiums)
