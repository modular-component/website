import React, {useLayoutEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Logo from '@site/static/img/logo.svg';
import {
  FaAlignLeft,
  FaAsterisk,
  FaChevronRight,
  FaDownload,
  FaMagnifyingGlass,
  FaMicrochip,
  FaMicroscope,
  FaPlus
} from "react-icons/fa6";

import styles from './index.module.css'

function HomepageContent() {
  const {siteConfig} = useDocusaurusContext();

  useLayoutEffect(() => {
    const update = () => {
      document.getElementById('bg').style.top = (-window.scrollY * 2 / 3) + 'px'
    }
    window.addEventListener('scroll', update)
    update()
    return () => window.removeEventListener('scroll', update)
  }, []);

  return (
    <>
      <div id="bg" className={styles.bg} aria-hidden="true"></div>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <a className={styles.brand} href="https://github.com/modular-component/modular-component" target="_blank">
              <div className={styles.logo} aria-hidden="true">
                <Logo data-logo className={styles.heroLogo}/>
              </div>
              <div>
                <strong data-code>ModularComponent</strong>
                <span>🍞<wbr/>.with(🍅)<wbr/>.with(🧀) = 🥪</span>
              </div>
            </a>

            <div className={styles.navCta}>
              <a className={styles.btn + ' ' + styles.ghost} href="/docs/reference">
                Reference
                <FaAsterisk/>
              </a>
              <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                Get started
                <FaChevronRight/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.kicker}>
                  <span className={styles.dot} aria-hidden="true"></span>
                  Typed factory pipeline for React components
                </div>

                <h1 className={styles.h1}>Build components through clean, predictable pipelines</h1>
                <p className={styles.subhead}>
                  <strong data-code>ModularComponent</strong> composes React components through a modular factory: add
                  capabilities stage-by-stage,
                  keep concerns isolated, and make testing feel native.
                </p>

                <div className={styles.heroActions}>
                  <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                    Read the docs
                    <FaChevronRight/>
                  </a>
                  <a className={styles.btn} href="/docs/extensions/writing-extensions">
                    Write an extension
                    <FaPlus/>
                  </a>
                  <a className={styles.btn + ' ' + styles.ghost} href="/docs/intro#installation">
                    Install
                    <FaDownload/>
                  </a>
                </div>

                <div className={styles.heroMeta}>
                  <span className={styles.pill}><code>.with()</code> compose stages</span>
                  <span className={styles.pill}><code>.use()</code> generate hooks</span>
                  <span className={styles.pill}><code>.stage()</code> isolate for tests</span>
                </div>
              </div>

              <aside className={styles.card + ' ' + styles.codecard} aria-label="Example code">
                <div className={styles.cardHead}>
                  <div className={styles.windowDots} aria-hidden="true"><i></i><i></i><i></i></div>
                  <div className={styles.label}>Modular factory pipeline</div>
                </div>
                <pre><code><span className={styles.tokC}>// install</span>
<br/>
npm i <span className={styles.tokS}>@modular-component/core</span> <span
                    className={styles.tokS}>@modular-component/default</span>
<br/>
<br/>
<span className={styles.tokC}>// register stages (recommended)</span>
<br/>
<span className={styles.tokK}>import</span> <span className={styles.tokS}>'@modular-component/default/register'</span>
<br/>
<span className={styles.tokK}>import</span> &#123; <span className={styles.tokF}>ModularComponent</span> &#125; <span
                    className={styles.tokK}>from</span> <span className={styles.tokS}>'@modular-component/core'</span>
<br/>
<br/>

<span className={styles.tokK}>export</span> <span className={styles.tokK}>const</span> <span
                    className={styles.tokF}>Counter</span> = <span
                    className={styles.tokF}>ModularComponent</span>&lt;&#123;
                  <br/>&nbsp;
                  step?: number
                  <br/>
                  &#125;&gt;(<span
                    className={styles.tokS}>'Counter'</span>)
<br/>&nbsp;
                  .<span className={styles.tokF}>withDefaultProps</span>(&#123; step: <span className={styles.tokK}>1</span> &#125;)
<br/>&nbsp;
                  .<span className={styles.tokF}>withLifecycle</span>((&#123; props &#125;) =&gt; &#123;
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.tokK}>const</span> [count, setCount] = <span
                    className={styles.tokF}>useState</span>(<span className={styles.tokK}>0</span>)
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.tokK}>return</span> &#123; count, inc: () =&gt; <span
                    className={styles.tokF}>setCount</span>(c =&gt; c + props.step) &#125;
                  <br/>&nbsp;
                  &#125;)
                  <br/>&nbsp;
                  .<span className={styles.tokF}>withRender</span>((&#123; lifecycle &#125;) =&gt; (
                  <br/>&nbsp;&nbsp;&nbsp;
                  &lt;<span
                    className={styles.tokF}>button</span> onClick=&#123;lifecycle.inc&#125;&gt;&#123;lifecycle.count&#125;&lt;/<span
                    className={styles.tokF}>button</span>&gt;
                  <br/>&nbsp;
                  ))</code></pre>
              </aside>
            </div>
          </div>
        </div>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>What it brings</h2>
                <p className={styles.sectionDesc}>
                  The factory approach lets you add functionality as the component is built, keeping JSX focused while
                  other stages handle state, wiring, and cross-cutting concerns.
                </p>
              </div>
            </div>

            <div className={styles.features} role="list">
              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <FaMicrochip/>
                </div>
                <h3>Extensible factory</h3>
                <p>Compose reusable stages to build consistent components across your codebase.</p>
              </article>

              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <FaAlignLeft/>
                </div>
                <h3>Delightfully organized</h3>
                <p>Separate markup, lifecycle/state, and wiring—without losing readability.</p>
              </article>

              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <FaMicroscope/>
                </div>
                <h3>Deeply testable</h3>
                <p>Isolate stages for tests, or turn pipelines into hooks when you don’t need rendering.</p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>How it works</h2>
                <p className={styles.sectionDesc}>
                  Build a pipeline of ordered stages. Each stage populates a shared argument map for downstream stages.
                </p>
              </div>
            </div>

            <div className={styles.pipeline}>
              <div className={styles.pipeRow}>
                <div className={styles.diagram} aria-label="Pipeline diagram">
                  <div className={styles.nodes}>
                    <div className={styles.node}>
                      <strong>props</strong>
                      <span>defaults, validation, adapters</span>
                    </div>
                    <div className={styles.node}>
                      <strong>logic</strong>
                      <span>hooks, state, effects, data</span>
                    </div>
                    <div className={styles.node}>
                      <strong>render</strong>
                      <span>focused JSX, minimal glue</span>
                    </div>
                  </div>
                </div>

                <div className={styles.callouts}>
                  <h3>Smart patterns and helpers</h3>

                  <div className={styles.callout}>
                    <code>.use()</code>
                    <p>Turn a pipeline into a hook (or isolate a single field).</p>
                  </div>

                  <div className={styles.callout}>
                    <code>.stage()</code>
                    <p>Extract a stage to unit-test it with fully controlled inputs.</p>
                  </div>

                  <div className={styles.callout}>
                    <code>/register</code>
                    <p>Extensions offer a register entrypoint for automatic stage registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>Get started now</h2>
                <p className={styles.sectionDesc}>
                  Start with the core factory, add the default stage pack, and add on your custom stages as your app
                  needs.
                </p>
              </div>
            </div>

            <div className={styles.split}>
              <div className={styles.panel}>
                <h3>Install</h3>
                <p>Core and the recommended default capability pack.</p>
                <div className={styles.miniPre}>
                  <pre><code>npm install <span
                    className={styles.tokS}>@modular-component/core @modular-component/default</span></code></pre>
                </div>

                <div style={{height: '40px'}}></div>

                <h3>Register stages</h3>
                <p>Keep component definitions clean with stage registration.</p>
                <div className={styles.miniPre}>
                  <pre><code><span className={styles.tokK}>import</span> <span
                    className={styles.tokS}>'@modular-component/default/register'</span></code></pre>
                </div>
              </div>

              <div className={styles.panel}>
                <h3>Define a pipeline</h3>
                <p>Compose stages with a readable chain and keep JSX at the edge.</p>
                <div className={styles.miniPre}>
            <pre><code><span className={styles.tokK}>const</span> <span
              className={styles.tokF}>MyComponent</span> = <span
              className={styles.tokF}>ModularComponent</span>&lt;&#123; label: string &#125;&gt;()
              <br/>&nbsp;
              .<span className={styles.tokF}>withDefaultProps</span>(&#123; label: <span className={styles.tokS}>'Hello'</span> &#125;)
              <br/>&nbsp;
              .<span className={styles.tokF}>withLifecycle</span>((&#123; props &#125;) =&gt; (&#123;
              <br/>&nbsp;&nbsp;&nbsp;
              upper: props.label.<span
                className={styles.tokF}>toUpperCase</span>()
              <br/>&nbsp;
              &#125;))
              <br/>&nbsp;
              .<span className={styles.tokF}>withRender</span>((&#123; lifecycle &#125;) =&gt; (
              <br/>&nbsp;&nbsp;&nbsp;
              &lt;<span
                className={styles.tokF}>h2</span>&gt;&#123;lifecycle.upper&#125;&lt;/<span
                className={styles.tokF}>h2</span>&gt;
              <br/>&nbsp;
              ))</code></pre>
                </div>

                <div className={styles.heroActions}>
                <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                  Dive deeper
                  <FaChevronRight/>
                </a>
                <a className={styles.btn} href="/docs/extensions/writing-extensions">Explore
                  extensions
                  <FaMagnifyingGlass/>
                </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Delightfully organized and deeply testable React Components">
      <HomepageContent/>
    </Layout>
  );
}
