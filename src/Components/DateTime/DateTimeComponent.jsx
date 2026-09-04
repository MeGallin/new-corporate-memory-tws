import { useEffect, useState } from 'react';
import moment from 'moment';

const DateTime = () => {
  const [dateTime, setDateTime] = useState(() =>
    moment().format('MMMM Do YYYY, h:mm:ss a'),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return <div>{dateTime}</div>;
};

export default DateTime;
