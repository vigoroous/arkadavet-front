import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import Layout from '@components/layout'
import styles from '@styles/home.module.css'
import useFilters, { FilterActions } from 'hooks/useFilters'
import { ProductType } from './products/[pid]'


// ProductElem
const ProductElem: FC<ProductType> = ({ id, name, category, imageUrl }) => {
    const CategoryElem = category.name.replace(/ /gi, '<br />')
    return (
        <Link href={`/products/${id}`} passHref>
            <a className={styles['products__item']}>
                <div className={styles['products__item-name']}>{name}</div>
                <div className={styles['products__item-category']} dangerouslySetInnerHTML={{ __html: CategoryElem }}></div>
                <div className={styles['products__item-image']} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            </a>
        </Link >
    )
}

// Products
type ProductsProps = {
    filters: string,
}

const Products: FC<ProductsProps> = ({ filters }) => {
    const [data, setData] = useState<ProductType[] | null>(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${filters}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: ProductType[]) => setData(data))
            .catch(e => console.log(e))
    }, [filters])

    if (!data) return <div>Loading...</div>
    return (
        <div className={styles['products']}>
            {data.map(e =>
                <ProductElem key={e.id} {...e} />)}
        </div>
    )
}


// Controls
type ControlProps = {
    dispatch: FilterActions,
    filters: string,
}

const Controls: FC<ControlProps> = ({ filters, dispatch }) => {
    const clear = () => dispatch({ 'type': 'CLEAR_FILTERS' })
    const setFilter = (str: string) => () => dispatch({ 'type': 'TOGGLE_FILTER', 'filter': str })

    const ControlElem: FC<{ id: string }> = ({ id, children }) =>
        <button className={`${styles['control__button']} ${filters === id && styles['control__button_active']}`} data-filter={id} onClick={setFilter(id)}>{children}</button>

    return (
        <div className={styles['control']}>
            <div className={styles['control__filter']}>
                <button className={`${styles['control__button']} ${filters === '' && styles['control__button_active']}`} onClick={clear}>Показать все</button>
                <ControlElem id='antibacterial'>Антибактер.<br />препараты</ControlElem>
                <ControlElem id='anticoccidal'>Противококц.<br />препараты</ControlElem>
                <ControlElem id='vitamins'>Кормовые<br />добавки</ControlElem>
                <ControlElem id='adsorbent'>Адсорбент<br />микотоксинов</ControlElem>
                <ControlElem id='antiinflammatory'>Противовосп.<br />препараты</ControlElem>
                <ControlElem id='hormonal'>Гормональные<br />препараты</ControlElem>
                <ControlElem id='complex'>Противоинф.<br />препараты</ControlElem>
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
const Home: NextPageWithLayout = () => {
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
            <Controls dispatch={dispatch} filters={state.filters}/>
            <Products filters={state.filters} />
        </main>

    )
}

export default Home

Home.getLayout = function getLayout(page) {
    return (
        <Layout selected='home'>
            {page}
        </Layout>
    )
}