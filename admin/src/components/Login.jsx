import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

      if (response.data.success) {
        setToken(response.data.token); // save token in parent state
        toast.success('Login successful');
      } else {
        toast.error(response.data.message); // show error from server
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
