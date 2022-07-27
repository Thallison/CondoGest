import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";

class ForgotPassword extends Component {
    state = {
      email: "",
      error: "",
      success: ""
    };
  
    handleForgotPassword = async e => {
        this.setState({ error: "", success: "" });
        e.preventDefault();
        const { email } = this.state;
        const url = "http://localhost:3000/#/reset_password"
        if (!email) {
            this.setState({ error: "Preencha o seu e-mail para continuar!" });
    } else {
        try {
            const response = await api.post("/passwords", { email, redirect_url: url});
            console.log(response);
            if(typeof response.data.error !== 'undefined'){
                this.setState({
                    error: response.data.error.message
              });
            } else {
                this.setState({
                    success: response.data.success
                });
            }
        } catch (err) {
            this.setState({
                error:
                "Houve um problema ao tentar recuperar sua senha! Verifique se o seu email está correto."
          });
        }
      }
    };
  
    render() {
      return (
        <div className="login-page" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/background_login.png)`
          }}>
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <div className='text-center'>
                            <h2>Esqueci minha senha</h2>
                            <p>Insira o seu email e enviaremos um link para você voltar a acessar a sua conta.</p>
                        </div>

                        <form onSubmit={this.handleForgotPassword}>
                            
                            {this.state.error && <p className="text-center text-danger">{this.state.error}</p>}
                            {this.state.success && <p className="text-center text-success">{this.state.success}</p>}
                            <div className="input-group mb-4">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    onChange={e => this.setState({ email: e.target.value })}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button type="submit" className="btn btn-request btn-block">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default withRouter(ForgotPassword);