"use client";
import { Button, Input } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';


type RegisterProps = {

};


const Register = (props:RegisterProps) => {
  const {  } = props;

  const initRegisterForm = {
    username: '',
    email: '',
    password: ''
  };
  type RegisterForm = typeof initRegisterForm;

  const [ registerForm, setRegisterForm ] = useState(initRegisterForm);

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const { name, value  } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  };

  function handleSubmit() {
    // fetch via route handler
    // validate
    console.log(registerForm);
    // if no error
    setRegisterForm(initRegisterForm);
    // router.push('/auth/login');
  };

  return (
    <div className='register flex flex-col items-center justify-between gap-2 mt-[6%]' >

      <h2 className='font-light'>Register</h2>
      <Input
        name='username'
        style={{width:'16rem'}}
        type='text'
        placeholder='Username'
        value={registerForm.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        style={{width:'16rem'}}
        type='email'
        placeholder='Email'
        value={registerForm.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        minLength={6}
        style={{width:'16rem'}}
        type='password'
        placeholder='Password'
        value={registerForm.password}
        onChange={handleChange}
      />
      <Button
        type='primary'
        onClick={handleSubmit}
        style={{border:'1px solid #eee'}}
      >
        Register
      </Button>
      <Link href='/auth/login' className='underline'>
        <span>Already have an account?</span>
        <span> Login</span>
      </Link>

    </div>
  )
};


export default Register;
