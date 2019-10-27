import delayHelper from './delayHelper'

const getLoginStatus = async () => {
  // Check for cookie
  // Get value out of cookie
  // Attempt heartbeat api call
  // return Boolean (promise?) if logged in
  // Empty query will return 200 in either case
  // errors[0].extensions.code = "access-denied"  <--- login fail
  //                           = "validation-failed" <---- login success
  console.log("Calling getLoginStatus")
  await delayHelper(500)
  return Promise.resolve(new Response())
}

export default getLoginStatus