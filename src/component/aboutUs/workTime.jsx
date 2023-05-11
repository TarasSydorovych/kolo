import { useEffect, useState } from 'react'
import { FirstBlock } from '../main/firstBlock'
import css from './aboutUs.module.css'
import { BiTimer } from "react-icons/bi";
import { GoogleMap, LoadScript } from '@react-google-maps/api';



export default function WorkTime({setDostavka, dostavka}) {

    const containerStyle = {
        width: '90%',
        height: '500px',
        borderRadius: '20px'
      };
    
      const center = {
        lat: 49.588057, // Широта
        lng: 34.552579 // Довгота
      };
    
     
      const markerPosition = {
        lat: 49.588057, // Широта точки
        lng: 34.552579 // Довгота точки
      };
    
    
    useEffect(() => {
        setDostavka(false)
    }, [])

    return(
        <div className={css.timeWrap}>
            <FirstBlock dostavka={dostavka} setDostavka={setDostavka}/>
            <div className={css.mapWrap}>
                <div className={css.workTimeHour}>
                    <h1 className={css.regumRobotu}>Режим роботи</h1>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Понеділок</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Вівторок</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Середа</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Чертве</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> П'ятниці</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Субота</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                    <div className={css.timeToWork}>
                        <h2 className={css.dayOfWeek}> <BiTimer className={css.aiOutlineClockCircle}/> Неділя</h2>
                        <h2 className={css.dayOfWeek}>09:00 - 22:00</h2>
                    </div>
                </div>
                <div className={css.map}>
                   
                    <LoadScript googleMapsApiKey="AIzaSyBajJsy6w9BWWPyygqK94Yu8HvhXWZWjDU">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={15}
                    >
                      
                    </GoogleMap>
                  </LoadScript>
                   
                
                </div>
            </div>
        </div>
    )
}