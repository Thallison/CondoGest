import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

export function  getList(status = null) {

    const params = {params: {status: status}}

    const request = api.get("condominium", params)
    return {
        type: 'CONDOMINIUM_FETCHED',
        payload: request
    }
}


export function create(values){
    console.log(values)
    return submit(values, 'post')
}

export function update(values){
    return submit(values, 'put')
}

function submit(values, method){
    const id = values.id ? values.id : ''
    console.log(values)
    return dispatch => {
        api[method](`/condominium/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                if (id) {
                    dispatch([showUpdate(id), getList()])
                }
                else {
                    dispatch([resetForm('condominiumForm')])
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
    api.get(`/condominium/${id}`)
        .then(resp => {
            dispatch([
                initialize('condominiumForm', resp.data)
            ])
        })
}

export function destroy(id) {
    return dispatch => 
    api.delete(`/condominium/${id}`)
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso.')
            dispatch([
                getList()
            ])
        })
}