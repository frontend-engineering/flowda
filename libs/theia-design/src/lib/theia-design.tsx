import styles from './theia-design.module.css';

/* eslint-disable-next-line */
export interface TheiaDesignProps {}

export function TheiaDesign(props: TheiaDesignProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TheiaDesign!</h1>
    </div>
  );
}

export default TheiaDesign;
