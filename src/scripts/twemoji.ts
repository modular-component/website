import twemoji from 'twemoji';

const applyTwemoji = () => {
  twemoji.parse(document.body,
    { base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' }
  )
}

if (typeof window !== 'undefined' && 'MutationObserver' in window) {
  const observer = new window.MutationObserver(applyTwemoji)
  observer.observe(document.body, {childList: true, subtree: true})
  applyTwemoji()
}
