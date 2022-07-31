import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import FieldFileInput from '../template/FieldFileInput';
import ContentHeader from '../template/ContentHeader';
import Content from '../template/Content';
import Grid from '../template/Grid';
import ModalDelete from '../template/ModalDelete'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

import { getList, create, destroy as destroyFile } from '../../redux/inspection/action/inspectionFilesAction'
import { getInspection } from '../../redux/inspection/action/inspectionAction'

const renderField = ({ input, label, type, cols }) => (
    <Grid cols={cols}>
        <div className="form-group">
            <input {...input} type={type} placeholder={label} className='form-control' />
        </div>
    </Grid>
);

export class InspectionFiles extends Component {

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

    getColumns() {
        return [
            {
                name: 'Evidência',
                grow: 0.15,
                cell: row => <img style={{ width: '100%' }} alt={row.baseUrl} src={row.baseUrl} />,

            },
            {
                name: 'Observação',
                selector: 'comments',
                sortable: true,
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                grow: 0,
                align: "left",
                sortable: false,
                cell: record => {
                    if (this.props.inspection.status === 0)
                        return (
                            <button
                                className="btn btn-danger btn-sm"
                                title="Excluir"
                                onClick={() =>
                                    this.setShowModalDelete(true, record.id)
                                }>
                                <i className="fa fa-trash-alt"></i>
                            </button>
                        );
                }
            }
        ]
    }

    onSubmit = data => {
        this.props.create(data, this.props.match.params.id)
    }

    componentDidMount() {
        this.props.getList(this.props.match.params.id)
        this.props.getInspection(this.props.match.params.id)
    }

    renderForm() {
        const { reset } = this.props
        if (this.props.inspection.status === 0)
            return (
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="row">
                        <Field
                            cols="12 3"
                            name="file"
                            type="file"
                            component={FieldFileInput}
                            label="Arquivo"
                            id="file"
                            value={null}
                            required={true}
                        />
                        <Field
                            cols="12 6"
                            name="comments"
                            type="text"
                            component={renderField}
                            label="Observação"
                        />
                        <Grid cols="6 1">
                            <button
                                className="btn btn-default"
                                type="button"
                                title="Limpar"
                                onClick={reset}>
                                <i className="fa fa-sync-alt"></i>
                            </button>
                        </Grid>
                        <Grid cols="6 2">
                            <button
                                className="btn btn-primary float-right"
                                type="submit">
                                <i className="fas fa-plus"></i> Evidência
                                        </button>
                        </Grid>
                    </div>
                </form>
            )
    }

    render() {


        return (
            <div>
                {this.state.showModalDelete ?
                    <ModalDelete
                        show={this.state.showModalDelete}
                        idDelete={this.state.idDelete}
                        destroy={this.props.destroyFile}
                        getId={this.props.match.params.id}
                        setShowModalDelete={this.setShowModalDelete} />
                    : null}
                <ContentHeader title='Adicionar Evidências à Vistoria' />
                <Content>
                    <div className="card-body">
                        <div className="row">
                            <Grid cols="12 12">
                                <button
                                    className="btn btn-secondary float-right mb-3"
                                    type="button"
                                    title="Detalhes Vistoria"
                                    onClick={() => this.props.history.push(`/app/vistorias/detalhes/${this.props.match.params.id}`)}>
                                    <i className="fas fa-arrow-left"></i> Detalhes Vistoria
                                </button>
                            </Grid>
                        </div>
                        {this.renderForm()}
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

InspectionFiles = withRouter(InspectionFiles)
InspectionFiles = reduxForm({ form: 'inspectionFilesForm' })(InspectionFiles)
const mapStateToProps = state => { return { list: state.Inspections.listInspectionEvidences, inspection: state.Inspections.listInspection } }
const mapDispactchToProps = dispatch => bindActionCreators({ getList, create, destroyFile, getInspection }, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(InspectionFiles);
