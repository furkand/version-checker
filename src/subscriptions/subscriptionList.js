import makeSubscription from './contact'
import { UniqueConstraintError } from '../helpers/errors'

// Mostly I prefer to use ice factory functions instead of class
// I can easily test this function because database is injected
export default function makeSubscriptionList({ database }) {
  
  return Object.freeze({
    add,
    findByEmail
  })

  async function add({ subscriptionId, ...subscription }) {

    const db = await database

    if (subscriptionId) {
      subscription._id = db.makeId(subscriptionId)
    }
    const { result, ops } = await db
      .collection('subscriptions')
      .insertOne(subscription)
      .catch(mongoError => {
        const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new UniqueConstraintError(
            mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'subscriptionId'
          )
        }
        throw mongoError
      })
    return {
      success: result.ok === 1,
      created: documentToSubscription(ops[0])
    }
  }

  async function findByEmail({ emailAddress }) {
    const db = await database
    const results = await db
      .collection('subscriptions')
      .find({ emailAddress })
      .toArray()
    return results.map(documentToContact)
  }

  function documentToSubscription({ _id: subscriptionId, ...doc }) {
    return makeSubscription({ subscriptionId, ...doc })
  }

}