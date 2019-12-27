import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      email: '',
      password: '',
      name: '',
    };
    this._confirm = this._confirm.bind(this);
    this._saveUserData = this._saveUserData.bind(this);
  }

  async _confirm(data) {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { login, email, password, name } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placehoder="Your Name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'Create Account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account'}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
