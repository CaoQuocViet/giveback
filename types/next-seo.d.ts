declare module "next-seo" {
  import { ComponentType } from "react"

  export interface NextSeoProps {
    title?: string
    description?: string
    canonical?: string
    openGraph?: {
      url?: string
      title?: string
      description?: string
      images?: Array<{
        url: string
        width?: number
        height?: number
        alt?: string
      }>
      site_name?: string
    }
    twitter?: {
      handle?: string
      site?: string
      cardType?: string
    }
  }

  export const NextSeo: ComponentType<NextSeoProps>
}
