// import 'reflect-metadata';
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

const skapxdSwagger = document.querySelector('skapxd-swagger')!

const attrsEntries = skapxdSwagger.getAttributeNames().map((attr) => {
  return [attr, skapxdSwagger.getAttribute(attr)]
})

const props = Object.fromEntries(attrsEntries)

createRoot(skapxdSwagger).render(
  <StrictMode>
    <App {...props}/>
  </StrictMode>,
)
