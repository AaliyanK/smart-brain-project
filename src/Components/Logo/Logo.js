import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './icons8-brain-64.png'

const Logo = () => {

    return (
        <div className = 'ma4 mt0'>
            {/* From outside package */}
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa4"><img style={{paddingTop: '3px', height: 90, width: 100}} alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo