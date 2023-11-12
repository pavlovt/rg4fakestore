import React from 'react'
import { Helmet } from 'react-helmet'

export default function Analytics() {
  React.useEffect(() => {
    console.log('zzz')

    const win: any = global
    win.dataLayer = win.dataLayer || []
    win.gtag = (...args) => {
      // @ts-ignore
      win.dataLayer.push(args)
    }

    win.gtag('js', new Date())

    win.gtag('config', 'G-K4RWKBBEC3', { debug_mode: true })
  }, [])

  return (
    <Helmet>
      <script src="https://www.googletagmanager.com/gtag/js?id=G-K4RWKBBEC3" />
    </Helmet>
  )
}
