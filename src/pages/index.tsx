import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import Layout from '@components/layout'
import styles from '@styles/home.module.css'
import useFilters, { FilterActions } from 'hooks/useFilters'
import { GetStaticProps } from 'next'
import { ProductType } from './product/[pid]'


// ProductElem
const ProductElem: FC<ProductType> = ({ id, name, category, imageUrl }) => {
    const CategoryElem = category.name.replace(/ /gi, '<br />')
    return (
        <Link href={`/product/${id}`} passHref>
            <a className={styles['products__item']}>
                <div className={styles['products__item-name']}>{name}</div>
                <div className={styles['products__item-category']} dangerouslySetInnerHTML={{__html: CategoryElem}}></div>
                <div className={styles['products__item-image']} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            </a>
        </Link >
    )
}

// Products
type ProductsProps = {
    data: ProductType[],
    filters: string[]
}

const Products: FC<ProductsProps> = ({ filters, data }) => {
    return (
        <div className={styles['products']}>
            {data.map(e =>
                <ProductElem key={e.id} {...e} />)}
        </div>
    )
}


// Controls
type ControlProps = {
    dispatch: FilterActions
}

const Controls: FC<ControlProps> = ({ dispatch }) => {

    return (
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
    )
}


// Home
const Home: NextPageWithLayout<{ data: ProductType[] }> = ({ data }) => {
    const [state, dispatch] = useFilters()

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
            <Controls dispatch={dispatch} />
            <Products filters={state.filters} data={data} />
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/product/")
        const data: ProductType = await res.json();

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