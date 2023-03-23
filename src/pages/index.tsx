import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import styles from '@/styles/Blog.module.css'

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>My Blog</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className={styles.post}>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  const post = await prisma.post.findFirst()
  if (!post) return { props: {} }
  console.log({
    postHasRandomProperties: Object.hasOwn(
      post,
      'this should not be true but it is',
    ),
  })

  return {
    props: { feed },
  }
}

export default Blog
