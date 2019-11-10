import Mapbox from './Mapbox.js'
import ThemeSwitch from './Switch.js'

render () {
    return (
        <ThemeSwitch></ThemeSwitch>
        <div className="map-container">
            <Mapbox></Mapbox>
        </div> 
    )  
    
}