import React, { Component } from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import imageCompression from 'browser-image-compression';

import Grid from './Grid';

export default class FieldFileInput extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    async onChange(e) {
        const { input: { onChange } } = this.props
        const imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
            initialQuality: 0.8
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            onChange(compressedFile)
        } catch (error) {
            toastr.error('Erro', 'Imagem ou formato de imagem não compatível')
        }

    }

    render() {
        const { label, type, cols, name, id } = this.props  //whatever props you send to the component from redux-form Field
        return (
            <Grid cols={cols}>
                <div className="form-group">
                    <div className="input-group">
                        <div className="custom-file">
                            <input
                                name={name}
                                type={type}
                                placeholder={label}
                                accept='.jpg, .png, .jpeg'
                                onChange={this.onChange}
                                className="custom-file-input"
                                required={true}
                                id={id} />
                            <label
                                className="custom-file-label"
                                htmlFor={id}>

                                {typeof this.props.fields !== 'undefined' ? this.props.fields.file.name : "Escolha o arquivo"}
                            </label>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    fields: getFormValues("inspectionFilesForm")(state)
})
FieldFileInput = connect(mapStateToProps)(FieldFileInput)
