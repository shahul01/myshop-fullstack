"use client";
import { Button, Input, InputNumber } from 'antd';
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { useCookies } from 'react-cookie';
import { tokenName } from '@/app/utils/constants';

type detailsProps = {};

// TODO: remove use client ?
// TODO: refer temp/form-gpt4.tsx
const details = (props: detailsProps) => {
  const {} = props;
  const [cookies] = useCookies([tokenName]);
  // const detailsFormRef = useRef(null);
  const [userInfo, setUserInfo] = useState({
    id: "", email: "", fullname: "", username: ""
  });
  const [detailsForm, setDetailsForm] = useState({
    houseNoAndStreetName: "",
    city: "",
    state: "",
    country: "",
    zipCode: 0,
    phoneNumber: "",
  });

  // if (!cookies[tokenName]) throw error in layout;

  async function getUserDetails() {
    const userInfoStoredRaw = localStorage.getItem("userInfo");
    const userInfoStored = JSON.parse(userInfoStoredRaw || "{}");
    setUserInfo(userInfoStored);
    const userEmail = userInfoStored.email;
    const encodedEmail = encodeURIComponent(userEmail);
    // TODO: toast
    if (!userEmail) return;

    const getUser = await fetch(`/api/user/details?email=${encodedEmail}`, {
      headers: {
        Authorization: `Bearer ${cookies[tokenName]}`,
      },
    });

    const resGetUser = await getUser.json();

    console.log(`resGetUser: `, resGetUser);
    return resGetUser;
  }

  function updateFormData(resGetUser: Record<string, any>) {
    console.log("updateFormData resGetUser", resGetUser);
    if (!resGetUser) return;

    Object.keys(resGetUser).forEach((key) => {
      setDetailsForm((prev) => ({
        ...prev,
        [key]: resGetUser[key],
      }));
    });
  }

  function handleChange(e:BaseSyntheticEvent|number|null) {
    console.log(`e: `, e);
    if (!e || (typeof e !== 'number' && !e.target?.name)) return;

    const [key, value] = typeof(e) === 'number'
      ? ['zipCode', e]
      : [e.target.name, e.target.value];

    setDetailsForm(() => ({
      ...detailsForm, [key]: value
    }));

  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      console.log(detailsForm);
      if (!userInfo.id) return;
      // const rawFormData = new FormData(detailsFormRef.current);
      // const formData = Object.fromEntries(rawFormData.entries());

      const encodedId = encodeURIComponent(userInfo?.id || '');
      await fetch(`/api/user/details?id=${encodedId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies[tokenName]}`
         },
        body: JSON.stringify(detailsForm),
      })
    } catch (error) {}
  }

  async function initFormData() {
    const loadedDetails = await getUserDetails();
    updateFormData(loadedDetails);
  }

  useEffect(() => {
    initFormData();
  }, []);

  return (
    <div className={styles.details}>
      <h2 className={styles.title}>Contact details</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name='houseNoAndStreetName'
          type='text'
          placeholder='House number, Street name'
          value={detailsForm.houseNoAndStreetName}
          onChange={handleChange}
        />
        <Input
          name='city'
          type='text'
          placeholder='City'
          value={detailsForm.city}
          onChange={handleChange}
        />
        <Input
          name='state'
          type='text'
          placeholder='State'
          value={detailsForm.state}
          onChange={handleChange}
        />
        <Input
          name='country'
          type='text'
          placeholder='Country'
          value={detailsForm.country}
          onChange={handleChange}
        />
        <InputNumber
          name='zipCode'
          type='number'
          placeholder='Zip code'
          value={detailsForm.zipCode}
          onChange={handleChange}
        />
        <Input
          name='phoneNumber'
          type='tel'
          placeholder='Phone number'
          value={detailsForm.phoneNumber}
          onChange={handleChange}
        />
        <Button type='primary' htmlType='submit'>
          Save
        </Button>
      </form>
    </div>
  );
};

export default details;
