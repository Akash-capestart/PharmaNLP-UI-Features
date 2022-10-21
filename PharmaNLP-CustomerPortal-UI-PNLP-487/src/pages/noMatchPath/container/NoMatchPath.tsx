import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function NoMatchPath({ innerHeight } : { innerHeight: number | string }) {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/'), 2000)
  }, [navigate])

  return (
    <div className="w-100 d-flex align-items-center white-background" style={{ height: innerHeight }}>
      <div className='w-100 d-flex align-items-center justify-content-center'>
        <p className='w-100 text-center no-margin'>No matching URL!!!</p>
      </div>
    </div>
  )
}
