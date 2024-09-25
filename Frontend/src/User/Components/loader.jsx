import React from 'react'
import '../CSS files/loader.css'

export default function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="loader">
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </div>
  </div>
  )
}
