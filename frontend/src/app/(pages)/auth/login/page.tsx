"use client";
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { authSlice, useDispatch } from '@/lib/redux';
import { isDevelopment, tokenName } from '@/app/utils/constants';
import styles from './page.module.css';
import { sleep } from '@/app/utils/misc';


type LoginProps = {

};


const Login = (props:LoginProps) => {
  const {  } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const [ cookies, setCookie, removeCookie ] = useCookies([tokenName]);
  const [ triggerRedirect, setTriggerRedirect ] = useState(0);

  function sanitizeToken(token: string): string {
    const sanitizedToken = token.replace(/^Bearer /, '');
    return sanitizedToken;
  };

  async function redirect() {
    const tokenSet = cookies[tokenName];
    // if (!tokenSet) { console.error(); toast('Error setting cookie, relogin, contact') };

    dispatch(authSlice.actions.setIsAuth(true));
    // TODO: add  todo saying they're going to be redirected
    await sleep(500);
    router.push('/');
  };

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      const rawFormData = new FormData(e.currentTarget);
      const formData = Object.fromEntries(rawFormData);

      // TODO: add try catch
      const postLogin = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const authTokenRaw = postLogin.headers.get('Authorization');
      // TODO: complete this guard
      // if (!authTokenRaw) {
      //   console.error();
      //   toast();
      // };
      const authToken = sanitizeToken(authTokenRaw!);
      const resLogin = await postLogin.json();
      // localStorage.setItem(userInfo, resLogin.user);

      // TODO: cookie has to be set manually only in dev mode(?)
      // if (isDevelopment)
      const settingCookie = setCookie(tokenName, authToken, {path: '/'});
      console.log(`settingCookie: `, settingCookie);
      setTriggerRedirect((p) => p+1);

    } catch (error) {
      console.error(error);
      // toast(error);
    };
  };

  useEffect(() => {
    redirect();
  }, [triggerRedirect]);


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
          type='email'
          placeholder='Email'
        />
        <Input
          name='password'
          required={true}
          type='password'
          placeholder='Password'
        />
        <Button
          type='primary'
          htmlType='submit'
        >
          Login
        </Button>
      </form>

      <div className={styles.register}>
        <p>Don&apos;t have an account yet?</p>
        <Link className={styles['register-link']} href='/auth/register'>
          <p>Register</p>
        </Link>

      </div>


    </div>
  )
};


export default Login;
