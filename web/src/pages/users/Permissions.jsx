import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import ModalDelete from '../template/ModalDelete'
import PermissionForm from './PermissionForm'

import { getList, create, update, destroy, showUpdate } from '../../redux/permissions/action/rolesAction'

import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalDelete: false,
            idDelete: null,
            functionCreateOrUpdateModal: null
        }
        this.setShowModalDelete = this.setShowModalDelete.bind(this);
     }

    setShowModalDelete(bool, idDelete = null){
        this.setState({
            showModalDelete: bool,
            idDelete: idDelete
        })
    }

    setCreateOrUpdateModal(param){
            console.log(param)
            this.setState({
                functionCreateOrUpdateModal: param
            })
    }

    componentDidMount() {
        this.props.getList()
    }

    getColumns(){
        return [               
            {
                name: 'Nome',
                selector: 'name',
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
                            <button
                                className="btn btn-info btn-sm"
                                title="Atribuir Permissões ao Perfil"
                                onClick={() => this.props.history.push(`/app/permissoes_perfil/${record.id}`)}
                                >
                                <i className="fa fa-chalkboard-teacher"></i>
                            </button>
                            <button
                                className="btn btn-warning btn-sm"
                                title="Editar Perfil"
                                onClick={() => {
                                    this.props.showUpdate(record.id)
                                    this.setCreateOrUpdateModal('update')
                                }}
                                data-toggle="modal" data-target="#modal-perfil"
                                >
                                <i className="fa fa-pen"></i>
                            </button>
                            <button 
                                className="btn btn-danger btn-sm"
                                title="Excluir Perfil"
                                onClick={() => 
                                    this.setShowModalDelete(true, record.id)
                                }>
                                <i className="fa fa-trash-alt"></i>
                            </button>
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
                setShowModalDelete={this.setShowModalDelete}/>
            : null}
            <ContentHeader title='Consulta Perfis de Permissões' small=''/> 

            <Content>
                <div>
                    <button 
                        onClick={() => {
                            this.setCreateOrUpdateModal('create')
                            }
                        } 
                        type="button"
                        className="btn btn-primary float-right mr-4 mt-2" 
                        data-toggle="modal" 
                        data-target="#modal-perfil">
                        Adicionar Perfil
                    </button>
                    <div className="modal fade" id="modal-perfil">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Adicionar Perfil</h4>
                                    <button type="button" 
                                        className="close" 
                                        data-dismiss="modal" 
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <PermissionForm onSubmit={this.state.functionCreateOrUpdateModal === 'create'?  this.props.create : this.props.update } labelButton="Salvar"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        paginationComponentOptions ={
                            {rowsPerPageText: 'Registros por página:', 
                            rangeSeparatorText: 'de', 
                            noRowsPerPage: false, 
                            selectAllRowsItem: false, 
                            selectAllRowsItemText: 'Todos'}

                        }
                        />
                </DataTableExtensions>
                </div>
            </Content>
            </div>
        )
    }
}


Permissions = withRouter(Permissions)
const mapStateToProps = state => ({list: state.Roles.listRoles})
const mapDispatchToProps = dispatch => bindActionCreators({getList, create, update, destroy, showUpdate}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Permissions)