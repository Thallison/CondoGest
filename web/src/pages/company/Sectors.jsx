import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import ModalDelete from '../template/ModalDelete'
import SectorForm from './SectorForm'

import { getList, create, update, destroy, showUpdate } from '../../redux/companies/action/sectorsAction'

import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

export class Sectors extends Component {
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
                                title="Atribuir Normas ao Setor"
                                onClick={() => this.props.history.push(`/app/normas_setor/${record.id}`)}
                                >
                                <i className="fa fa-paste"></i>
                            </button>
                            <button
                                className="btn btn-warning btn-sm"
                                title="Editar Setor"
                                onClick={() => {
                                    this.props.showUpdate(record.id)
                                    this.setCreateOrUpdateModal('update')
                                }}
                                data-toggle="modal" data-target="#modal-sector"
                                >
                                <i className="fa fa-pen"></i>
                            </button>
                            <button 
                                className="btn btn-danger btn-sm"
                                title="Excluir Setor"
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
            {this.state.showModalDelete?
            <ModalDelete 
                show={this.state.showModalDelete} 
                idDelete={this.state.idDelete} 
                destroy={this.props.destroy} 
                setShowModalDelete={this.setShowModalDelete}/>
            : null}
            <ContentHeader title='Consulta Setores de Empresas' small=''/> 

            <Content>
                <div className="justify-content-end">
                    <button 
                        onClick={() => {
                            this.setCreateOrUpdateModal('create')
                            }
                        } 
                        type="button"
                        className="btn btn-success float-right mr-4 mt-2" 
                        data-toggle="modal" 
                        data-target="#modal-sector">
                        Adicionar Setor
                    </button>
                    <div className="modal fade" id="modal-sector">
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title">Adicionar Setor</h4>
                            <button type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div className="modal-body">
                                <SectorForm onSubmit={this.state.functionCreateOrUpdateModal === 'create'?  this.props.create : this.props.update } labelButton="Salvar"/>
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


Sectors = withRouter(Sectors)
const mapStateToProps = state => ({list: state.Sectors.listSectors})
const mapDispatchToProps = dispatch => bindActionCreators({getList, create, update, destroy, showUpdate}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Sectors)