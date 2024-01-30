"use client";
import { Button, Input } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandom } from '@/app/utils/misc';
import { tokenName } from '@/app/utils/constants';
import styles from './page.module.css';


type RegisterProps = {

};


const Register = (props:RegisterProps) => {
  const {  } = props;

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const rawFormClass = new FormData(e.currentTarget);
    const rawFormData = Object.fromEntries(rawFormClass);
    const username = `${rawFormData.fullname}${getRandom(4)}`.replace(/\s/g, '');
    const fullFormData = { ...rawFormData, username };
    // console.log(`fullFormData: `, fullFormData);

    // validate

    const postRegister = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullFormData),
    });
    const resRegister = await postRegister.json();
    localStorage.setItem(tokenName, resRegister.tokenName);
    console.log(`resRegister: `, resRegister);
    // router.push('/auth/login');

  };


  return (
    <div className={styles.register} >

      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name='fullname'
          required={true}
          style={{width:'16rem'}}
          type='text'
          placeholder='Full name'
        />
        <Input
          name='email'
          required={true}
          style={{width:'16rem'}}
          type='email'
          placeholder='Email'
        />
        <Input
          name='password'
          required={true}
          minLength={6}
          style={{width:'16rem'}}
          type='password'
          placeholder='Password'
        />
        <Button
          type='primary'
          htmlType='submit'
          style={{border:'1px solid #eee'}}
        >
          Register
        </Button>
      </form>
      <div className={styles.login}>
        <p>Already have an account?</p>
        <Link className={styles['login-link']} href='/auth/login'>
          <span>Login</span>
        </Link>

      </div>

    </div>
  )
};


export default Register;
