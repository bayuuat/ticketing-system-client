import InputField from '@/components/fields/InputField';
import Checkbox from '@/components/checkbox';
import axios from 'axios';

const Login = () => {
  
  const authenticate = async () => {
    const data = {email : "admin@admin.com", password: "admin"}
    try {
      const response = await axios.post(`http://localhost:9000/api/users/login`, data);
  
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.jwtToken);
        window.location = '/';
      } else {
        throw new Error('Failed to authenticate');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
        {/* Email */}
        <InputField variant="auth" extra="mb-4" label="Email*" placeholder="user@mail.com" id="email" type="text" />

        {/* Password */}
        <InputField variant="auth" extra="mb-4" label="Password*" placeholder="Min. 6 characters" id="password" type="password" />
        <button className="linear mt-9 w-full rounded-xl bg-orange-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200" onClick={authenticate}>
          Sign In
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
          <a href=" " className="ml-1 text-sm font-medium text-orange-500 hover:text-orange-600 dark:text-white">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
