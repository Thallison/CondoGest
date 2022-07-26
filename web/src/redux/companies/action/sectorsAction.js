import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'

export function  getList() {
    const request = api.get("sectors")
    return {
        type: 'SECTORS_FETCHED',
        payload: request
    }
}


export function create(values){
    return submit(values, 'post')
}

export function update(values){
    return submit(values, 'put')
}

function submit(values, method){
    const id = values.id ? values.id : ''
    return dispatch => {
        api[method](`/sectors/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch([initialize('sectorForm', {}), getList()])
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
    api.get(`/sectors/${id}`)
        .then(resp => {
            dispatch([
                initialize('sectorForm', resp.data)
            ])
        })
}

export function destroy(id) {
    return dispatch => 
    api.delete(`/sectors/${id}`)
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso.')
            dispatch([
                getList()
            ])
        })
}