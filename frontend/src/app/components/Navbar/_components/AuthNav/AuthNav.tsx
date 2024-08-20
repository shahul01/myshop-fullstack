import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, selectAuth } from '@/lib/redux';


type AuthNavProps = {

};

const AuthNav = (props:AuthNavProps) => {
  const {  } = props;

  const auth = useSelector(selectAuth);
  console.log(`auth: `, auth);

  return (
    <div className='auth-nav'>
      {auth ?
        'Logout'
      :
        <Link href='/auth/login' title="Login page">Login</Link>
      }

    </div>
  )
};


export default AuthNav;
