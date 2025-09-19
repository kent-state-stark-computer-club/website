'use client'
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import styles from '@/app/App.module.css'

// --- Type Definitions ---

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// No longer need CountdownProps as the target date is calculated internally

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type H3Props = React.HTMLAttributes<HTMLHeadingElement>;


// --- Mock Card Components (with TypeScript) ---
// In your project, you would import these from '@/components/ui/card'

const Card: FC<DivProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-card text-card-foreground rounded-xl border shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: FC<DivProps> = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: FC<H3Props> = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent: FC<DivProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);


// --- Countdown Component (TSX) ---

const Countdown: FC = () => { // Component no longer takes props

  /**
   * Calculates the date of the next upcoming Friday at 11:30 AM EST.
   * Note: This relies on the user's local clock but sets the time to a fixed hour.
   * For users in EST/EDT, this will be accurate.
   */
  const getNextFriday = (): Date => {
    const now = new Date();
    const nextFriday = new Date(now.getTime());

    // Set the target time
    nextFriday.setHours(11, 30, 0, 0);

    const currentDay = now.getDay(); // Sunday = 0, Friday = 5
    const targetDay = 5;

    let daysUntilFriday = targetDay - currentDay;

    // If it's already past Friday 11:30 AM this week, or if it's Saturday/Sunday,
    // aim for next week's Friday.
    if (daysUntilFriday < 0 || (daysUntilFriday === 0 && now.getTime() > nextFriday.getTime())) {
      daysUntilFriday += 7;
    }
    
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    
    return nextFriday;
  };

  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = getNextFriday();
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Recalculate every second
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = (Object.keys(timeLeft) as Array<keyof TimeLeft>).map((interval) => {
    return (
      <div key={interval} className={styles.countdownBox}>
        <span className="text-4xl font-bold tracking-tighter">
          {String(timeLeft[interval]).padStart(2, '0')}
        </span>
        <span className="text-sm font-medium text-muted-foreground uppercase">{interval}</span>
      </div>
    );
  });

  return (
    <div className={styles.contentBox}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className={styles.h1}>Next Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3 md:gap-4 text-center">
            {timeComponents.length ? timeComponents : <p>Loading...</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Countdown;
