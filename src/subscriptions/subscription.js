import requiredParam from '../helpers/required-param'
import { InvalidPropertyError } from '../helpers/errors'
import isValidEmail from '../helpers/isValidEmail'
import isValidUrl from '../helpers/isValidUrl'

// This is the place I will encapsulate my business logic
export default function makeSubscription(
  subscriptionInfo = requiredParam('subscriptionInfo')
) {
  const validSubscription = validate(subscriptionInfo)
  const normalContact = normalize(validSubscription)

  // Outisde world can ever take my business object and put it into invalid state
  return Object.freeze(normalContact)

  function validate({
    emailAddress = requiredParam('emailAddress'),
    repostoryUrl = requiredParam('repostoryUrl')
  } = {}) {
    validateRepostoryUrl(url)
    validateEmail(emailAddress)
    return { emailAddress, repostoryUrl}
  }

  function validateRepostoryUrl(url) {
    if (!isValidUrl(url)) {
      throw new InvalidPropertyError(
        `A repostory url url must be valid`
      )
    }
  }

  function validateEmail(emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError('Invalid contact email address.')
    }
  }

  function normalize({ emailAddress, repostoryUrl}) {
    return {
      repostoryUrl: repostoryUrl,
      emailAddress: emailAddress.toLowerCase()
    }
  }
}