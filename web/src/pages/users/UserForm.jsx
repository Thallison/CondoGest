import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { showUpdate } from "../../redux/users/action/usersAction";
import { getList } from "../../redux/permissions/action/rolesAction";
import LabelAndInput from "../template/LabelAndInput";

export class UserForm extends Component {
  componentDidMount() {
    this.props.getList();
    if (this.props.match.params.id)
      this.props.showUpdate(this.props.match.params.id);
  }

  renderSelectPerfil() {
    let permissionsList = [
      "Administrador",
      "Síndico",
      "Proprietário",
      "Morador"
    ];
    const options = permissionsList.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ));
    return options;
  }

  renderSelectStatus() {
    let statusList = ["Ativo", "Inativo", "Desabilitado"];
    const options = statusList.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ));
    return options;
  }

  render() {
    const { handleSubmit } = this.props;
    const button = this.props.disabled ? (
      ""
    ) : (
      <div className="box-footer">
        <button type="submit" className="btn btn-primary">
          {this.props.labelButton}
        </button>
      </div>
    );

    return (
      <form onSubmit={handleSubmit}>
        <div className="box-body">
          <div className="row">
            <h4 className="col-12">Dados Gerais</h4>
            <Field
              name="name"
              component={LabelAndInput}
              type="text"
              label="Nome:"
              cols="12 4"
              placeholder="Informe o nome completo"
              required={true}
              disabled={this.props.disabled}
            />

            <Field
              name="email"
              component={LabelAndInput}
              type="email"
              label="Email:"
              cols="12 4"
              placeholder="Informe o email"
              required={true}
              disabled={this.props.disabled}
            />

            <Field
              name="cpf"
              component={LabelAndInput}
              type="text"
              label="CPF:"
              cols="12 4"
              placeholder="Informe o cpf"
              required={true}
              disabled={this.props.disabled}
              normalize={(input) => {
                if (!input) return;

                return input
                  .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
                  .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})(\d)/, "$1-$2")
                  .replace(/(-\d{2})\d+?$/, "$1");
              }}
            />

            <div className="form-group col-xs-12 col-sm-4">
              <label>Status: *</label>
              <Field
                name="status"
                component="select"
                className="form-control"
                required={true}
                disabled={this.props.disabled}
              >
                <option value="">Selecione um status</option>
                {this.renderSelectStatus()}
              </Field>
            </div>

            <div className="form-group col-xs-12 col-sm-4">
              <label>Perfil: *</label>
              <Field
                name="role"
                component="select"
                className="form-control"
                required={true}
                disabled={this.props.disabled}
              >
                <option value="">Selecione um perfil</option>
                {this.renderSelectPerfil()}
              </Field>
            </div>

            <Field
              name="apartment"
              component={LabelAndInput}
              label="Apartamento:"
              cols="12 4"
              placeholder="Informe o apartament"
              required={true}
              disabled={this.props.disabled}
            />

            <Field
              name="rg"
              component={LabelAndInput}
              type="text"
              label="RG:"
              cols="12 4"
              placeholder="Informe o RG"
              disabled={this.props.disabled}
            />

            <Field
              name="dispatchingAgency"
              component={LabelAndInput}
              type="text"
              label="Orgão Emissor:"
              cols="12 4"
              placeholder="Informe o Orgão Emissor:"
              disabled={this.props.disabled}
            />

            <Field
              name="issueDate"
              component={LabelAndInput}
              type="date"
              label="Data de Emissão:"
              cols="12 4"
              placeholder="Informe o data de emissão"
              disabled={this.props.disabled}
            />
          </div>
        </div>
        {button}
      </form>
    );
  }
}

UserForm = withRouter(UserForm);
UserForm = reduxForm({ form: "userForm" })(UserForm);
const mapStateToProps = (state) => ({ list: state.Roles.listRoles });
const mapDispactchToProps = (dispatch) =>
  bindActionCreators({ showUpdate, getList }, dispatch);
export default connect(mapStateToProps, mapDispactchToProps)(UserForm);
