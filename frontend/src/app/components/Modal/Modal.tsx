import { useEffect, useState } from 'react';
import styles from './modal.module.css';
import Image from 'next/image';

interface IModalProps {
  isShowModal: boolean;
  onClose: (x:boolean) => void;
  title: string;
  children: React.ReactNode;
  // styleProp: Record<string, {num: number, unit: string}>;
};

const Modal = (props:IModalProps) => {
  const {
    isShowModal,
    onClose,
    title,
    children,
  } = props;

  const styleProp = {
    modalWidth: {num: 40, unit: 'vw'},
    modalHeight: {num: 30, unit: '%'},
  };
  const { modalWidth, modalHeight } = styleProp;

  return (
    <div
      className={styles.modal}
      style={{
        // transform: `translate(${(100 - modalWidth.num) / 2}vw, 5vh)`
        backdropFilter: `${isShowModal ? 'blur(6px)' : 'blur(0px)'}`,
        height: `${isShowModal ? '90%' : '0%'}`,
        width: `${isShowModal ? '100%' : '0%'}`
      }}
      >
      {isShowModal ?
        (
          <div
            className={styles["show-modal"]}
            style={{
              width: modalWidth.num + modalWidth.unit,
              height: styleProp.modalHeight.num + styleProp.modalHeight.unit,
            }}
            >
            <div className={styles.heading} >
              <h3>{title}</h3>
              <button
                  type='button'
                  title='Close Modal'
                  onClick={() => onClose(false)}
                >
                <Image
                  src={'/icons/iconClose.svg'}
                  alt='Close icon'
                  height={0}
                  width={30}
                />
              </button>
            </div>
            <div className="hr-fade" />
            <div
              className={styles.body}
              style={{height: `calc(90% - ${modalHeight.num}${modalHeight.unit})`}}
            >
              {children}
            </div>
          </div>
        ) : (
          <div className={styles["hide-modal" ]} />
        )

      }


    </div>
  )
};

export default Modal;
