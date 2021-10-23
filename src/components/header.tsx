import React, { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '@styles/header.module.css'


export type HeaderProps = {
    selected?: 'home' | 'about' | 'contacts'
}

const Header: FC<HeaderProps> = ({ selected }) => {
    const [header, setHeader] = useState(false)
    const timer = useRef<number | null>(null)
    const [hide, setHide] = useState(true)

    const openDrawer = () => setHide(false)
    const hideDrawer = () => {
        if (timer.current === null) return
        timer.current = window.setTimeout(() => setHide(true), 500)
    }
    const toggleDrawer = () => {
        setHeader(!header)
        if (hide)
            openDrawer()
        else
            hideDrawer()
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__wrap_mobile}>
                <div className={`${styles['header__burger-wrap']}`}>
                    <div className={`${styles['header__burger']} ${header === true && styles['header__burger_opened']}`} onClick={toggleDrawer}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={`${styles['header__logo_mobile']}`}>
                    <a className={`${styles['header__logo-link_mobile']}`} href="/">Аркада-Вет</a>
                </div>
            </div>
            <div className={`${styles['header__wrap']} ${header === true && styles['header__wrap_opened']} ${hide === true && styles['header__wrap_closed']}`}>
                <div className={styles.header__logo}>
                    <Link href="/"><a className={styles['header__logo-link']}>Аркада-Вет</a></Link>
                </div>
                <nav className={`${styles['header__nav']} ${header === true && styles['header__nav_opened']}`}>
                    <Link href="/"><a className={`${styles['header__nav-link']} ${selected === 'home' && styles['header__nav-link_active']}`}>Каталог</a></Link>
                    <Link href="/about"><a className={`${styles['header__nav-link']} ${selected === 'about' && styles['header__nav-link_active']}`}>О&nbsp;нас</a></Link>
                    <Link href="/contacts"><a className={`${styles['header__nav-link']} ${selected === 'contacts' && styles['header__nav-link_active']}`}>Контакты</a></Link>
                </nav>
            </div>
        </header>
    )
}

export default Header