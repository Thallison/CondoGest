import React, { Component } from 'react'

export default class Accordion extends Component {
    render() {
        return (
            <div className="card card-light collapsed-card">
            <div className="card-header" data-card-widget="collapse">
                <h3 className="card-title">{this.props.title}</h3>

                <div className="card-tools">
                    <button type="button" className="btn btn-tool"  data-card-widget="collapse">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                {this.props.children}
            </div>
        </div>
        )
    }
}