import React from 'react';
import styles from './SpinButton.module.css';

function SpinButton({ onClick, disabled, phase }) {
  const label =
    phase === 'spinning' ? 'Spinning...' :
    phase === 'dropping' ? 'Drawing...' :
    'Free Spin';

  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
}

export default SpinButton;