import React, { useState, useRef, useCallback } from 'react';
import Header from '../components/Header';
import LotteryMachine from '../components/LotteryMachine';
import ResultSlots from '../components/ResultSlots';
import SpinButton from '../components/SpinButton';
import DrawAnimation from '../components/DrawAnimation';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { fisherYatesShuffle } from '../utils/shuffle';
import styles from './Home.module.css';

const ALL_NUMBERS = Array.from({ length: 49 }, (_, i) => i + 1);
const SPIN_DURATION = 5000;
const DROP_INTERVAL = 1000;
const DROP_ANIMATION_MS = 650;

function Home() {
  const [phase, setPhase] = useState('idle');
  const [revealedSlots, setRevealedSlots] = useState([null, null, null]);
  const [flyingBall, setFlyingBall] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [highlightedBalls, setHighlightedBalls] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const machineRef = useRef(null);
  const slotRefs = [useRef(null), useRef(null), useRef(null)];

  const getMachineCenter = useCallback(() => {
    if (!machineRef.current) return { x: 0, y: 0 };
    const rect = machineRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const getSlotCenter = useCallback((index) => {
    const slotEl = slotRefs[index]?.current;
    if (!slotEl) return { x: 0, y: 0 };
    const rect = slotEl.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, [slotRefs]);

  const handleSpin = useCallback(() => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setPhase('spinning');
    setRevealedSlots([null, null, null]);
    setShowComplete(false);
    setHighlightedBalls([]);
    setFlyingBall(null);

    const spinTimer = setTimeout(() => {
      const shuffled = fisherYatesShuffle(ALL_NUMBERS);
      const selected = shuffled.slice(0, 3);
      setHighlightedBalls(selected);
      setPhase('dropping');

      const dropTimers = [];
      const machineCenter = getMachineCenter();

      // First ball
      dropTimers.push(
        setTimeout(() => {
          const slotCenter = getSlotCenter(0);
          setFlyingBall({
            number: selected[0],
            startX: machineCenter.x,
            startY: machineCenter.y,
            endX: slotCenter.x,
            endY: slotCenter.y,
            slotIndex: 0,
            key: `fly-${selected[0]}-0-${Date.now()}`,
          });
          setHighlightedBalls(prev => prev.filter(n => n !== selected[0]));
          setTimeout(() => {
            setFlyingBall(null);
            setRevealedSlots(prev => {
              const next = [...prev];
              next[0] = selected[0];
              return next;
            });
          }, DROP_ANIMATION_MS);
        }, 400)
      );

      // Second ball
      dropTimers.push(
        setTimeout(() => {
          const slotCenter = getSlotCenter(1);
          setFlyingBall({
            number: selected[1],
            startX: machineCenter.x,
            startY: machineCenter.y,
            endX: slotCenter.x,
            endY: slotCenter.y,
            slotIndex: 1,
            key: `fly-${selected[1]}-1-${Date.now()}`,
          });
          setHighlightedBalls(prev => prev.filter(n => n !== selected[1]));
          setTimeout(() => {
            setFlyingBall(null);
            setRevealedSlots(prev => {
              const next = [...prev];
              next[1] = selected[1];
              return next;
            });
          }, DROP_ANIMATION_MS);
        }, 400 + DROP_INTERVAL)
      );

      // Third ball
      dropTimers.push(
        setTimeout(() => {
          const slotCenter = getSlotCenter(2);
          setFlyingBall({
            number: selected[2],
            startX: machineCenter.x,
            startY: machineCenter.y,
            endX: slotCenter.x,
            endY: slotCenter.y,
            slotIndex: 2,
            key: `fly-${selected[2]}-2-${Date.now()}`,
          });
          setHighlightedBalls(prev => prev.filter(n => n !== selected[2]));
          setTimeout(() => {
            setFlyingBall(null);
            setRevealedSlots(prev => {
              const next = [...prev];
              next[2] = selected[2];
              return next;
            });
            setPhase('complete');
            setShowComplete(true);
            setIsButtonDisabled(false);
          }, DROP_ANIMATION_MS);
        }, 400 + DROP_INTERVAL * 2)
      );

      return () => dropTimers.forEach(clearTimeout);
    }, SPIN_DURATION);

    return () => clearTimeout(spinTimer);
  }, [isButtonDisabled, getMachineCenter, getSlotCenter]);

  const removedFromMachine = revealedSlots.filter(Boolean);

  return (
    <>
      <Header />

      {/* About / CTA Section */}
      <section className={styles.aboutSection}>
        <h2>Transforming Lives Through Lotto Gaming</h2>
        <p>
          Our proven system delivers <strong>3 straight winning numbers</strong> and a bonus.
          Join now and change your story.
        </p>
        <a
          href="https://uk49-livid.vercel.app/login"
          className={styles.ctaButton}
        >
          Get 3 Straight Numbers & Bonus →
        </a>
      </section>

      {/* Success Stories Carousel */}
      <TestimonialCarousel />

      {/* Lottery Machine Section */}
      <section className={styles.machineSection}>
        <div className={styles.machineContainer}>
          <LotteryMachine
            ref={machineRef}
            phase={phase}
            highlightedBalls={highlightedBalls}
            removedNumbers={removedFromMachine}
          />
        </div>
        <div className={styles.resultContainer}>
          <ResultSlots refs={slotRefs} revealedSlots={revealedSlots} />
          <SpinButton onClick={handleSpin} disabled={isButtonDisabled} phase={phase} />

          {showComplete && (
            <div className={styles.completeContainer}>
              <div className={styles.completeMessage}>
                ✅ Draw Complete! Numbers: {revealedSlots.join(' • ')}
              </div>
              <p className={styles.warningNote}>
                Kindly subscribe now to start receiving 3 straight winning numbers. NOTE – the free spin is not guaranteed. You are liable for any loss.
              </p>
              <a
                href="https://uk49-livid.vercel.app/login"
                className={styles.subscribeButton}
              >
                Subscribe Now
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className={styles.footer}>
        <p>Message the admin on Gmail</p>
        <a href="mailto:uk49wins@gmail.com" className={styles.email}>
          uk49wins@gmail.com
        </a>
        <p className={styles.disclaimer}>
          © 2023 APEX WINNING PLATFORM. Responsible gaming is encouraged.
        </p>
      </footer>

      {/* Flying Ball Animation Overlay */}
      <DrawAnimation flyingBall={flyingBall} />
    </>
  );
}

export default Home;