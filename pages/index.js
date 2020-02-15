import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Web 3</h1>
      <Link href="/dashboard">
        <a>Login / Dashboard</a>
      </Link>
    </div>
  )
}

export default Home
