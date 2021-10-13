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

// Paginator
type PageType = {
    count: number,
    previous: string,
    next: string,
    results: ProductType[],
}

type PaginatorProps = {
    count: number,
    currentPage: number,
    // setPage: (pageNumber: number) => () => statePage,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    limit: number,
}

const Paginator: FC<PaginatorProps> = ({ count, currentPage, setPage, limit }) => {
    const firstPage = 1
    const lastPage = Math.ceil(count / limit)

    // if (!currentPage) return <div>Loading...</div>
    //TODO: handle currentPage < 0

    const PaginatorButton: FC<{ id: number }> = ({ id }) => {
        return (
            <button
                className={`${styles['paginator__button']} ${currentPage === id && styles['paginator__button_active']}`}
                page-number={id}
                onClick={() => setPage(id)}
            >
                {id}
            </button>
        )
    }

    const FirstPage = () => currentPage > firstPage ? <PaginatorButton id={firstPage} /> : null
    const LastPage = () => currentPage < lastPage ? <PaginatorButton id={lastPage} /> : null
    const CurrentPage = () => <PaginatorButton id={currentPage} />
    const PrevPage = () => currentPage > firstPage + 1 ? <PaginatorButton id={currentPage - 1} /> : null
    const NextPage = () => currentPage < lastPage - 1 ? <PaginatorButton id={currentPage + 1} /> : null

    return (
        <div className={styles['paginator']}>
            <FirstPage />
            <PrevPage />
            <CurrentPage />
            <NextPage />
            <LastPage />
        </div>
    )
}

// Products
type ProductsProps = {
    filters: string,
    sorts: string,
}

const Products: FC<ProductsProps> = ({ filters, sorts }) => {
    const [statePage, setPage] = useState(1)
    const [data, setData] = useState<PageType | null>(null)

    const limit = 8
    const offset = statePage * limit - limit

    // Move user to first page when filters applied
    useEffect(() => setPage(1), [filters, sorts])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?limit=${limit}&offset=${offset}&category=${filters}&ordering=${sorts}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("failed to get...")
            })
            .then((data: PageType) => setData(data))
            .catch(e => console.log(e))
    }, [limit, offset, filters, sorts])

    if (!data) return <div>Loading...</div>
    return (
        <>
            <div className={styles['products']}>
                {data.results.map(e =>
                    <ProductElem key={e.id} {...e} />)}
            </div>
            <Paginator
                count={data.count}
                currentPage={statePage}
                setPage={setPage}
                limit={limit}
            />
        </>
    )
}


// Controls
type ControlProps = {
    dispatch: FilterActions,
    filters: string,
    sorts: string,
}

const Controls: FC<ControlProps> = ({ filters, sorts, dispatch }) => {
    const clear = () => dispatch({ 'type': 'CLEAR_FILTERS' })
    const setFilter = (str: string) => () => dispatch({ 'type': 'TOGGLE_FILTER', 'filter': str })
    const setSort = (str: string) => () => dispatch({ 'type': 'TOGGLE_SORT', 'sort': str })

    const FilterButton: FC<{ id: string }> = ({ id, children }) =>
        <button className={`${styles['control__button']} ${filters === id && styles['control__button_active']}`} data-filter={id} onClick={setFilter(id)}>{children}</button>

    const SortButton: FC<{ id: string }> = ({ id, children }) =>
        <button className={`${styles['control__button']} ${sorts === id && styles['control__button_active']}`} data-sort-by={id} onClick={setSort(id)}>{children}</button>

    return (
        <div className={styles['control']}>
            <div className={styles['control__filter']}>
                <button className={`${styles['control__button']} ${filters === '' && styles['control__button_active']}`} onClick={clear}>Показать все</button>
                <FilterButton id='antibacterial'>Антибактер.<br />препараты</FilterButton>
                <FilterButton id='anticoccidal'>Противококц.<br />препараты</FilterButton>
                <FilterButton id='vitamins'>Кормовые<br />добавки</FilterButton>
                <FilterButton id='adsorbent'>Адсорбент<br />микотоксинов</FilterButton>
                <FilterButton id='antiinflammatory'>Противовосп.<br />препараты</FilterButton>
                <FilterButton id='hormonal'>Гормональные<br />препараты</FilterButton>
                <FilterButton id='complex'>Противоинф.<br />препараты</FilterButton>
            </div>
            <div className={styles['control__divider']}></div>
            <div className={styles['control__sorting']}>
                <SortButton id='-rating'>По популярности</SortButton>
                <SortButton id='name'>По названию</SortButton>
                <SortButton id='category'>По категории</SortButton>
            </div>
        </div>
    )
}


// Home
const Home: NextPageWithLayout = () => {
    const [stateFilter, setFilter] = useFilters()

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
            <Controls filters={stateFilter.filters} sorts={stateFilter.sorts} dispatch={setFilter} />
            <Products filters={stateFilter.filters} sorts={stateFilter.sorts} />
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