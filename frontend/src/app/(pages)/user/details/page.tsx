"use client";
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { useCookies } from 'react-cookie';
import { tokenName } from '@/app/utils/constants';


type detailsProps = {

};

// TODO: remove use client ?
// TODO: refer temp/form-gpt4.tsx
const details = (props:detailsProps) => {
  const {  } = props;
  const [ cookies ] = useCookies([tokenName]);

  // if (!cookies[tokenName]) throw error in layout;

  async function getUserDetails() {

    const userInfoStoredRaw = localStorage.getItem('userInfo');
    const userInfoStored = JSON.parse(userInfoStoredRaw || '{}');
    const userEmail = userInfoStored.email;
    const encodedEmail = encodeURIComponent(userEmail);

    // TODO: toast
    if (!userEmail) return;

    const getUser = await fetch(`/api/user/details?email=${encodedEmail}`, {
      headers: {
        'Authorization': `Bearer ${cookies[tokenName]}`
      }
    });

    const resGetUser = await getUser.json();

    console.log(`resGetUser: `, resGetUser);

  };

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      console.log(e);

      const rawFormData = new FormData(e.currentTarget);
      console.log(`rawFormData: `, rawFormData);
      const formData = Object.fromEntries(rawFormData);
      console.log(`formData: `, formData);

      await fetch('/api/user/details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies[tokenName]}`
         },
        body: JSON.stringify(formData),
      })

    } catch (error) {

    };
  };

  useEffect(() => {
    getUserDetails();
  }, []);


  return (
    <div className={styles.details}>
      <h2 className={styles.title}>Contact details</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name='street'
          type='text'
          placeholder='House number, Street name'
        />
        <Input
          name='city'
          type='text'
          placeholder='City'
        />
        <Input
          name='state'
          type='text'
          placeholder='State'
        />
        <Input
          name='country'
          type='text'
          placeholder='Country'
        />
        <Input
          name='zip'
          type='text'
          placeholder='Zip code'
        />
        <Input
          name='phone'
          type='tel'
          placeholder='Phone number'
        />
        <Button
          type='primary'
          htmlType='submit'
          >
            Save
        </Button>
      </form>

    </div>
  )
};


export default details;
