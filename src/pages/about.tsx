import React from 'react'
import type { NextPage } from 'next'
import { NextPageWithLayout } from './_app'
import Layout from '@components/layout'
import styles from "@styles/about.module.css"

const About: NextPageWithLayout = (props) => {
    const test = 'Hello World'
    return (
        <main className={"content " + styles['content_about']}>
            <div className={styles.cover}></div>
            <div className={styles.article}>
                <h1 className={styles.title}>Фармацевтическая продукция для сельскохозяйственных животных</h1>
                <div className={styles.text}>
                    ООО «Аркада-Вет» занимается оптовой торговлей ветеринарных препаратов, необходимых для защиты
                    животных.
                    <br /><br />
                    Мы являемся официальными дистрибьюторами австрийской компании «ХаруФарм» и торгового дома
                    «Нита-Фарм»,
                    что даёт нам возможность предоставлять клиентам препараты не только российского производства, но и
                    препараты зарубежных партнеров.
                    <br /><br />
                    Компания ООО «Аркада-Вет» имеет все необходимые лицензии для осуществления своей деятельности. Наша
                    компания имеет большой опыт работы с ветеринарными препаратами, ведь мы на рынке уже более 10 лет.
                    Будем
                    рады видеть Вас в числе наших клиентов.
                </div>
            </div>
            <div className={styles.partners}>
                <div className={styles.partners__item}></div>
                <div className={styles.partners__item}></div>
            </div>
        </main>
    )
}

// export function getStaticProps() {
//     return ({
//         props: {}
//     })
// }

export default About

About.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}