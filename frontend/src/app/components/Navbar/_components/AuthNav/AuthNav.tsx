import { useSelector, selectAuth } from '@/lib/redux';
import { useEffect, useState } from 'react';


type AuthNavProps = {

};


const AuthNav = (props:AuthNavProps) => {
  const {  } = props;

  const auth = useSelector(selectAuth);
  console.log(`auth: `, auth);

  return (
    <div className='auth-nav'>
      {auth ? 'Logout' : 'Login'}

    </div>
  )
};


export default AuthNav;
