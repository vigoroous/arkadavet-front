import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from '@styles/header.module.css'
import styles_mobile from '@styles/header_mobile.module.css'


export type HeaderProps = {
    selected?: 'home' | 'about' | 'contacts'
}

type MobileDrawerProps = {
    open: boolean,
    delay?: number,
} & HeaderProps

const MobileDrawer: FC<MobileDrawerProps> = ({open, selected, delay = 300}) => {
    const timer = useRef<number | undefined>(undefined)
    const [actuallyOpen, setActuallyOpen] = useState(false)

    useEffect(() => {
        if (timer.current) window.clearTimeout(timer.current)
        if (open) {
            setActuallyOpen(true)
        } else {
            timer.current = window.setTimeout(() => setActuallyOpen(false), delay)
            return () => window.clearTimeout(timer.current)
        }
    }, [open, delay])

    if (!actuallyOpen) return null 
    return(
        <div className={`${styles_mobile['header__nav-wrap']} ${open ? styles_mobile['header__nav-wrap_opened'] : styles_mobile['header__nav-wrap_closed']}`}>
            <nav className={`${styles_mobile['header__nav']} ${open ? styles_mobile['header__nav_opened'] : styles_mobile['header__nav_closed']}`}>
                <Link href="/" passHref><a className={`${styles_mobile['header__nav-link']} ${selected === 'home' && styles_mobile['header__nav-link_active']}`}>Каталог</a></Link>
                <Link href="/about" passHref><a className={`${styles_mobile['header__nav-link']} ${selected === 'about' && styles_mobile['header__nav-link_active']}`}>О&nbsp;нас</a></Link>
                <Link href="/contacts" passHref><a className={`${styles_mobile['header__nav-link']} ${selected === 'contacts' && styles_mobile['header__nav-link_active']}`}>Контакты</a></Link>
            </nav>
        </div>
    )
}

const MobileHeader: FC<HeaderProps> = ({ selected }) => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => setOpen(!open)

    useEffect(()=> setOpen(false), [selected])

    return (
        <header className={`${styles_mobile['header']}`}>
            <div className={`${styles_mobile['header__wrap']}`}>
                <div className={`${styles_mobile['header__burger-wrap']}`}>
                    <div className={`${styles_mobile['header__burger']} ${open && styles_mobile['header__burger_opened']}`}
                        onClick={toggleDrawer}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={`${styles_mobile['header__logo']}`}>
                <Link href="/" passHref><a className={`${styles_mobile['header__logo-link']}`}>Аркада-Вет</a></Link>
                </div>
            </div>
            <MobileDrawer open={open} selected={selected}/>
        </header>
    )
}


const DesktopHeader: FC<HeaderProps> = ({ selected }) => {
    return (
        <header className={`${styles['header']}`}>
            <div className={`${styles['header__wrap']}`}>
                <div className={`${styles['header__logo']}`}>
                    <Link href="/" passHref><a className={`${styles['header__logo-link']}`}>Аркада-Вет</a></Link>
                </div>
                <nav className={`${styles['header__nav']}`}>
                    <Link href="/" passHref><a className={`${styles['header__nav-link']} ${selected === 'home' && styles['header__nav-link_active']}`}>Каталог</a></Link>
                    <Link href="/about" passHref><a className={`${styles['header__nav-link']} ${selected === 'about' && styles['header__nav-link_active']}`}>О&nbsp;нас</a></Link>
                    <Link href="/contacts" passHref><a className={`${styles['header__nav-link']} ${selected === 'contacts' && styles['header__nav-link_active']}`}>Контакты</a></Link>
                </nav>
            </div>
        </header>
    )
}


const Header: FC<HeaderProps> = ({ selected }) => {

    return (
        <>
            <MobileHeader selected={selected} />
            <DesktopHeader selected={selected} />
        </>
    )
}

export default Header