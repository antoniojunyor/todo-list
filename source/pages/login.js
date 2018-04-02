import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import FieldValidation from '../components/field-validation';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validFieldEmail: null,
      validFieldPassword: null,
      validForm: null
    }
  }

  verifyForm(event) {
    const { validFieldEmail, validFieldPassword } = this.state;
    event.preventDefault();
    this.setState({ validForm: (validFieldEmail && validFieldPassword) });
  }

  render() {
    const fieldValidationEmail = {
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

    if (this.state.ValidForm) {
      return (
        <Redirect to={{ pathname: '/my-list' }}/>
      );
    }

    return (
      <div className="as-login-page">
        <div className="as-wrap-content">
          <h1>Do it now</h1>
          <div className="as-box">
            <Link to="/" className="as-back-to" title="Voltar para página inicial">Voltar para página inicial</Link>

            <form className="as-form-login" autoComplete="on" onSubmit={event => this.verifyForm(event)}>
              <fieldset>
                <legend>Criar Conta</legend>

                <FieldValidation
                  {...fieldValidationEmail}
                  validField={value => this.setState({ validFieldEmail: value })}
                />

                <FieldValidation
                  {...fieldValidationPassword}
                  validField={value => this.setState({ validFieldPassword: value })}
                />

                <div className="as-form-group as-form-actions">
                  <button type="submit" className="as-button-green">Entrar</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
