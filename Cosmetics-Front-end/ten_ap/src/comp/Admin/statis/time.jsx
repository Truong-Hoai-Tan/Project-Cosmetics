import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []); // Không có dependencies, nó sẽ chạy một lần khi component được render lần đầu tiên

  return (
    <div>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default Timer;