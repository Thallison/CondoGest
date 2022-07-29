import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showUpdate, update } from '../../redux/companies/action/sectorStandardsAction'
import { getList } from '../../redux/standards/action/standardsAction'
import LabelAndCheckboxInput from '../template/LabelAndCheckboxInput'
import Accordion from '../template/Accordion'

export class SectorStandardForm extends Component {
    componentDidMount(){
        if(this.props.match.params.id)
        this.props.showUpdate(this.props.match.params.id)
        this.props.getList('Ativo')
    }

    renderCategory(){
        var uniqueCategory = this.props.list.map(item => item.category)
         .filter((value, index, self) => self.indexOf(value) === index)
        
        return uniqueCategory.map(category => {
            let standards = this.props.list.filter((value) => value.category === category)
            return (
                <Accordion key={category} title={category}>
                    {standards.map(standard => 
                        <Field key={standard.id}
                        name={`standard.${standard.id}`} 
                        component={LabelAndCheckboxInput} 
                        type='checkbox'
                        label={standard.codeStandard + ' - ' + standard.description}
                        id={standard.id}
                        padding={''}
                        /> 
                    )}
                </Accordion>
            )
        })
    }

    onSubmit = (values, _, props) => {
        this.props.update(values,this.props.match.params.id)
    }

    render() {
        const {handleSubmit} = this.props
        return (
                    
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <div className="box-body">
                            {this.renderCategory()}
                        </div>
                        <div className="box-footer">
                            <button type='submit' className="btn btn-primary">{this.props.labelButton}</button>
                        </div>
                        
                    </form>
        )
    }
}


SectorStandardForm = withRouter(SectorStandardForm)
SectorStandardForm = reduxForm({form: 'sectorStandardForm'})(SectorStandardForm)
const mapStateToProps = state => ({list: state.Standards.listStandards})
const mapDispactchToProps = dispatch => bindActionCreators({showUpdate, getList, update}, dispatch)
export default connect(mapStateToProps, mapDispactchToProps)(SectorStandardForm)

