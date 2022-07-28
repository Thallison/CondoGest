import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Line,Bar } from "react-chartjs-2";
import moment from 'moment'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import Card from '../template/Card'
import Grid from '../template/Grid'
import DataTable from 'react-data-table-component';

import { getList } from '../../redux/dashboard/action/DashboardAction'

export class Dashboard extends Component {

    componentDidMount() {
        this.props.getList()
    }

    getColumns() {
        return [
            {
                name: 'Empresa',
                selector: 'companyName',
            },
            {
                name: 'CNPJ',
                selector: 'cnpj',
            },
            {
                name: 'Data Última Vistoria',
                selector: 'date_inspection',
                format: row => moment(row.date_inspection).format('DD/MM/YYYY HH:mm:ss')
            },
            {
                name: 'Dias atrasados',
                selector: 'delay',
            },            
        ]
    }

    render() {
        
        const dashboard = this.props.list?.dashboard ? this.props.list.dashboard : [];

        const data = {
            labels: dashboard.map(e => e.mes_ano),
            datasets: [
                {
                    label: "Total",
                    data: dashboard.map(e => e.total),
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Finalizadas",
                    data: dashboard.map(e => e.finalizada),
                    fill: true,
                    backgroundColor: "rgba(40,167,69,0.2)",
                    borderColor: "rgba(40,167,69,1)"
                },
                {
                    label: "Canceladas",
                    data: dashboard.map(e => e.cancelada),
                    fill: true,
                    backgroundColor: "rgba(220,53,69,0.2)",
                    borderColor: "rgba(220,53,69,1)"
                },
                {
                    label: "Em aberto",
                    data: dashboard.map(e => e.em_aberto),
                    fill: true,
                    backgroundColor: "rgba(255,193,7,0.2)",
                    borderColor: "rgba(255,193,7,1)"
                },
            ]
          };
        return (
            <div>
                <ContentHeader title='Dashboard' small='Geral' />
                <Content>
                    <div className="card-body">
                        <div className="row">
                            <Card color="info" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].total : 0} 
                                text="Vistorias Realizadas no Mês" 
                                icon="clipboard-list"/>

                            <Card color="success" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].finalizada : 0} 
                                text="Vistorias Finalizadas no Mês" 
                                icon="clipboard-check"/>

                            <Card color="danger" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].cancelada : 0} 
                                text="Vistorias Canceladas no Mês" 
                                icon="times-circle"/>

                            <Card color="warning" 
                                amount={typeof dashboard !== 'undefined'? 
                                    dashboard.reduce(((accumulator, currentValue) => accumulator + currentValue.em_aberto), 0) : 0} 
                                text="Vistorias em Aberto" 
                                icon="edit"/>

                        </div>
                        <div className="row">
                            <Grid cols="12 12 12 6">
                                <h4>Vistorias no último ano</h4>
                                <Line data={data} />
                            </Grid>
                            <Grid cols='12 12 12 6'>
                                <h4>Vistorias no mês</h4>
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
                                            'Finalizadas',
                                            'Canceladas',
                                            'Em aberto'
                                        ],
                                        datasets: [{
                                            scaleOverride: true,
                                            scaleSteps: 9,
                                            scaleStartValue: 0,
                                            data: [
                                                typeof dashboard[dashboard.length -1] !== 'undefined'? dashboard[dashboard.length -1].finalizada : 0,
                                                typeof dashboard[dashboard.length -1] !== 'undefined'? dashboard[dashboard.length -1].cancelada : 0,
                                                typeof dashboard[dashboard.length -1] !== 'undefined'? dashboard[dashboard.length -1].em_aberto : 0
                                            ],
                                            backgroundColor: [
                                                'rgba(40,167,69,1)',
                                                'rgba(220,53,69,1)',
                                                'rgba(255,193,7,1)'
                                            ],
                                            hoverBackgroundColor: [
                                                'rgba(40,167,69,1)',
                                                'rgba(220,53,69,1)',
                                                'rgba(255,193,7,1)'
                                            ]
                                        }]
                                    }} />
                            </Grid>


                        </div>
                        <div className="row">
                            <h4 className='mb-4'>Vistorias atrasadas</h4>
                                <DataTable
                                    columns={this.getColumns()}
                                    data={this.props.list?.recurrence}
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
                        </div>
                    </div>

                </Content>
            </div>
        )
    }
}

Dashboard = withRouter(Dashboard)
const mapStateToProps = state => ({ list: state.Dashboard.listDashboard})
const mapDispatchToProps = dispatch => bindActionCreators({ getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)