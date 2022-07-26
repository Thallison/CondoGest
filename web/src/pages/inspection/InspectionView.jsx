import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ContentHeader from "../template/ContentHeader";
import Content from "../template/Content";
import Grid from "../template/Grid";

import { getInspection } from "../../redux/inspection/action/inspectionAction";
import { getList } from "../../redux/inspection/action/inspectionFilesAction";
import { SRLWrapper } from "simple-react-lightbox";

const Row = (props) => {
  var textcolor, textlabel;
  switch (props.status) {
    case 1:
      textcolor = "text-danger";
      textlabel = "Não atendido";
      break;
    case 2:
      textcolor = "text-warning";
      textlabel = "Não atendido, mas com iniciativas";
      break;
    case 3:
      textcolor = "text-info";
      textlabel = "Atende, mas há ressalvas";
      break;
    case 4:
      textcolor = "text-success";
      textlabel = "Atende";
      break;
    default:
      textcolor = "";
      textlabel = "";
  }
  return (
    <div className="border pb-2">
      <h6 className="p-3 bg-light">
        <strong>
          {props.codeStandard} - {props.description}
        </strong>
      </h6>
      <div className="row m-1">
        <Grid cols="12 3">
          <span>
            <strong>Status: </strong>
          </span>
          <div className={textcolor}>
            <strong>{textlabel}</strong>
          </div>
        </Grid>
        <Grid cols="12 9">
          <span>
            <strong>Observação:</strong>
          </span>
          <div>{props.observation}</div>
        </Grid>
        <Grid cols="12 6">
          <span className="pt-3 d-table">
            <strong>Quem:</strong>
          </span>
          <div>{props.who}</div>
        </Grid>
        <Grid cols="12 6">
          <span className="pt-3 d-table">
            <strong>Quando:</strong>
          </span>
          <div>{props.when}</div>
        </Grid>
      </div>
    </div>
  );
};

export class InspectionView extends Component {
  componentDidMount() {
    this.props.getInspection(this.props.match.params.id);
    this.props.getList(this.props.match.params.id);
  }

  renderRows() {
    const standards = this.props.inspection.standards;

    if (typeof standards !== "undefined")
      return standards.map((standard) => (
        <Row
          key={standard.id}
          codeStandard={standard.codeStandard}
          description={standard.description}
          {...standard.pivot}
        />
      ));
  }

  renderEvidences() {
    const evidences = this.props.evidences;

    if (typeof evidences !== "undefined")
      return evidences.map((evidence) => (
        <div className="col-md-2 col-12 col-image-small">
          <a href={evidence.baseUrl} key={evidence.id} 
          style={{ 
            width: "100%",
            height: "100%",
            backgroundImage: `url(${evidence.baseUrl})`,
            backgroundSize: "cover",
            display: "table" 
          }}>
            <img
              alt={evidence.comments}
              src={evidence.baseUrl}
              style={{ width: "100%", opacity: 0}}
            />
          </a>
        </div>
      ));
  }

  render() {
    const inspection = this.props.inspection;

    var color, label;
    if ("status" in inspection)
      switch (inspection.status) {
        case 0:
          color = "warning";
          label = "Em aberto";
          break;
        case 1:
          color = "danger";
          label = "Cancelada";
          break;
        case 2:
          color = "success";
          label = "Finalizada";
          break;
        default:
          color = "";
          label = "";
      }

    return (
      <div>
        <ContentHeader
          title="Visualização da Vistoria"
          small={`Código: ${
            typeof inspection !== "undefined" ? inspection.id : null
          }`}
        />
        <Content>
          <div className="card-body">
            <div className="row">
              <Grid cols="12 12">
                <button
                  className="btn btn-secondary float-right mb-3"
                  type="button"
                  title="Detalhes Vistoria"
                  onClick={() =>
                    this.props.history.push(
                      `/app/vistorias/detalhes/${this.props.match.params.id}`
                    )
                  }
                >
                  <i className="fas fa-arrow-left"></i> Detalhes Vistoria
                </button>
              </Grid>
            </div>
            <div className="row">
              <Grid cols="12 10">
                <h4>Informações</h4>
              </Grid>
              <Grid cols="12 2">
                <span
                  className={`badge badge-${color} px-3 py-2 float-right mb-1`}
                >
                  <strong>{label}</strong>
                </span>
              </Grid>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <span className="font-weight-bold">CNPJ: </span>{" "}
                    {`${
                      "company" in inspection ? inspection.company.cnpj : null
                    }`}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-weight-bold">Empresa: </span>{" "}
                    {`${
                      "company" in inspection
                        ? inspection.company.companyName
                        : null
                    }`}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-weight-bold">Vistoriador: </span>{" "}
                    {`${"user" in inspection ? inspection.user.name : null}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-weight-bold">Data da vistoria: </span>{" "}
                    {`${
                      "created_at" in inspection
                        ? moment(inspection.created_at).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )
                        : null
                    }`}
                  </td>
                </tr>
              </tbody>
            </table>
            <h5 className="navbar navbar-dark bg-secondary text-uppercase font-weight-bold">
              Normas
            </h5>
            {this.renderRows()}
            {(typeof this.props.evidences !== "undefined" && this.props.evidences.length > 0) ? 
            <h5 className="navbar navbar-dark bg-secondary text-uppercase font-weight-bold mt-3">Evidências</h5> : 
            null}
            <SRLWrapper
              options={{
                buttons: {
                  showDownloadButton: false,
                },
              }}
            >
              <div id="content-page-one" className="content">
                <div className="row">{this.renderEvidences()}</div>
              </div>
            </SRLWrapper>
          </div>
        </Content>
      </div>
    );
  }
}

InspectionView = withRouter(InspectionView);
const mapStateToProps = (state) => {
  return {
    inspection: state.Inspections.listInspection,
    evidences: state.Inspections.listInspectionEvidences,
  };
};
const mapDispactchToProps = (dispatch) =>
  bindActionCreators({ getInspection, getList }, dispatch);
export default connect(mapStateToProps, mapDispactchToProps)(InspectionView);
