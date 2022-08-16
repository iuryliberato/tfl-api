import { useEffect, useState } from 'react'
import axios from 'axios'



const App = () => {

  const [airQuality, setAirQuality] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get('https://api.tfl.gov.uk/AirQuality') // * <-- replace with your endpoint
        console.log(data)
        setAirQuality(data)
      } catch (error) {
        setHasError(true)
      }

    }
    getData()
    setInterval(getData, 60000)

  }, [])


  return (
    <>
      {airQuality ? (
        <>
          {airQuality.currentForecast.map(forecast => {
            console.log('forecast here', forecast)
            return (<>
              <p key={forecast.id}>Sumary = {forecast.forecastSummary}</p>
              <p >forecast = {forecast.forecastText}</p>
              <p>Forecast type = {forecast.forecastType}</p>
              <p>NO2 Band = {forecast.nO2Band}</p>
            </>
            )
          })}
          <p> Disclaimer Text = {airQuality.disclaimerText}</p>
          <p> forecast URL = {airQuality.forecastURL}</p>
          <p> Update Period = {airQuality.updatePeriod} updated</p>
        </>
      )
        :
        <>
          {hasError ?
            <h2 className="display-5 text-center">Oh! Something went wrong</h2>
            :
            <h1>loading</h1>
          }
        </>
      }
    </>
  )

}

export default App
