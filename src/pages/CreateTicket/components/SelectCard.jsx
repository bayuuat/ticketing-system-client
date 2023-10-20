import React from 'react';

const CustomRadioButton = ({ label, value, checked, onChange, name }) => {
  return (
    <label
      className={`mr-4 cursor-pointer border rounded-lg px-6 py-2 ${
        checked ? 'border-orange-500 bg-orange-500/20 dark:bg-orange-400/10' : 'outline-none dark:border-white/10'
      }`}
    >
      <input id={`${name}-${value}`} value={value} name={name} type="radio" className="hidden" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default CustomRadioButton;
