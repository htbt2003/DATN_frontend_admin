import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from '../../services/UserServices';
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
import { setAuth } from '../../redux/authSlice';
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  //login-------------------------------
  function doLogin(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    if (!email) {
      setErrorMessage('Vui lòng nhập email để đăng nhập');
    }
    else if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu để đăng nhập');
    }
    else {
      UserServices.login(user)
        .then(function (result) {
          if (result.status === true) {
            dispatch(setAuth(result))
            swal("Success", result.message, "success");
            navigator("/", { replace: true });
          }
          else {
            swal("Warning", result.message, "warning");
          }
        });
    }
  }
  ///  login với google-----------------
  const responseGoogle = async (response) => {
    try {
      const result = await UserServices.login_google(response)
      dispatch(setAuth(result))
      swal("Success", result.message, "success");
      navigator("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const result = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
      );
      responseGoogle(result.data);
    }
  });

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Đăng nhập
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
        Nhập email và mật khẩu của bạn để đăng nhập!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
          Đăng nhập với Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> hoặc </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <form onSubmit={doLogin} method="post">
          <div className='mb-3'>
            <label
              className='text-sm text-navy-700 dark:text-white ml-1.5 font-medium'
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Nhập email'
              className='focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white'
              required
              title="Vui lòng nhập địa chỉ email của bạn để đăng nhập"
              onInvalid={() => setErrorMessage('Vui lòng nhập địa chỉ email của bạn để đăng nhập')}
            />
            <span style={{ color: 'red' }}>{errorMessage}</span>
          </div>

          <div className='mb-3'>
            <label
              className='text-sm text-navy-700 dark:text-white ml-1.5 font-medium'
            >
              Mật khẩu
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Nhập mật khẩu'
              className='focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white'
              required
              title="Vui lòng nhập mật khẩu của bạn để đăng nhập"
              onInvalid={() => setErrorMessage('Vui lòng nhập mật khẩu của bạn để đăng nhập')}
            />
            <span style={{ color: 'red' }}>{errorMessage}</span>
          </div>

          {/* Password */}
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            {/* <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a> */}
          </div>
          <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Đăng nhập
          </button>
          {/* <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
            </span>
            <a
              href=" "
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
}
