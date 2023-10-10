import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db('carifriendly')

    const states = await db.collection('states').find({}).toArray()

    res.json(states)
  } catch (e) {
    console.error(e)
  }
}
