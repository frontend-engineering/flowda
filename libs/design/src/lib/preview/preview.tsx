import { Component } from 'react';

import styles from './preview.module.css';

/* eslint-disable-next-line */
export interface PreviewProps {}

export class Preview extends Component<PreviewProps> {
  override render() {
    return (
      <div className={styles['container']}>
        <p>Welcome to Preview!</p>
      </div>
    );
  }
}

export default Preview;
