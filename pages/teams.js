import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const newTeam = {
    logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
    court_type: '',
    instagram_handle: '@wakalionfc',
    name: 'Waka Lion',
    no_of_players: '',
    sport: '',
    state_id: 1,
    time_available: '',
    venues: '',
    whatsapp_number: '+60123456789',
  }

  useEffect(() => {
    callAxios()
  }, [])

  const callAxios = async () => {
    const res = await axios.get('/api/teams')
    if (res.data.message === 'Success') setTeams(res.data.data)
  }

  const handleAdd = async () => {
    const res = await axios.post('/api/teams', newTeam)
    if (res.data.message === 'Success') setTeams((prevItems) => [...prevItems, res.data.data])
  }

  return (
    <div>
      <h1>Teams</h1>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {teams?.map((team) => (
          <div key={team._id}>
            <h2>{team.name}</h2>
            <h3>{team.instagram_handle}</h3>
            <p>{team.whatsapp_number}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}
