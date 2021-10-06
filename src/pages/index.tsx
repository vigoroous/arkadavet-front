import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NextPageWithLayout } from './_app'
import Layout from '@components/layout'
import styles from '@styles/home.module.css'


type Product = {
    name: string,
    category: string,
    imageUrl: string,
    rating: number,
    details: string,
}


const Home: NextPageWithLayout = (props) => {
    const [productsData, setProductsData] = useState<Product[] | null>(null)
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/", {
            method: 'GET',
            body: JSON.stringify({ page })
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: Product) => setProductsData(data))
            .catch(e => console.log(e))
    }, [page])

    const Products = (
        <Link href="/products/">
            <a className={styles['products__item']}>
                <div className={styles['products__item-name']}>Аквадокс</div>
                <div className={styles['products__item-category']}>Антибактериальные<br />препараты</div>
                <div className={styles['products__item-image']}></div>
            </a>
        </Link >
    )

    return (
        <main className={"content " + styles['content_main']}>
            <div className={styles['lightbox']}>
                <div className={styles['lightbox__article']}>
                    <h1 className={styles['lightbox__title']}>Ветеринарные препараты</h1>
                    <div className={styles['lightbox__text']}>
                        вакцины для с/х животных
                        <br />
                        кормовые добавки
                    </div>
                    <div className={styles['lightbox__line']}></div>
                </div>
                <div className={styles['lightbox__image']}></div>
            </div>
            <div className={styles['control']}>
                <div className={styles['control__filter']}>
                    <button className={styles['control__button'] + " " + styles['control__button_active']}>Показать все</button>
                    <button className={styles['control__button']} data-filter="antibacterial">Антибактер.<br />препараты</button>
                    <button className={styles['control__button']} data-filter="anti-coccidal">Противококц.<br />препараты</button>
                    <button className={styles['control__button']} data-filter="vitamins">Кормовые<br />добавки</button>
                    <button className={styles['control__button']} data-filter="adsorbent">Адсорбент<br />микотоксинов</button>
                    <button className={styles['control__button']} data-filter="anti-inflammatory">Противовосп.<br />препараты</button>
                    <button className={styles['control__button']} data-filter="hormonal">Гормональные<br />препараты</button>
                    <button className={styles['control__button']} data-filter="complex">Противоинф.<br />препараты</button>
                </div>
                <div className={styles['control__divider']}></div>
                <div className={styles['control__sorting']}>
                    <button className={styles['control__button'] + " " + styles['control__button_active']} data-sort-by="rating">По популярности</button>
                    <button className={styles['control__button']} data-sort-by="name">По названию</button>
                    <button className={styles['control__button']} data-sort-by="category">По категории</button>
                </div>
            </div>
            <div className={styles['products']}>
                {Products}
            </div>
        </main>
    )
}


export default Home


Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}