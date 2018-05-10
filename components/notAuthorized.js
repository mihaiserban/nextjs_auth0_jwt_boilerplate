import React from 'react'
import Link from 'next/link'

export default () => (
  <div className='flex-parent flex-parent--column'>
    <div>You can't see this!</div>
    <div>
      You're not authenticated yet. Maybe you want to <Link href='/auth/sign-in'><span>sign in</span></Link> and see what happens?
    </div>
  </div>
)