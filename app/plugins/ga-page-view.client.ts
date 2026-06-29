export default defineNuxtPlugin((nuxtApp) => {
  let isFirstPage = true

  nuxtApp.hook('page:finish', () => {
    if (isFirstPage) {
      isFirstPage = false
      return
    }

    const { proxy } = useScriptGoogleAnalytics()
    proxy.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: useRoute().fullPath,
      page_location: window.location.href
    })
  })
})
