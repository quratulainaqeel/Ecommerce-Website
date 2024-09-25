import React from 'react'
import HeaderSection from '../Components/HeaderSection'
import CatagoriesSection from '../Components/CatagoriesSection'
import BrandSection from '../Components/BrandSection'

export default function Home() {
  return (
    <>
      <div className="bg-light">
        <HeaderSection />

        <div className="container mt-4">

          <div className="card bg-white mb-2 rounded-0" style={{ marginLeft: "-7px" }}>
            <div className="card-body">
              <h5 className="card-title text-danger">BRANDS</h5>
            </div>
          </div>
          <BrandSection />

        </div>
        <CatagoriesSection />

      </div>
    </>
  )
}
