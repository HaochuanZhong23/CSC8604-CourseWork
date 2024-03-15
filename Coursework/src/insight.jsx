import React from 'react'
import { ReactDOM } from 'react-dom'
import './insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';

export default function insight() {

    const DemoLine = () => {
        const data = [
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
        ];
        const config = {
          data,
          xField: 'year',
          yField: 'value',
          point: {
            shapeField: 'square',
            sizeField: 2,
          },
          interaction: {
            tooltip: {
              marker: false,
            },
          },
          style: {
            lineWidth: 2,
          },
        };
        return <Line {...config} />;
    };


    return (
        <div className='mobile'>
            <div className='content'>
                <div className='container'>
                    <Link to={'/'} className='btn-link small-heading font-default-black'>⬅ Back</Link>
                    <div className='spacing-md'></div>
                    <div className='chartWrap'>
                        <div className='spacing-sm'></div>
                        <div className='pm25'>
                            <p className='running-text font-default-black'>PM 2.5</p>
                            <div className='spacing-xs'></div>
                            <div className='heightControl'><DemoLine/></div>
                        </div>
                        <div className='spacing-md'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
