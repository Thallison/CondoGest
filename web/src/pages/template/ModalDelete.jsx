import React, { Component } from 'react'

export default class ModalDelete extends Component {

    componentDidMount() {
        window.$('#modal-default').modal('show');
    }

    handleOutsideClick(e){
        if(e.target.id === 'modal-default') this.onClose()
    }

    onClose(){
        this.props.setShowModalDelete(false)
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
                        <h4 className="modal-title">Excluir Registro</h4>
                        <button type="button" className="close" onClick={()=>this.onClose()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir este registro?
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" onClick={()=>this.onClose()} >Cancelar</button>
                                <button className="btn btn-danger" 
                                    onClick={()=>{
                                        if(typeof this.props.getId ==='undefined')
                                            this.props.destroy(this.props.idDelete)
                                        else
                                            this.props.destroy(this.props.idDelete, this.props.getId)
                                        this.onClose()
                                    }
                                }>Excluir</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}