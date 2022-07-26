import api from '../../../services/api'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm } from 'redux-form'


export function updatePassword(values){
    if(values.password !== values.confirmPassword){
        toastr.error('Erro', 'As senhas digitadas não correspondem')
        return
    }

    return submit({password: values.password}, 'put')
}

export function updateEmail(values){
    return submit(values, 'put')
}

function submit(values, method){

    return dispatch => {
        api[method](`/user_profile/0`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.') 
                dispatch([resetForm('userProfileForm')])
            })
            .catch(e => {
                if (e.response) {
                    // Request made and server responded
                    e.response.data.forEach(error =>toastr.error('Erro', error.message));

                  } 
            })
    }
}
