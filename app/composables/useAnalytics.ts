export function useAnalytics() {
  function trackEvent(name: string, params?: Record<string, unknown>) {
    if (import.meta.server) return
    const { proxy } = useScriptGoogleAnalytics()
    proxy.gtag('event', name, params)
  }

  return { trackEvent }
}
