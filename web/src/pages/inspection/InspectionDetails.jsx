import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import Grid from '../template/Grid';
import { Pie, Bar } from 'react-chartjs-2';

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import ModalInspectionConfirmation from '../template/ModalInspectionConfirmation'

import { getList, showUpdate, update, destroy, createPDF } from '../../redux/inspection/action/inspectionAction'

export class Inspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            id: null,
            colorButtonModal: 'secondary',
            status: 0,
            labelButton: 'Confirmar'
        }
        this.setShowModal = this.setShowModal.bind(this);
    }


    setShowModal(bool, id = null, status, colorButtonModal, labelButton) {
        this.setState({
            showModal: bool,
            id: id,
            status: status,
            colorButtonModal: colorButtonModal,
            labelButton: labelButton
        })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.showUpdate(this.props.match.params.id)
        }
    }

    renderButtons(status) {
        var buttonsOpen = null;
        if (status === 0) {
            buttonsOpen = <>
                <button
                    className="btn btn-warning btn-sm ml-1"
                    title="Editar Vistoria"
                    onClick={() => this.props.history.push(`/app/vistorias/edit/${this.props.match.params.id}`)}
                >
                    <i className="fa fa-pen"></i>
                    <span className='ml-1'>Editar Vistoria</span>
                </button>
                <button
                    className="btn btn-danger btn-sm ml-1"
                    title="Cancelar Vistoria"
                    onClick={() => this.setShowModal(true, this.props.match.params.id, 1, 'danger', 'Cancelar Vistoria')}
                >
                    <i className="fa fa-times"></i>
                    <span className='ml-1'>Cancelar Vistoria</span>
                </button>
                <button
                    className="btn btn-success btn-sm ml-1"
                    title="Finalizar Vistoria"
                    onClick={() => this.setShowModal(true, this.props.match.params.id, 2, 'success', 'Finalizar Vistoria')}
                >
                    <i className="fa fa-check"></i>
                    <span className='ml-1'>Finalizar Vistoria</span>
                </button>
            </>
        }
        if (status === 2) {
            buttonsOpen = <>
                <button
                    className="btn btn-primary btn-sm ml-1"
                    title="Editar Vistoria"
                    onClick={() => {
                        this.props.createPDF(this.props.match.params.id)
                    }
                    }
                >
                    <i className="fa fa-file-pdf"></i>
                    <span className='ml-1'>Baixar PDF</span>
                </button>
            </>
        }

        return (<div className="row">
            <Grid cols='12 12'>
                <h4>Ações</h4>
            </Grid>
            <button
                className="btn btn-info btn-sm"
                title="Acessar Detalhes da Vistoria"
                onClick={() => this.props.history.push(`/app/vistorias/view/${this.props.match.params.id}`)}
            >
                <i className="fa fa-eye"></i>
                <span className='ml-1'>Visualizar Formulário Preenchido</span>
            </button>
            <button
                className="btn btn-secondary btn-sm ml-1"
                title="Editar Vistoria"
                onClick={() => this.props.history.push(`/app/vistorias/add/files/${this.props.match.params.id}`)}
            >
                <i className="fa fa-file-image"></i>
                <span className='ml-1'>Anexar Evidências</span>
            </button>
            {buttonsOpen}


        </div>)
    }

    render() {
        const inspection = this.props.list
        var color, label
        if ('status' in inspection)
            switch (inspection.status) {
                case 0:
                    color = 'warning'
                    label = 'Em aberto'
                    break;
                case 1:
                    color = 'danger'
                    label = 'Cancelada'
                    break;
                case 2:
                    color = 'success'
                    label = 'Finalizada'
                    break;
                default:
                    color = ''
                    label = ''
            }
        return (
            <div>
                {this.state.showModal ?
                    <ModalInspectionConfirmation
                        show={this.state.showModal}
                        id={this.state.id}
                        update={this.props.update}
                        setShowModal={this.setShowModal}
                        colorButtonModal={this.state.colorButtonModal}
                        status={this.state.status}
                        labelButton={this.state.labelButton}
                    />
                    : null}
                <ContentHeader title='Detalhes Vistoria' small={`Código: ${typeof inspection !== 'undefined' ? inspection.id : null}`} />
                <Content>
                    <div className="card-body">
                        <div className="row">
                            <Grid cols='12 10'>
                                <h4 >Informações</h4>
                            </Grid>
                            <Grid cols='12 2'>
                                <span className={`badge badge-${color} p-3`}>{label}</span>
                            </Grid>
                        </div>
                        <hr />
                        <div className="row">
                            <Grid cols='12 6'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span className='font-weight-bold'>Detalhes:</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className='font-weight-bold'>CNPJ: </span> {`${'company' in inspection ? inspection.company.cnpj : null}`}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-weight-bold'>Empresa: </span> {`${'company' in inspection  ? inspection.company.companyName : null}`}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-weight-bold'>Vistoriador: </span> {`${'user' in inspection  ? inspection.user.name : null}`}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-weight-bold'>Data da vistoria: </span> {`${'created_at' in inspection  ? moment(inspection.created_at).format('DD/MM/YYYY HH:mm:ss') : null}`}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                            <Grid cols='12 6'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span className='font-weight-bold'>Status de adequação:</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Não Atendido: </td>
                                            <td>{'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 1).length : null}</td>
                                        </tr>
                                        <tr>
                                            <td>Não Atendido,mas com iniciativas: </td>
                                            <td>{'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 2).length : null}</td>
                                        </tr>
                                        <tr>
                                            <td>Atende, mas há ressalvas: </td>
                                            <td>{'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 3).length : null}</td>
                                        </tr>
                                        <tr>
                                            <td>Atende: </td>
                                            <td>{'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 4).length : null}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </div>
                        <hr />
                        <div className="row">
                            <Grid cols='12 12'>
                                <h4 >Gráfico Status de Adequação</h4>
                            </Grid>
                            <Grid cols='12 6'>
                                <Pie data={{
                                    labels: [
                                        'Não Atendido',
                                        'Não Atendido,mas com iniciativas',
                                        'Atende, mas há ressalvas',
                                        'Atende'
                                    ],
                                    datasets: [{
                                        data: [
                                            'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 1).length : null,
                                            'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 2).length : null,
                                            'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 3).length : null,
                                            'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 4).length : null,
                                        ],
                                        backgroundColor: [
                                            '#FF6A66',
                                            '#FFB166',
                                            '#FFE166',
                                            '#63cf5a'
                                        ],
                                        hoverBackgroundColor: [
                                            '#FF6A66',
                                            '#FFB166',
                                            '#FFE166',
                                            '#63cf5a'
                                        ]
                                    }]
                                }} />
                            </Grid>
                            <Grid cols='12 6'>
                                <Bar options={{
                                    title: {
                                        text: "Custom Chart Title"
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                stepSize: 1
                                            }
                                        }]
                                    }
                                }}
                                    data={{
                                        labels: [
                                            'Não Atendido',
                                            'Não Atendido,mas com iniciativas',
                                            'Atende, mas há ressalvas',
                                            'Atende'
                                        ],
                                        datasets: [{
                                            scaleOverride: true,
                                            scaleSteps: 9,
                                            scaleStartValue: 0,
                                            data: [
                                                'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 1).length : null,
                                                'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 2).length : null,
                                                'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 3).length : null,
                                                'standards' in inspection ? inspection.standards.filter((obj) => obj.pivot.status === 4).length : null,
                                            ],
                                            backgroundColor: [
                                                '#FF6A66',
                                                '#FFB166',
                                                '#FFE166',
                                                '#63cf5a'
                                            ],
                                            hoverBackgroundColor: [
                                                '#FF6A66',
                                                '#FFB166',
                                                '#FFE166',
                                                '#63cf5a'
                                            ]
                                        }]
                                    }} />
                            </Grid>


                        </div>
                        <hr />
                        {this.renderButtons('status' in inspection ? inspection.status : null)}
                        <hr />

                    </div>
                </Content>
            </div>
        )
    }
}


Inspection = withRouter(Inspection)
const mapStateToProps = state => ({ list: state.Inspections.listInspection })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, update, destroy, createPDF }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Inspection)
