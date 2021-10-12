import React, { FC } from 'react'
import Link from 'next/link'
import styles from '@styles/header.module.css'


export type HeaderProps = {
    selected?: 'home' | 'about' | 'contacts'
}

const Header: FC<HeaderProps> = ({ selected }) =>
    <header className={styles.header}>
        <div className={styles.header__wrap}>
            <div className={styles.header__logo}>
                <Link href="/"><a className={styles['header__logo-link']}>Аркада-Вет</a></Link>
            </div>
            <nav className={styles.header__nav}>
                <Link href="/"><a className={`${styles['header__nav-link']} ${selected === 'home' && styles['header__nav-link_active']}`}>Каталог</a></Link>
                <Link href="/about"><a className={`${styles['header__nav-link']} ${selected === 'about' && styles['header__nav-link_active']}`}>О&nbsp;нас</a></Link>
                <Link href="/contacts"><a className={`${styles['header__nav-link']} ${selected === 'contacts' && styles['header__nav-link_active']}`}>Контакты</a></Link>
            </nav>
        </div>
    </header>

export default Header