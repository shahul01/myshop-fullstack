import Link from 'next/link';
import styles from './page.module.css';


type userProps = {

};


const User = (props:userProps) => {
  const {  } = props;


  return (
    <div className={styles.user}>
      <h3>Hi{/* fullname */},</h3>

      <p>My Orders</p>
      <Link href='/user/details'>Contact details</Link>

    </div>
  )
};


export default User;
