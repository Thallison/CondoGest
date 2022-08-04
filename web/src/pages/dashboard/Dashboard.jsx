import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import Card from '../template/Card'
// import Grid from '../template/Grid'

import { getList } from '../../redux/dashboard/action/DashboardAction'

export class Dashboard extends Component {

    componentDidMount() {
        this.props.getList()
    }

    render() {
        
        const dashboard = this.props.list?.dashboard ? this.props.list.dashboard : [];

        return (
            <div>
                <ContentHeader title='Home' small='Dashboard'/>
                <Content>
                    <div className="card-body">
                        <div className="row">
                            <Card color="default" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].total : 0} 
                                text="Condomínio NOME" 
                                icon="building"/>

                            <Card color="default" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].finalizada : 0} 
                                text="Saldo fundo de caixa" 
                                icon="dollar-sign"/>

                            <Card color="default" 
                                amount={typeof dashboard[dashboard.length -1] !== 'undefined'?
                                    dashboard[dashboard.length -1].cancelada : 0} 
                                text="Prestação de contas" 
                                icon="clipboard-check"/>

                            {/* <Grid cols="12 12 12 6">
                                <div className={`small-box bg-danger`}>
                                    <div className="inner">
                                        <h2>Notificações</h2>
                                        <p>0</p>
                                    </div>
                                    <div className="icon">
                                        <i className={`fas fa-bell`}></i>
                                    </div>
                                </div>
                            </Grid> */}
                            
                            {/* <Grid cols="12 12 12 6">
                                <div className={`small-box bg-warning`}>
                                    <div className="inner">
                                        <h2>Reclamações</h2>
                                        <p>0</p>
                                    </div>
                                    <div className="icon">
                                        <i className={`fas fa-bullhorn`}></i>
                                    </div>
                                </div>
                            </Grid> */}
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