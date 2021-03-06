import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  onIdChange, onPasswordChange, createUser,
  switchToSignIn, switchToCreateAccount,
  signIn
} from '../actions/login';
import { isObjectEmpty } from '../utils/helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (isObjectEmpty(this.props.auth)) {
      const idNamePlaceholder = this.props.isCreateAccount ? 'Name' : 'ID';
      return (
        <div className='login'>
          <div className='login-dialog'>
            <input placeholder={idNamePlaceholder} value={this.props.id} onChange={this.props.onIdChange} />
            <input placeholder='Password' type='password' value={this.props.password} onChange={this.props.onPasswordChange} />
            {this.renderSubmitButton()}
            {this.renderTypeButton()}
          </div>
        </div>
      );
    }
    else {
      return <Redirect to='/' />;
    }
  }

  renderSubmitButton = () => {
    if (this.props.isCreateAccount)
      return <button onClick={this.props.onCreateAccountSubmit}>Continue Create Account</button>;
    else
      return <button onClick={this.props.onSignInSubmit}>Continue Sign In</button>;
  }

  renderTypeButton = () => {
    if (!this.props.isCreateAccount)
      return <button onClick={this.props.onCreateAccountTypeButtonClick}>Create Account</button>;
    else
      return <button onClick={this.props.onSignInTypeButtonClick}>Sign In</button>;
  }
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  password: state.login.password,
  isCreateAccount: state.login.isCreateAccount,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onIdChange: (event) => {
    dispatch(onIdChange(event.target.value));
  },
  onPasswordChange: (event) => {
    dispatch(onPasswordChange(event.target.value));
  },
  onCreateAccountSubmit: () => {
    dispatch(createUser);
  },
  onSignInSubmit: () => {
    dispatch(signIn);
  },
  onCreateAccountTypeButtonClick: () => {
    dispatch(switchToCreateAccount());
  },
  onSignInTypeButtonClick: () => {
    dispatch(switchToSignIn());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);