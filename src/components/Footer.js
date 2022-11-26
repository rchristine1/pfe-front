import React from 'react';
import { NavLink } from 'react-router-dom'
export default function Footer(props) {
    return (
        <footer className="text-center text-white" style={{ backgroundColor: '#edefef' }}>

            <div className='p-4 pb-0'>
                <section className=''>                    
                </section>
            </div>

            <div className='text-center p-3 ' style={{ backgroundColor: '#a9baba' }}>
                In case of problem : 
                
                <NavLink to="/contact" className="text-decoration-none" > Contact us</NavLink>

            </div>

        </footer >
    )
}