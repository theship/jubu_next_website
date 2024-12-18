import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ProjectCard from '../../components/ProjectCard'
import { allLabs } from 'contentlayer/generated'
import { Labs } from 'contentlayer/generated'
import { isNotLabProject } from '../labs/index'

const Labs: NextPage<{ labs: Lab[] }> = ({ labs }) => {
  const [sortedLabs, setSortedLabs] = useState<Lab[]>()

  useEffect(() => {
    setSortedLabs(
      labs.filter((p) => !isNotLabProject(p)).sort(() => 0.5 - Math.random())
    )
  }, [labs])

  return (
    <>
      <Head>
        <title>Julee Burdekin | Labs</title>
      </Head>
      <section className="flex flex-col p-4 md:p-8">
        <div className="flex w-full items-center justify-between pb-8">
          <h1 id="labs">Labs</h1>
        </div>
        <ul className="grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {sortedLabs &&
            sortedLabs.map((p, i) => (
              <li key={i} className="">
                <ProjectCard
                  slug={`/labs/${p.slug}`}
                  title={p.title}
                  summary={p.summary}
                  coverImage={p.coverImage}
                  nym={p.nym}
                  tags={p.tags}
                />
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}

export default Labs

export async function getStaticProps({ params }: { params: any }) {
  const labs = allLabs

  return {
    props: {
      labs,
    },
  }
}
