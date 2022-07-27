import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList() {
    const request = api.get("sector_standards")
    return {
        type: 'SECTOR_STANDARDS_FETCHED',
        payload: request
    }
}


export function create(values){
    return submit(values, 'post')
}

export function update(values, sectorId){
    return submit(values, 'put', sectorId)
}

function submit(values, method, sectorId){
    var standards = []
    Object.keys(values.standard).forEach((key)=>{ 
        if(values.standard[key])
        { 
            standards.push(key)
        } 
    })
    const data = {
        standard: standards
    }
    const id = sectorId ? sectorId : ''
    return dispatch => {
        api[method](`/sector_standards/${id}`, data)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id)])
                }
                else {
                    dispatch([resetForm('sectorStandardForm'), getList()])
                }
            })
            .catch(e => {
                if (e.response) {
                    // Request made and server responded
                    e.response.data.forEach(error =>toastr.error('Erro', error.message));

                  } 
            })
    }
}

export function showUpdate(id) {
    return dispatch => 
    api.get(`/sector_standards/${id}`)
        .then(resp => {
            var data = []
            Object.keys(resp.data).forEach((key)=>{ 
                data[key]= resp.data[key]
            })  

            dispatch([
                initialize('sectorStandardForm', {standard: data})
            ])
        })
}

export function showSectorInspection(e, id) {
    return dispatch => 
    api.get(`/sector_standards/${id}`)
        .then(resp => {
            var data = []
            Object.keys(resp.data).forEach((key)=>{ 
                data[key]= {applicable: resp.data[key]}
            })  
            dispatch([
                initialize('inspectionForm', {
                    company_id: e.value,
                    companyName: e.companyName,
                    standard: data})
            ])
        })
}
