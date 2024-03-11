import { Component } from 'react';

import styles from './login.module.css';

/* eslint-disable-next-line */
export interface LoginProps {}

export class Login extends Component<LoginProps> {
  override render() {
    return (
      <div className={styles['container']}>
        <p>Welcome to Login!</p>
      </div>
    );
  }
}

export default Login;
