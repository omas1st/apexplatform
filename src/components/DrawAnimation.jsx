import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DrawAnimation.module.css';

function DrawAnimation({ flyingBall }) {
  return (
    <AnimatePresence>
      {flyingBall && (
        <motion.div
          className={styles.ball}
          key={flyingBall.key}
          initial={{
            x: flyingBall.startX - 50,
            y: flyingBall.startY - 50,
            scale: 1,
          }}
          animate={{
            x: flyingBall.endX - 50,
            y: flyingBall.endY - 50,
            scale: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.65,
            ease: 'easeInOut',
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <span className={styles.number}>{flyingBall.number}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrawAnimation;