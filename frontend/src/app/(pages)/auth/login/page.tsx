"use client";
import { Button, Input } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tokenName } from '@/app/utils/constants';
import styles from './page.module.css';


type LoginProps = {

};


const Login = (props:LoginProps) => {
  const {  } = props;

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const rawFormData = new FormData(e.currentTarget);
    const formData = Object.fromEntries(rawFormData);
    console.log(`formData: `, rawFormData);

    // TODO: add try catch
    const postLogin = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const resLogin = await postLogin.json();
    localStorage.setItem(tokenName, resLogin[tokenName]);
    console.log(`resLogin: `, resLogin);
    // router.push('/');

  };


  return (
    <div className={styles.login}>

      <h2 className={styles.title}>Login</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Input
          name='email'
          required={true}
          style={{width: '16rem'}}
          type='email'
          placeholder='Email'
        />
        <Input
          name='password'
          required={true}
          style={{width: '16rem'}}
          type='password'
          placeholder='Password'
        />
        <Button
          type='primary'
          htmlType='submit'
          style={{border: '1px solid #eee'}}
        >
          Login
        </Button>
      </form>

      <div className={styles.register}>
        <p>Don&apos;t have an account yet?</p>
        <Link className={styles['register-link']} href='/auth/register'>
          <p> Register</p>
        </Link>

      </div>


    </div>
  )
};


export default Login;
