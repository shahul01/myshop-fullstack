"use client";
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './page.module.css'


type detailsProps = {

};


const details = (props:detailsProps) => {
  const {  } = props;

  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
  };


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
