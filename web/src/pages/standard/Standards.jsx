import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import ModalDelete from '../template/ModalDelete'
import Authorization from '../template/Authorization'

import { getList, update, destroy } from '../../redux/standards/action/standardsAction'

import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export class Standards extends Component {
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
                name: 'Código Norma',
                selector: 'codeStandard',
                sortable: true,
            },
            {
                name: 'Nome',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Categoria',
                selector: 'category',
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
                            <Authorization permission='standard_view'>
                                <button
                                    className="btn btn-info btn-sm"
                                    title="Visualizar"
                                    onClick={() => this.props.history.push(`/app/normas/view/${record.id}`)}
                                >
                                    <i className="fa fa-eye"></i>
                                </button>
                            </Authorization>
                            <Authorization permission='standard_edit'>
                                <button
                                    className="btn btn-warning btn-sm"
                                    title="Editar"
                                    onClick={() => this.props.history.push(`/app/normas/edit/${record.id}`)}
                                >
                                    <i className="fa fa-pen"></i>
                                </button>
                            </Authorization>
                            { record.status !== 'Inativo' ?
                                <Authorization permission='standard_delete'>
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
                                <Authorization permission='standard_delete'>
                                    <button
                                        className="btn btn-success btn-sm"
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
                <ContentHeader title='Consulta Normas' small='' />
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


Standards = withRouter(Standards)
const mapStateToProps = state => ({ list: state.Standards.listStandards })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, destroy, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Standards)
