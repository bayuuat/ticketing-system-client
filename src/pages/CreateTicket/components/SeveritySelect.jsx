import React, { useState } from 'react';
import CustomRadioButton from '@/pages/CreateTicket/components/SelectCard';

const severityType = [
  { label: 'Critical', value: 1 },
  { label: 'Major', value: 2 },
  { label: 'Minor', value: 3 },
  { label: 'Cosmetic', value: 4 },
];

const SeveritySelect = ({ label, id, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className={`text-sm text-navy-700 dark:text-white font-bold`}>
        {label}
      </label>
      <div className="flex mt-2">
        {severityType.map((type, index) => (
          <CustomRadioButton
            key={index}
            name="severity"
            label={type.label}
            checked={selectedOption == type.value}
            value={type.value}
            onChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default SeveritySelect;
