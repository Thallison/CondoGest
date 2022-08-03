import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList() {
    const request = api.get("sector_accounts")
    return {
        type: 'SECTOR_ACCOUNTS_FETCHED',
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
    var accounts = []
    Object.keys(values.account).forEach((key)=>{ 
        if(values.account[key])
        { 
            accounts.push(key)
        } 
    })
    const data = {
        account: accounts
    }
    const id = sectorId ? sectorId : ''
    return dispatch => {
        api[method](`/sector_accounts/${id}`, data)
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
    api.get(`/sector_accounts/${id}`)
        .then(resp => {
            var data = []
            Object.keys(resp.data).forEach((key)=>{ 
                data[key]= resp.data[key]
            })  

            dispatch([
                initialize('sectorStandardForm', {account: data})
            ])
        })
}

export function showSectorInspection(e, id) {
    return dispatch => 
    api.get(`/sector_accounts/${id}`)
        .then(resp => {
            var data = []
            Object.keys(resp.data).forEach((key)=>{ 
                data[key]= {applicable: resp.data[key]}
            })  
            dispatch([
                initialize('inspectionForm', {
                    company_id: e.value,
                    companyName: e.companyName,
                    account: data})
            ])
        })
}
