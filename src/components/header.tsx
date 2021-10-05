import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import styles from '@styles/header.module.css'


const Header: FunctionComponent = () =>
    <header className={styles.header}>
        <div className={styles.header__wrap}>
            <div className={styles.header__logo}>
                <Link href="/"><a className={styles['header__logo-link']}>Аркада-Вет</a></Link>
            </div>
            <nav className={styles.header__nav}>
                <Link href="/"><a className={styles['header__nav-link']} href="/">Каталог</a></Link>
                <Link href="/"><a className={styles['header__nav-link']} href="/about">О&nbsp;нас</a></Link>
                <Link href="/"><a className={styles['header__nav-link']} href="/contacts">Контакты</a></Link>
            </nav>
        </div>
    </header>

export default Header