import React, { useState } from 'react';
import InputField from '@/components/fields/InputField';
import Cookies from 'js-cookie';
import customAxios from '@/utils/customAxios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await customAxios.post(`/users/login`, data);

      if (response.status === 200) {
        // Use Cookies to set the JWT
        Cookies.set('access_token', response.data.jwtToken, { expires: 7 });
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert('Failed to authenticate');
      }
    }
  };

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
        <form onSubmit={authenticate}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-4"
            label="Email*"
            placeholder="user@mail.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-4"
            label="Password*"
            placeholder="Min. 6 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="linear mt-5 w-full rounded-xl bg-orange-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200"
            onClick={authenticate}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
