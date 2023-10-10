import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('carifriendly').collection('teams')

  if (req.method === 'POST') {
    try {
      const insertResult = await db.insertOne(req.body)
      if (insertResult.acknowledged) {
        const findResult = await db.findOne({ _id: insertResult.insertedId })
        res.json({ message: 'Success', data: findResult })
      } else res.json({ message: 'Fail' })
    } catch (e) {
      res.json({ message: 'Fail' })
    }
  } else {
    try {
      const result = await db.find({}).toArray()
      res.json({ message: 'Success', data: result })
    } catch (e) {
      res.json({ message: 'Fail' })
    }
  }
}
