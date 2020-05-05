import makeDb from '../db'
import subscriptionList from './subscriptionList'
import subscriptionsEndPointHandler from './subscriptionsEndpoint'

const database = makeDb()
const subscriptionList = subscriptions({ database })
const subscriptionsEndPointHandler = makeContactsEndpointHandler({ subscriptionList })

export default subscriptionsEndPointHandler