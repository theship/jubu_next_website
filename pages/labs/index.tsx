import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const authors = allAuthors.find((p) => p.slug === 'labs') || null
  return { props: { authors } }
}

export default function Labs({
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!authors) {
    return <div>Julee's Labs.</div>;
  }

  return (
    <>
      <MDXLayoutRenderer
        layout={authors.layout || DEFAULT_LAYOUT}
        content={authors}
        MDXComponents={MDXComponents}
      />
    </>
  );
}

