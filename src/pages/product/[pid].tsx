import React, { FC, Fragment, useEffect, useState } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { ProductType } from 'pages'
import Layout from '@components/layout'
import styles from '@styles/product.module.css'
import { useRouter } from 'next/dist/client/router'


type ProductDetailsType = {
    id: string,
    description: string,
    composition: string,
    contraindication: string,
    usage: string,
    elimination: string
}

const Product: FC = () => {
    const router = useRouter()
    const { pid } = router.query
    const [data, setData] = useState<ProductType | null>(null)


    useEffect(() => {
        if (!pid) return
        fetch(`http://127.0.0.1:8000/api/products/${pid}/`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: ProductType) => setData(data))
            .catch(e => console.log(e))
    }, [pid])


    if (!data) return <div>Loading...</div>
    return (
        <Fragment>
            <div className={styles['breadcrumbs']}>
                <p className={styles['breadcrumbs__text']}>
                    Каталог
                    &nbsp;&frasl;&nbsp;
                    {data.category}
                    &nbsp;&frasl;&nbsp;
                    {data.name}
                </p>
            </div>
            <div className={styles['order']}>
                <div className={styles['order__product-image']} style={{ backgroundImage: `url(${data.imageUrl})` }}></div>
                <form className={styles['form']}>
                    <h1 className={styles['order__product-name']}>{data.name}</h1>
                    <input type="text" name="name" className={styles['form__input']} placeholder="Имя" />
                    <input type="text" name="email" className={styles['form__input']} placeholder="Эл. почта" />
                    <input type="text" name="phone" className={styles['form__input']} placeholder="Телефон" />
                    <button type="submit" className={styles['form__button']}>Заказать</button>
                </form>
            </div>
            <ProductDetails id={data.details}/>
        </Fragment>
    )
}

const ProductDetails: FC<{ id: string }> = ({ id }) => {
    const [data, setData] = useState<ProductDetailsType | null>(null)

    useEffect(() => {
        if (!id) return
        fetch(`http://127.0.0.1:8000/api/productdetails/${id}/`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: ProductDetailsType) => setData(data))
            .catch(e => console.log(e))
    }, [id])

    if (!data) return <div>Loading...</div>
    return (
        <div className={styles['product-details']}>
            <div className={styles['product-details__l-container']}>
                <div className={styles['product-details__item']}>
                    <h2 className={styles['product-details__title']}>Описание</h2>
                    <div className={styles['product-details__text']}>
                        {data.description}
                    </div>
                </div>
                <div className={styles['product-details__item']}>
                    <h2 className={styles['product-details__title']}>Состав</h2>
                    <div className={styles['product-details__text']}>
                        {data.composition}
                    </div>
                </div>
                <div className={styles['product-details__item']}>
                    <h2 className={styles['product-details__title']}>Применение</h2>
                    <div className={styles['product-details__text']}>
                        {data.usage}
                    </div>
                </div>
            </div>
            <div className={styles['product-details__r-container']}>
                <div className={styles['product-details__item']}>
                    <h2 className={styles['product-details__title']}>Противопоказания</h2>
                    <div className={styles['product-details__text']}>
                        {data.contraindication}
                    </div>
                </div>
                <div className={styles['product-details__item']}>
                    <h2 className={styles['product-details__title']}>Сроки выведения</h2>
                    <div className={styles['product-details__text']}>
                        {data.elimination}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductPage: NextPageWithLayout = () => {

    return (
        <main className={"content " + styles['content_product']}>
            <Product />
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