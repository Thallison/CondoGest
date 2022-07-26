import React, { Component } from 'react'

export default class ModalInspactionConfirmation extends Component {

    componentDidMount() {
        window.$('#modal-default').modal('show');
    }

    handleOutsideClick(e){
        if(e.target.id === 'modal-default') this.onClose()
    }

    onClose(){
        this.props.setShowModal(false)
        window.$('#modal-default').modal('hide')
    }
    
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal fade" id="modal-default" onClick={(e)=>this.handleOutsideClick(e)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title">Confirme sua ação</h4>
                        <button type="button" className="close" onClick={()=>this.onClose()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            Ao realizar esta ação, não será mais possivel editar a vistoria. Deseja continuar?
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" onClick={()=>this.onClose()} >Cancelar</button>
                                <button className={`btn btn-${this.props.colorButtonModal}`} 
                                    onClick={()=>{
                                        this.props.update({id: this.props.id, status: this.props.status })
                                        this.onClose()
                                    }
                                }>{this.props.labelButton}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}