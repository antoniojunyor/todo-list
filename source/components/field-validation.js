import React, { Component } from 'react';

import { emailRegex } from '../utils';

export default class FieldValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: '',
      validField: null
    }

    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(event) {
    let rule;
    this.setState({ field: event.target.value }, () => {
      switch(this.props.inputType) {
        case 'text':
          rule = (this.state.field.length >= 2);
        break;

        case 'email':
          rule = emailRegex.test(String(this.state.field).toLowerCase());
        break;

        case 'password':
          rule = (this.state.field.length >= 6);
        break;

        default:
          rule = (this.state.field.length >= 2);
        break;
      }

      this.props.validField(rule);
      this.setState({ validField: rule });
    });
  }

  render() {
    const {
      labelFor,
      labelClass,
      labelText,
      inputType,
      inputId,
      inputClass,
      placeholder,
      autoComplete,
      autofocus
    } = this.props;

    const { validField, field } = this.state;

    return (
      <div className="as-form-group">
        <label htmlFor={labelFor} className={labelClass || 'as-sr-only'}>{labelText}</label>
        <input
          type={inputType || 'text'}
          id={inputId}
          className={`${inputClass || 'as-form-control'} ${validField === false ? 'as-form-control-error' : ''}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={false || autofocus}
          value={field}
          onChange={this.onChangeField}
        />
      </div>
    );
  }
}
