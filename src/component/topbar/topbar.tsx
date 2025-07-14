'use client';

import styles from './topbar.module.css';

import { useTheme } from '@/context/theme-context';
import { usePathname } from 'next/navigation';

const TopBar = () => {
  const { brand } = useTheme();
  const pathname = usePathname();

  return (
    <header className={`${styles.topBar} bg-[var(--brand-secondary-color)]`}>
      <div className="flex justify-between items-center">
        <img className={styles.logo} src={brand.logo} alt={`${brand.name} logo`} />
      </div>
    </header>
  );
};

export default TopBar;