import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import FieldValidation from '../components/field-validation';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validFieldName: null,
      validFieldEmail: null,
      validFieldPassword: null,
      validForm: null
    }
  }

  verifyForm(event) {
    const { validFieldName, validFieldEmail, validFieldPassword } = this.state;
    event.preventDefault();
    this.setState({ validForm: (validFieldName && validFieldEmail && validFieldPassword) });
  }

  render() {
    const fieldValidationName = {
      labelFor: 'name',
      labelText: 'Nome',
      inputId: 'name',
      placeholder: 'Nome',
      autoComplete: 'name',
      autofocus: true
    }, fieldValidationEmail = {
      labelFor: 'email',
      labelText: 'Email',
      inputType: 'email',
      inputId: 'email',
      placeholder: 'Endereço de Email',
      autoComplete: 'email',
    }, fieldValidationPassword = {
      labelFor: 'password',
      labelText: 'Senha',
      inputType: 'password',
      inputId: 'password',
      placeholder: 'Senha',
      autoComplete: 'current-password',
    };

    if (this.state.validForm) {
      return <Redirect push to={{ pathname: '/login' }}/>;
    }

    return (
      <div className="as-create-account-page">
        <div className="as-wrap-content">
          <h1>Do it now</h1>
          <div className="as-box">
            <Link to="/" className="as-back-to" title="Voltar para página inicial">Voltar para página inicial</Link>

            <form className="as-form-create-account" autoComplete="on" onSubmit={event => this.verifyForm(event)}>
              <fieldset>
                <legend>Criar Conta</legend>

                <FieldValidation
                  {...fieldValidationName}
                  validField={value => this.setState({ validFieldName: value })}
                />

                <FieldValidation
                  {...fieldValidationEmail}
                  validField={value => this.setState({ validFieldEmail: value })}
                />

                <FieldValidation
                  {...fieldValidationPassword}
                  validField={value => this.setState({ validFieldPassword: value })}
                />

                <div className="as-form-group as-form-actions">
                  <button type="submit" className="as-button-orange">Criar Conta</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
