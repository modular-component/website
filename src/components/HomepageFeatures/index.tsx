import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Extensible factory',
    Svg: require('@site/static/img/factory.svg').default,
    description: (
      <>
        Take advantage of the factory pattern to  build consistent
        components through reusable pieces.
      </>
    ),
  },
  {
    title: 'Delightfully organized',
    Svg: require('@site/static/img/composition.svg').default,
    description: (
      <>
        Discover a standard way to write clean components while keeping
        them extensible and reusable.
      </>
    ),
  },
  {
    title: 'Deeply testable',
    Svg: require('@site/static/img/isolation.svg').default,
    description: (
      <>
       Get out-of-the-box testing capability with built-in ways of isolating
       each component part.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
