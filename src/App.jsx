import './App.css'
import { useState, useEffect } from 'react'







const date = "Mark"
const mision = "Karapet"
export default function App() {
  return (
    <div>
      <h1> {date}</h1>
      <p>{mision} </p>
      <ISSCard />
      <USA />
      <ISSTracker5 />
      <PeopleInSpace22 />
      <APOD />
      <Asteroids />
      <SolarSystem />
      <Asteroids2 />
      <ASSCard2 name="Mark II,"
        status="Mark" />


    </div>
  )

}

function ISSCard() {
  return (
    <div>
      <h2>ISS Position</h2>
      <p>Latitude: 42.36</p>
      <p>Longitude: -71.05
      </p>
    </div>
  )
}


function USA() {
  return (
    <div>
      <h3>USA university</h3>
      <p>good</p>
      <p>Money</p>
    </div>
  )
}

function ASSCard2(props) {
  return (
    <div>
      <h4>{props.name}</h4>
    </div>
  )
}






function ISSTracker5() {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    function fetchISS() {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(r => r.json())
        .then(data => setLocation(data))
    }
    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="card">
      <h2>ISS Position</h2>
      {location ? (
        <div>
          <p>{location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°</p>
          <p>Altitude: {location.altitude.toFixed(0)} km</p>
          <p>Speed: {location.velocity.toFixed(0)} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


function PeopleInSpace() {
  const [people, setPeople] = useState(null)

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className="card">
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} - {person.craft}
            </li>
          ))}
        </ul>
      ) : <p>Loading...</p>}
    </div>
  )
}

function APOD() {
  const [pic, setPic] = useState(null)
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])
  return (
    <div className="card">
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
            ? <img src={pic.url} alt={pic.title} style={{ width: '100%' }} />
            : <a href={pic.url} target="_blank">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}



function Asteroids() {
  const [rocks, setRocks] = useState(null)


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]


    fetch(


      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`
    )
      .then(r => r.json())
      .then(data => {
        setRocks(data.near_earth_objects[today])


      })
  }, [])


  return (
    <div className="card">
      <h2>Asteroids Today</h2>


      {rocks ? (
        <ul>
          {rocks.map(rock => (
            <li key={rock.id}>
              <h3>{rock.name}</h3>


              <p>
                Max Diameter:
                {' '}
                {rock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
                m
              </p>


              <p>
                Hazardous:
                {' '}
                {rock.is_potentially_hazardous_asteroid
                  ? 'Yes'
                  : 'No'}
              </p>
            </li>


          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

function SolarSystem() {
  return (
    <iframe
      src="https://eyes.nasa.gov/apps/solar-system/#/sc_osiris_rex?rate=1814400&time=2021-02-17T21:06:45.412+00:00"
      title="NASA"
      style={{
        width: "100%",
        height: "100vh",
        border: "none"
      }}
    />
  )
}




function Asteroids2() {

  const [rocks, setRocks] =
    useState(null)

  const [selectedRock, setSelectedRock] =
    useState(null)

  useEffect(() => {

    const today =
      new Date().toISOString().split("T")[0]

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`
    )
      .then(r => r.json())
      .then(data => {

        setRocks(
          data.near_earth_objects[today]
        )

      })

  }, [])

  return (

    <div className="space-card">

      <div className="card-header">

        <div className="header-title">

          <span> ASTEROIDS TODAY</span>

        </div>

      </div>

      {rocks ? (

        <div className="asteroid-list">

          {rocks.slice(0, 5).map(rock => (

            <div
              key={rock.id}
              className="asteroid-row"
            >

              <div className="asteroid-info">

                <span className="asteroid-name">
                  {rock.name}
                </span>

                <span className="asteroid-size">

                  Max Diameter:
                  {" "}

                  {rock
                    .estimated_diameter
                    .meters
                    .estimated_diameter_max
                    .toFixed(1)}m

                </span>

              </div>

              <button
                className={`hazard-badge ${rock.is_potentially_hazardous_asteroid
                    ? "danger"
                    : "safe"
                  }`}
                onClick={() =>
                  setSelectedRock(rock)
                }
              >

                {rock
                  .is_potentially_hazardous_asteroid
                  ? "Hazardous"
                  : "Safe"}

              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="shimmer-loader">
          Calculating near-Earth trajectories...
        </div>

      )}

      {selectedRock && (

        <div
          className="asteroid-popup-overlay"
          onClick={() =>
            setSelectedRock(null)
          }
        >

          <div
            className="asteroid-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
              alt={selectedRock.name}
            />

            <h2>
              {selectedRock.name}
            </h2>

            <p>

              Diameter:
              {" "}

              {selectedRock
                .estimated_diameter
                .meters
                .estimated_diameter_max
                .toFixed(1)}m

            </p>

            <p>

              Speed:
              {" "}

              {parseFloat(
                selectedRock
                  .close_approach_data[0]
                  .relative_velocity
                  .kilometers_per_hour
              ).toFixed(0)}

              {" "}km/h

            </p>

            <p>

              Miss Distance:
              {" "}

              {parseFloat(
                selectedRock
                  .close_approach_data[0]
                  .miss_distance
                  .kilometers
              ).toFixed(0)}

              {" "}km

            </p>

            <button
              onClick={() =>
                setSelectedRock(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )
}






function PeopleInSpace22() {

  const [people, setPeople] =
    useState([])

  const [selectedPerson, setSelectedPerson] =
    useState(null)

  const [bio, setBio] =
    useState("")

  const [loadingBio, setLoadingBio] =
    useState(false)

  useEffect(() => {

    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data =>
        setPeople(data.people)
      )
      .catch(err =>
        console.log(err)
      )

  }, [])

  useEffect(() => {

    if (!selectedPerson) return

    setLoadingBio(true)

    const wikiName =
      encodeURIComponent(
        selectedPerson.name
      )

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiName}`
    )
      .then(r => r.json())
      .then(data => {

        setBio(
          data.extract ||
          "No biography found."
        )

        setLoadingBio(false)

      })
      .catch(() => {

        setBio(
          "Error loading biography."
        )

        setLoadingBio(false)

      })

  }, [selectedPerson])

  return (

    <>

      <div className="astronaut-grid">

        {people.map(person => (

          <div
            key={person.name}
            className="astronaut-card"
          >

            <div className="astronaut-avatar">
              🧑‍🚀
            </div>

            <h2>
              {person.name}
            </h2>

            <p>
              {person.craft}
            </p>

            <button
              className="astro-btn"
              onClick={() =>
                setSelectedPerson(person)
              }
            >
              More Info
            </button>

          </div>

        ))}

      </div>

      {selectedPerson && (

        <div
          className="astro-screen"
          onClick={() =>
            setSelectedPerson(null)
          }
        >

          <div
            className="astro-screen-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={() =>
                setSelectedPerson(null)
              }
            >
              ✕
            </button>

            <div className="screen-avatar">
              🧑‍🚀
            </div>

            <h1>
              {selectedPerson.name}
            </h1>

            <div className="screen-box">

              <span>
                Spacecraft
              </span>

              <strong>
                {selectedPerson.craft}
              </strong>

            </div>

            <div className="screen-bio">

              <h3>
                Biography
              </h3>

              {loadingBio ? (

                <p>
                  Loading biography...
                </p>

              ) : (

                <p>
                  {bio}
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </>

  )

}

