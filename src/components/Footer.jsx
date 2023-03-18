import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-light text-center text-lg-start'>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '50px' }}>
            © 2023 Copyright: Shubham Paithankar 
            <a className='text-dark mx-3' href='https://github.com/shubhampaithankar/snaptrude-assignment' target='_blank' rel="noreferrer">Github Link</a>
        </div>
    </footer>
  )
}

export default Footer