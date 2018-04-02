import React, { Component } from 'react';

import { emailRegex } from '../utils';

export default class FieldValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: '',
      validField: null
    }
  }

  onChangeField(event) {
    let rule;
    this.setState({ field: event.target.value });

    switch(this.props.inputType) {
      case 'text':
        rule = (this.state.field.length);
      break;

      case 'email':
        rule = emailRegex.test(String(this.state.field).toLowerCase());
      break;

      case 'password':
        rule = (this.state.field.length);
      break;

      default:
        rule = (this.state.field.length);
      break;

      this.props.validField(rule);
      this.setState({ validField: rule });
    }
  }

  render() {
    return (
      <div className="as-form-group">
        <label htmlFor={this.props.labelFor} className={this.props.labelClass || 'as-sr-only'}>
          {this.props.labelText}
        </label>
        <input
          type={this.props.inputType || 'text'}
          id={this.props.inputId}
          className={`${this.props.inputClass || 'as-form-control'} ${this.state.validField === false ? 'as-form-control-error' : ''}`}
          placeholder={this.props.placeholder}
          autoComplete={this.props.autoComplete}
          autoFocus={false || this.props.autofocus}
          value={this.state.field}
          onChange={event => this.onChangeField(event)}
          data-valid={this.state.validField}
        />
      </div>
    );
  }
}
