import React from 'react';
import preloader from '../../assets/images/preloader.gif';
const Preloader = ()=>{
    return <div> 
     <img src={preloader} alt='preloader' style={{width:'50px'}}/>
    </div>
}

export default Preloader;