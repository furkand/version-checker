import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../helpers/errors'
import makeHttpError from '../helpers/http-error'
import makeSubscription from './contact'


// A function to handle http request
export default function makeSubscriptionsHandlerEndpoint({ subscriptionList }) {

  // It's responsibility is to receive a generic HTTP message and create HTTP response object
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return createSubscription(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }


  async function createSubscription (httpRequest) {
    let subscriberInfo = httpRequest.body
    if (!subscriberInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        contactInfo = JSON.parse(contactInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {

      // What makes a valid subscribtion lives in makeSubscription
      const subscription = makeSubscription(subscriberInfo)

      // Logic about how to add that new subcription into our database lives inside subscriptionList
      const result = await subscriptionList.add(subscription)
      
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
              ? 400
              : 500
      })
    }
  }
}