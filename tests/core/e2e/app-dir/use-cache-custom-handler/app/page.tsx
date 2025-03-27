import { Suspense } from 'react'
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag,
} from 'next/cache'
import { redirect } from 'next/navigation'

async function getData() {
  'use cache'

  cacheLife({ revalidate: 3 })
  cacheTag('modern')

  return new Date().toISOString()
}

async function AsyncComp() {
  let data = await getData()

  return <p id="data">{data}</p>
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <AsyncComp />
      </Suspense>
      <form
        action={async () => {
          'use server'

          revalidateTag('modern')
          redirect('/')
        }}
      >
        <button id="revalidate">Revalidate Tag</button>
      </form>
    </main>
  )
}
