import React, { FC, Fragment, useRef, useState } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import Layout from '@components/layout'
import styles from '@styles/product.module.css'
import { useRouter } from 'next/dist/client/router'
import { GetStaticProps } from 'next'
import { API_HOST } from '../_app'


// Product
type ProductCategoryType = {
    id: string,
    name: string
}

type ProductDetailsType = {
    id: string,
    description: string,
    composition: string,
    contraindication: string,
    usage: string,
    elimination: string
}

export type ProductType = {
    id: string,
    name: string,
    category: ProductCategoryType,
    imageUrl: string,
    rating: number,
    details: ProductDetailsType
}

const Product: FC<ProductType> = (data) => {
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
        <Fragment>
            <div className={styles['breadcrumbs']}>
                <p className={styles['breadcrumbs__text']}>
                    Каталог
                    &nbsp;&frasl;&nbsp;
                    {data.category.name}
                    &nbsp;&frasl;&nbsp;
                    {data.name}
                </p>
            </div>
            <div className={styles['order']}>
                <div className={styles['order__product-image']} style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                <form className={styles['form']} ref={form} onSubmit={handleSubmit}>
                    <h1 className={styles['order__product-name']}>{data.name}</h1>
                    <input type="text" name="name" className={styles['form__input']} placeholder="Имя" />
                    <input type="text" name="email" className={styles['form__input']} placeholder="Эл. почта" />
                    <input type="text" name="phone" className={styles['form__input']} placeholder="Телефон" />
                    <input type="hidden" name="order" value={data.name} />
                    <button type="submit" className={styles['form__button']} disabled={buttonState}>Заказать</button>
                </form>
            </div>
            <div className={styles['product-details']}>
                <div className={styles['product-details__l-container']}>
                    <div className={styles['product-details__item']}>
                        <h2 className={styles['product-details__title']}>Описание</h2>
                        <div className={styles['product-details__text']}>
                            {data.details.description}
                        </div>
                    </div>
                    <div className={styles['product-details__item']}>
                        <h2 className={styles['product-details__title']}>Состав</h2>
                        <div className={styles['product-details__text']}>
                            {data.details.composition}
                        </div>
                    </div>
                    <div className={styles['product-details__item']}>
                        <h2 className={styles['product-details__title']}>Применение</h2>
                        <div className={styles['product-details__text']}>
                            {data.details.usage}
                        </div>
                    </div>
                </div>
                <div className={styles['product-details__r-container']}>
                    <div className={styles['product-details__item']}>
                        <h2 className={styles['product-details__title']}>Противопоказания</h2>
                        <div className={styles['product-details__text']}>
                            {data.details.contraindication}
                        </div>
                    </div>
                    <div className={styles['product-details__item']}>
                        <h2 className={styles['product-details__title']}>Сроки выведения</h2>
                        <div className={styles['product-details__text']}>
                            {data.details.elimination}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


// ProductPage
type ProductPageProps = {
    data: ProductType,
}

const ProductPage: NextPageWithLayout<ProductPageProps> = ({ data }) => {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <main className={"content " + styles['content_product']}>
            <Product {...data} />
        </main>
    )
}

export default ProductPage

ProductPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: '1' } }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        if (!params) throw new Error()
        const { pid } = params
        const res = await fetch(`${API_HOST}/products/full/${pid}/`)
        if (res.status === 404) throw new Error('Not found')
        const data: ProductType = await res.json()
        return {
            props: {
                data,
            },
            revalidate: 10,
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}