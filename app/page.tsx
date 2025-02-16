import React from 'react'
import { Button } from '@/components/ui/button'

export default function page() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline '>Hello World</h1>
      <p>hi friend </p>
      <Button variant='secondary' size='lg'>Click me</Button>
    </div>
  )
}
