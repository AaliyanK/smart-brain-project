import React from 'react';
import './ImageLinkForm.css'

// LOTS OF TACHYON USE
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {

    return (
        <div>
            {/* Text at top */}
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            {/* Div that handles the input and button */}
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm