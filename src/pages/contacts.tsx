import React, { useRef, useState } from 'react'
import { NextPageWithLayout } from './_app'
import Layout from '@components/layout'
import styles from "@styles/contacts.module.css"
import { API_HOST } from './_app'


const Contacts: NextPageWithLayout = (props) => {
    const form = useRef<HTMLFormElement>(null)
    const [buttonState, setButtonState] = useState(false)

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (!form.current) return
        const formData = new FormData(form.current)
        form.current.reset()
        setButtonState(true)

        fetch(`${API_HOST}/products/form/`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: number) => {
                data === 1 ? alert('Сообщение отправлено.') : alert('Сообщение не было отправлено.')
                setButtonState(false)
            })
            .catch(e => console.log(e))
    }

    return (
        <main className={"content " + styles['content_contacts']}>
            <h1 className={styles.title}>Контакты</h1>
            <div className={styles.wrap}>
                <div className={styles.article}>
                    <p className={styles.text}>
                        С нами Вы всегда можете связаться по телефонам или электронной почте,
                        указанным ниже. Позвонив нам, Вы сможете получить консультацию по выбору наиболее подходящего
                        препарата для Ваших целей. Мы также рассчитаем окончательную стоимость заказа.
                    </p>
                    <p className={styles.phone}>
                        +7&nbsp;(495)&nbsp;514-73-63
                        <br />
                        +7&nbsp;(903)&nbsp;614-15-92
                    </p>
                    <p className={styles.email}>arkada.vet@yandex.ru</p>
                    <p className={styles.text}>Мы работаем ежедневно и без выходных.</p>
                </div>
                <form className={styles['form']} ref={form} onSubmit={handleSubmit}>
                    <input type="text" name="name" className={styles.form__input} placeholder="Имя" />
                    <input type="text" name="email" className={styles.form__input} placeholder="Эл. почта" />
                    <input type="text" name="phone" className={styles.form__input} placeholder="Телефон" />
                    <textarea cols={40} rows={5} name="order" className={styles.form__textarea}
                        placeholder="Добавьте сообщение..."></textarea>
                    <button type="submit" className={styles.form__button} disabled={buttonState}>Отправить</button>
                </form>
            </div>
        </main>
    )
}


export default Contacts


Contacts.getLayout = function getLayout(page) {
    return (
        <Layout selected='contacts'>
            {page}
        </Layout>
    )
}