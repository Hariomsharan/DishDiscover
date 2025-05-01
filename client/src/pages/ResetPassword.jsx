import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../features/userAuth/authSlice';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: ''
  });
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(formData))
    setMessage('Password updated successfully!');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/" className="font-medium text-[#4CAF50] hover:text-[#63b467]">
            return to sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="oldpassword" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <div className="mt-1">
                <input
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  required
                  value={formData.oldpassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  required
                  value={formData.newpassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4CAF50] hover:bg-[#63b467] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50]"
              >
                Update Password
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 p-4 rounded-md bg-green-50 text-green-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;