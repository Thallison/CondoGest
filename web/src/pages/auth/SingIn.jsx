import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login, setPermissions } from "../../services/auth";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async (e) => {
    this.setState({ error: "" });
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        var responseAuth = await api
          .post("/users/login", { email, password })
          .then((resp) => resp)
          .catch((resp) => {
            if (typeof resp.response !== "undefined") {
              throw new Error(resp.response.data.error.message);
            }
            throw new Error("Houve um problema na conexão com o servidor");
          });
        login(responseAuth.data);
        var response = await api.get(`/users/${responseAuth.data.id}`);
        setPermissions(response.data);
        this.props.history.push("/app");
        this.props.history.go(0);
      } catch (err) {
        this.setState({
          error: err.message
            ? err.message
            : "Houve um problema com o login, verifique suas credenciais."
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
          <div className="card py-4 px-4">
            <div className="card-body login-card-body">
              <div className="login-logo">
                <div className="d-flex flex-column align-items-center pb-3">
                  <img src="condogest.png" alt="Logo CONDOGEST" />
                </div>
              </div>

              <form onSubmit={this.handleSignIn}>
                {this.state.error && (
                  <p className="text-center text-danger">{this.state.error}</p>
                )}
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <button type="submit" className="btn btn-request btn-block">
                    Entrar
                  </button>
                </div>
                <div className="form-group row justify-content-center">
                  <Link to="/forgot_password" className="link-clean">Esqueci minha senha</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
