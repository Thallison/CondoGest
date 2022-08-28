import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ContentHeader from "../template/ContentHeader";
import Content from "../template/Content";
import Card from "../template/Card";
// import Grid from '../template/Grid'
import { getUserData, isAdmin } from "../../services/auth";

import { getList } from "../../redux/dashboard/action/DashboardAction";
import { getList as getListCondominiums } from "../../redux/condominiums/action/condominiumsAction";
import { getList as getListAccounts } from "../../redux/accounts/action/accountsAction";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getList();
    this.props.getListCondominiums();
    this.props.getListAccounts();
    // console.log(getUserData);
  }

  render() {
    const dashboard = this.props.list?.dashboard
      ? this.props.list.dashboard
      : [];

    const condominiums = this.props.listCondominiums
      ? this.props.listCondominiums
      : [];

    const condominioName = condominiums.find(
      (c) => c.id == getUserData.condominiumsId
    )?.name;

    const accounts = this.props.listAccounts ? this.props.listAccounts : [];

    const currentMonth = new Date().getMonth();

    const myAccounts =  accounts
    .filter(
      (a) =>
        a.condominiumsId == getUserData.condominiumsId &&
        new Date(a.dueDate).getMonth() == currentMonth
    );

    const lastAccounts = myAccounts.slice(0, 3);

    const allPrices = myAccounts.map((el) => {
      return Number(el.price.split('.').join('').split(',').join('.'));
    });

    const total = allPrices.reduce((a, b) => a + b, 0)
  
    return (
      <div>
        <ContentHeader title="Home" small="Dashboard" />
        <Content>
          <div className="card-body">
            <div className="row">
              {isAdmin ? (
                <Card
                  color="default"
                  text={
                    typeof condominiums[condominiums.length - 1] !== "undefined"
                      ? condominiums.length - 1
                      : 0
                  }
                  amount="Condomínios"
                  icon="building"
                />
              ) : (
                <Card
                  color="default"
                  amount={
                    lastAccounts !== ""
                      ? lastAccounts.map(
                          (l) => l.name + ": R$ " + l.price
                        )
                      : "Sem contas"
                  }
                  subtext={new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric"
                  })}
                  text={"Condomínio " + condominioName}
                  icon="building"
                />
              )}

              <Card
                color="default"
                amount={
                  `Valor total: ${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
                }
                subtext={new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric"
                })}
                text="Contas"
                icon="dollar-sign"
              />

              {/* <Card
                color="default"
                amount={
                  typeof dashboard[dashboard.length - 1] !== "undefined"
                    ? dashboard[dashboard.length - 1].cancelada
                    : 0
                }
                text="Prestação de contas"
                icon="clipboard-check"
              /> */}

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
    );
  }
}

Dashboard = withRouter(Dashboard);
const mapStateToProps = (state) => ({
  list: state.Dashboard.listDashboard,
  listCondominiums: state.Condominiums.listCondominiums,
  listAccounts: state.Accounts.listAccounts
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getList, getListCondominiums, getListAccounts },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
