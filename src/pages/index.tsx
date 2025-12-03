import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Logo from '@site/static/img/logo.svg'

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Logo data-logo className={styles.heroLogo}/>
        <h1 className={clsx("hero__title", styles.heroTitle)}>{siteConfig.title}</h1>
        <p className={clsx("hero__subtitle", styles.heroTitle)}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/* @ts-ignore */}
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>

          {/* @ts-ignore */}
          <Link
            className="button button--primary button--lg"
            to="/docs/extensions/writing-extensions">
            Write Extension
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    // @ts-ignore
    <Layout
      title={siteConfig.title}
      description="Delightfully organized and deeply testable React Components">
      <HomepageHeader/>
      <main>
        <HomepageFeatures/>
      </main>
    </Layout>
  );
}
