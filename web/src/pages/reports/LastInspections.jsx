import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select'

import ContentHeader from '../template/ContentHeader'
import Content from '../template/Content'
import Grid from '../template/Grid'
import LabelAndInput from '../template/LabelAndInput';

import { getList } from '../../redux/reports/action/LastInspectionsAction'
import { getList as getListCompanies } from '../../redux/companies/action/companiesAction'


export class Inspection extends Component {

    componentDidMount() {
        this.props.getListCompanies()
    }

    onSubmit = data => {
        this.props.getList(data)
    }

    renderForm() {
      const options = this.props.listCompanies.map(e => { return { value: e.id, label: e.id + ' - ' + e.companyName + ' - ' + e.cnpj, sector: e.sector_id, companyName: e.companyName } })
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="row">
                    <Grid cols='12 12'>
                        <Select
                          options={options}
                          placeholder="Selecione a empresa"
                          isClearable
                          onChange={(e) => {
                              this.props.change('company_id', e != null ? e.value : null)
                          }

                        }
                      />
                    </Grid>
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
                    className="btn btn-success float-right mb-4"
                    type="submit">
                    <i className="fas fa-filter"></i> Filtrar
                </button>
            </form>
        )
    }

    render() {

          const options = {
            scales: {
              yAxes: [
                {
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }

        return (
            <div>

                <ContentHeader title='Status das Últimas Vistorias' small='' />
                <Content>
                    <div className="card-body">
                        {this.renderForm()}
                        <Bar data={this.props.list} options={options} />
                    </div>
                </Content>
            </div>
        )
    }
}


Inspection = withRouter(Inspection)
Inspection = reduxForm({ form: 'inspectionFilters' })(Inspection)
const mapStateToProps = state => ({ list: state.Reports.listLastInspections, listCompanies: state.Companies.listCompanies })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, getListCompanies }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Inspection)
