import React from 'react';

export const CustomTooltip = ({ active, payload, label}) => {
  const formatMilisec = (second) => {
    const totalSeconds = Math.floor(second);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const checkData = (key) => {
    return key === 'avg' || key === 'min' || key === 'max'
  }

  if (active && payload && payload.length) {
    return (
      <div className="border border-gray-300 bg-white dark:border-navy-700 dark:bg-navy-900 dark:text-white p-3 rounded-md">
        <p className="mb-2 font-normal">{`${label}`}</p>
        {payload.map((item, index) => (
          <p style={{ color: item.color }} key={index}>{`${item.dataKey}: ${checkData(item.dataKey) ? formatMilisec(item.value) : item.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};
