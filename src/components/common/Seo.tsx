import { site } from '../../data/site'

type Props = { title: string; description: string; path: string }

/** Per-page metadata. React 19 hoists these tags into <head>. */
export function Seo({ title, description, path }: Props) {
  const full = `${title} | ${site.name} — ${site.descriptor}`
  const url = `${site.url}${path}`
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
