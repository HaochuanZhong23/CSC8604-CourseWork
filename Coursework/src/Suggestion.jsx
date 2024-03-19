import React from 'react'
import { Link } from 'react-router-dom'
import './Suggestion.css'

export default function Suggestion() {

    return (
        <div className='mobile'>
            <div className='content'>
                <div className='container'>
                    <Link to={'/'} className='btn-link small-heading font-default-black'>⬅ Back</Link>
                    <div className='spacing-md'></div>
                    <div className='plantCard'>
                        <div className='upper'>
                            <div className='upperImg'></div>
                        </div>
                        <div className='spacing-sm'></div>
                        <div className='lower'>
                            <h3 className='font-default-black small-heading'>Chinese Evergreen</h3>
                            <div className='spacing-xs'></div>
                            <p className='font-default-unimportant running-text'>Aglaonema spp</p>
                            <div className='spacing-sm'></div>
                            <div className='tag-wrapper'>
                                <div className='tag small-text'>✔ Air quality</div>
                                <div className='tag small-text'>✔ Temperature</div>
                                <div className='tagAlert small-text'>! Humidity</div>
                                <div className='tag small-text'>✔ Lightness</div>
                            </div>
                            <div className='spacing-sm'></div>
                            <p className='running-text font-default-black'>Chinese evergreens are low-maintenance plants. They also prefer higher humidity, making environment suitable for living with 45% humidity. </p>
                            <div className='spacing-md'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
