import React from 'react'
import { ReactDOM } from 'react-dom'
import './insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';
//call different components
import PM25 from './compos/pm25'
import PM10 from './compos/pm10'
import Temp from './compos/temp'
import Humidity from './compos/humidity'
import Light from './compos/light'

export default function insight() {

  return (
    <div className='mobile'>
      <div className='content'>
        <div className='container'>
          <Link to={'/'} className='btn-link small-heading font-default-black'>⬅ Back</Link>
          <div className='spacing-md'></div>
          <div className='chartWrap'>
            <div className='spacing-sm'></div>
            <PM25></PM25>
            <div className='spacing-sm'></div>
            <PM10></PM10>
            <div className='spacing-sm'></div>
            <Temp></Temp>
            <div className='spacing-sm'></div>
            <Humidity></Humidity>
            <div className='spacing-sm'></div>
            <Light></Light>
            <div className='spacing-md'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
