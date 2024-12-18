import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import ProjectList from '../components/ProjectList'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { NewsletterForm } from 'pliny/ui/NewsletterForm'
import { allBlogs, allProjects } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { useRouter } from 'next/router'
import Typing from '@/components/Typing'
import CustomLink from '@/components/Link'

const MAX_DISPLAY = 2

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  const isShowcaseProject = (project) => project.showcase === true

  const projects = (allProjects || [])
    .filter(isShowcaseProject)
    .sort(() => 0.5 - Math.random())

  console.log('projects', projects)

  return { props: { posts, projects } }
}

export default function Home({
  posts,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  function closeModal() {
    setModalOpen(false)
  }

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
    }
  }, [router.isReady])
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-4 md:pb-8">
          <h1 className="py-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 max-[375px]:text-2xl sm:text-3xl sm:leading-10 md:py-4 md:text-5xl md:leading-14 lg:text-6xl">
            Content&nbsp;
            <span className="block lg:inline">
              <Typing />
            </span>
          </h1>
          <p className="text-xl leading-7 text-gray-500 dark:text-gray-400">
            Reimagining content creation for the AI age, I combine technical
            expertise with a deep understanding of language to build better
            tools for creators and developers. I craft the infrastructure that
            makes content more impactful and AI more human-friendly.
          </p>
          <div className="flex flex-wrap py-4">
            <div className="w-full md:w-1/2">
              <a href="/resume">
                <button
                  className="mb-2 mr-2 w-full rounded bg-indigo-900 px-4 text-xl font-semibold text-white hover:border-transparent hover:bg-indigo-900 hover:text-black dark:text-black dark:hover:text-white md:max-w-[98%]"
                >
                  My Résumé
                </button>
              </a>
            </div>
            <div className="hidden w-full md:block md:w-1/2">
              <a href="/portfolio">
                <button
                  className="mb-2 mr-2 w-full rounded bg-indigo-900 px-4 text-xl font-semibold text-white hover:border-transparent hover:bg-indigo-900 hover:text-black dark:text-black dark:hover:text-white md:max-w-[98%]"
                >
                  My Portfolio
                </button>
              </a>
            </div>
          </div>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            <em>All content on this site crafted with love—and HITL AI processes—by <CustomLink href="/about">me</CustomLink>.</em>
          </p>
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/about"
              className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Learn More"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-16 md:space-y-5 xl:pt-12">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 max-[375px]:text-2xl sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 lg:text-6xl">
            Why OpenSats?
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            We believe that free and open-source software in general, and
            bitcoin in particular, is essential to the future of the internet
            and the world.
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            We don't want any one person to have control over funding decisions,
            so we created a transparent, public-facing, and accountable{' '}
            <CustomLink href="/about#board-of-directors" className="underline">
              nine-person board
            </CustomLink>{' '}
            to make all organizational decisions.
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            We rely on donations to fund our operations and the projects we
            support. Unlike most charities, we don't take a cut from donations
            to fund ourselves. Consequently, we have to fund our operations
            separately. If you like what we are doing please consider donating
            to our{' '}
            <CustomLink
              href="/projects/project1"
              className="underline"
            >
              Operations Budget
            </CustomLink>
            .
          </p>
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/mission"
              className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Our Mission"
            >
              Our Mission &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-2 pt-8 md:space-y-5 xl:pt-12">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 max-[375px]:text-2xl sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 lg:text-6xl">
            Stay Updated
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Read the latest news from OpenSats:
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight max-[375px]:text-xl">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="hidden text-base font-medium leading-6 md:block">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        You can also find us on{' '}
        <CustomLink
          href="https://njump.me/npub10pensatlcfwktnvjjw2dtem38n6rvw8g6fv73h84cuacxn4c28eqyfn34f"
          className="underline"
        >
          nostr
        </CustomLink>
        .
      </p>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pb-8 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="xl:pt-18 space-y-2 pb-8 pt-8 md:space-y-5 ">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 max-[375px]:text-2xl sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 lg:text-6xl">
            Apply for Funding
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Are you an open-source contributor? Do you align with{' '}
            <CustomLink href="/mission" className="underline">
              our mission
            </CustomLink>
          </p>
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/apply#criteria"
              className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Learn More"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="xl:pt-18 space-y-2 pt-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 max-[375px]:text-2xl sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 lg:text-6xl">
            Explore Projects
          </h1>
          <p className="pt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
            Browse through a showcase of projects supported by us.
          </p>
          <ProjectList projects={projects} />
          <div className="flex justify-end pt-4 text-base font-medium leading-6">
            <Link
              href="/projects"
              className="text-primary-800 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="View All Projects"
            >
              View Projects &rarr;
            </Link>
          </div>
        </div>
      </div>
      {siteMetadata.newsletter && siteMetadata.newsletter.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
