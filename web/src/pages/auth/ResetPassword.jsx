import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";


class ResetPassword extends Component {
    state = {
      password: "",
      password2: "",
      error: "",
      success: ""
    };

  
    handleResetPassword = async e => {
      this.setState({ error: "", success: "" });
      e.preventDefault();
      const token = new URLSearchParams(this.props.location.search).get("token")
      const { password, password2 } = this.state;

      if (!password || !password2) {
        this.setState({ error: "Preencha os campos de senha para continuar!" });
      } else if (password !== password2){
        this.setState({ error: "As senhas digitadas não correspondem" });
      }else{
        try{
          const response = await api.put("/passwords", {password, token });

          if( typeof response.data.success !== 'undefined' ){
            this.setState({
              success: response.data.success
            });

            setTimeout(this.props.history.push('/'), 5000);
          }
          
        } catch (err) {
          this.setState({
            error:
              "Houve um problema ao alterar sua senha, caso ocorra novamente tente gerar um novo email de recuperação."
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
                            <h2>Alterar senha</h2>
                            <p>Digite sua nova senha.</p>
                        </div>

                    <form onSubmit={this.handleResetPassword}>
                        
                        {this.state.error && <p className="text-center text-danger">{this.state.error}</p>}
                        {this.state.success && <p className="text-center text-success">{this.state.success}</p>}
                        <div className="input-group mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Senha Nova"
                                onChange={e => this.setState({ password: e.target.value })}
                                />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-4">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Confirme sua Senha Nova"
                                onChange={e => this.setState({ password2: e.target.value })}
                                />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <button type="submit" className="btn btn-request btn-block">Alterar Senha</button>
                        </div>

                    </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default withRouter(ResetPassword);