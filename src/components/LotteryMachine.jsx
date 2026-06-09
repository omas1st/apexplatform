import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import LottoBall from './LottoBall';
import styles from './LotteryMachine.module.css';

const TOTAL_BALLS = 49;

const LotteryMachine = forwardRef(
  ({ phase, highlightedBalls, removedNumbers }, ref) => {
    const [ballSize, setBallSize] = useState(40);
    const [ballPositions, setBallPositions] = useState([]);
    const keyframeIntervalRef = useRef(null);

    // Responsive ball sizing
    useEffect(() => {
      const updateSize = () => {
        const vw = window.innerWidth;
        if (vw <= 380) setBallSize(24);
        else if (vw <= 600) setBallSize(28);
        else if (vw >= 1024) setBallSize(46);
        else setBallSize(40);
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Idle positions – balls piled at the bottom like in a tyre
    const idlePositions = useMemo(() => {
      const machineRadius = ballSize > 40 ? 185 : ballSize > 30 ? 140 : 105;
      const effective = Math.max(0, machineRadius - ballSize / 2 - 6);
      const positions = [];
      const rows = [
        { y: effective * 0.65, count: 12, spread: 0.6 },
        { y: effective * 0.5, count: 10, spread: 0.55 },
        { y: effective * 0.35, count: 9, spread: 0.5 },
        { y: effective * 0.2, count: 7, spread: 0.4 },
        { y: effective * 0.05, count: 5, spread: 0.3 },
        { y: -effective * 0.1, count: 3, spread: 0.2 },
        { y: -effective * 0.25, count: 2, spread: 0.1 },
        { y: -effective * 0.38, count: 1, spread: 0 },
      ];

      let idx = 0;
      rows.forEach((row) => {
        for (let i = 0; i < row.count && idx < TOTAL_BALLS; i++) {
          const x =
            (i - (row.count - 1) / 2) *
              ((effective * row.spread * 2) / Math.max(row.count - 1, 1)) +
            (Math.random() - 0.5) * 8;
          const y = row.y + (Math.random() - 0.5) * 10;
          const dist = Math.sqrt(x * x + y * y);
          if (dist > effective) {
            const scale = effective / dist;
            positions.push({ x: x * scale, y: y * scale });
          } else {
            positions.push({ x, y });
          }
          idx++;
        }
      });
      while (positions.length < TOTAL_BALLS) {
        const angle = Math.random() * 2 * Math.PI;
        const r = Math.random() * effective * 0.8;
        positions.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
      }
      return positions;
    }, [ballSize]);

    useEffect(() => {
      if (phase === 'idle' || phase === 'complete') {
        setBallPositions(idlePositions);
      }
    }, [phase, idlePositions]);

    const generateSpinKeyframes = useCallback(() => {
      const machineRadius = ballSize > 40 ? 185 : ballSize > 30 ? 140 : 105;
      const effective = Math.max(0, machineRadius - ballSize / 2 - 4);
      const kf = [];
      for (let i = 0; i < TOTAL_BALLS; i++) {
        const ballKf = [];
        for (let j = 0; j < 10; j++) {
          const angle = Math.random() * 2 * Math.PI;
          const r = Math.sqrt(Math.random()) * effective;
          ballKf.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
        }
        kf.push(ballKf);
      }
      return kf;
    }, [ballSize]);

    useEffect(() => {
      if (phase === 'spinning') {
        const keyframes = generateSpinKeyframes();
        let frame = 0;

        keyframeIntervalRef.current = setInterval(() => {
          const newPositions = keyframes.map((kf) => kf[frame % 10]);
          setBallPositions(newPositions);
          frame++;
        }, 120);

        return () => {
          if (keyframeIntervalRef.current) {
            clearInterval(keyframeIntervalRef.current);
            keyframeIntervalRef.current = null;
          }
        };
      } else if (keyframeIntervalRef.current) {
        clearInterval(keyframeIntervalRef.current);
        keyframeIntervalRef.current = null;
      }
    }, [phase, generateSpinKeyframes]);

    return (
      <div className={styles.machineSection}>
        <div className={styles.sphere} ref={ref}>
          {/* Blue background with large "49" watermark */}
          <div className={styles.backgroundLayer}>
            <span className={styles.watermark}>49</span>
          </div>

          {/* Glass highlights */}
          <div className={styles.glassHighlight} />
          <div className={styles.glassHighlightSecondary} />

          {/* Professional spinner arms */}
          <div
            className={`${styles.spinnerContainer} ${
              phase === 'spinning' ? styles.spinning : ''
            }`}
          >
            {/* Central hub */}
            <div className={styles.hub} />
            {/* Three thick arms */}
            <div className={styles.arm} style={{ transform: 'rotate(0deg)' }} />
            <div className={styles.arm} style={{ transform: 'rotate(120deg)' }} />
            <div className={styles.arm} style={{ transform: 'rotate(240deg)' }} />
          </div>

          <div className={styles.ballsContainer}>
            {Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1).map((num, i) => {
              if (removedNumbers.includes(num)) return null;
              const pos = ballPositions[i] || { x: 0, y: 0 };
              const isHighlighted = highlightedBalls.includes(num);
              return (
                <LottoBall
                  key={num}
                  number={num}
                  x={pos.x}
                  y={pos.y}
                  highlighted={isHighlighted}
                  spinning={phase === 'spinning'}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default LotteryMachine;