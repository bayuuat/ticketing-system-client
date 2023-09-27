import React, { useState } from 'react';

const formBody = {
  email: '',
  body: '',
  tag: '',
  attachment: '',
};

const Home = () => {
  const [form, setForm] = useState(formBody);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return(
    <h1>Create Ticket</h1>
  );
};

export default Home;
