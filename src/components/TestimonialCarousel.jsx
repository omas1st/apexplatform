import React, { useState, useEffect } from 'react';
import { names, messages } from '../data/testimonialsData';
import styles from './TestimonialCarousel.module.css';

// Pick a random element from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a random amount between R30,000 and R1,300,000 (inclusive)
// Always ends with ",000"
function getRandomAmount() {
  const min = 30;      // 30,000
  const max = 1300;    // 1,300,000
  const value = (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  // Format with commas, e.g., "R450,000" or "R1,300,000"
  return 'R' + value.toLocaleString('en-ZA');
}

function TestimonialCarousel() {
  const [testimonial, setTestimonial] = useState({ name: '', text: '' });
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Initial random testimonial
    const randomMsg = getRandomItem(messages);
    const amount = getRandomAmount();
    setTestimonial({
      name: getRandomItem(names),
      text: randomMsg.replace('{amount}', amount),
    });

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newMsg = getRandomItem(messages);
        const newAmount = getRandomAmount();
        setTestimonial({
          name: getRandomItem(names),
          text: newMsg.replace('{amount}', newAmount),
        });
        setFade(true);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Success Stories</h2>
      <div className={`${styles.card} ${fade ? styles.fadeIn : styles.fadeOut}`}>
        <div className={styles.quoteIcon}>“</div>
        <p className={styles.message}>{testimonial.text}</p>
        <p className={styles.name}>— {testimonial.name}</p>
      </div>
      <div className={styles.dots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </section>
  );
}

export default TestimonialCarousel;