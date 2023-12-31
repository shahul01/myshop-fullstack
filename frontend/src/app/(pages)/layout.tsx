import type { Metadata } from 'next';
import styles from "./layout.module.css";
import '../globals.css';

export const metadata: Metadata = {
  title: 'MyShop',
  description: 'eCommerce Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.layout}>{children}</body>
    </html>
  )
}
