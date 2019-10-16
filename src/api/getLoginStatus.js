import delayHelper from './delayHelper'

const getLoginStatus = async () => {
  // Check for cookie
  // Get value out of cookie
  // Attempt heartbeat api call
  // return Boolean (promise?) if logged in
  console.log("Calling getLoginStatus")
  await delayHelper(2000)
  return Promise.resolve(new Response())
}

export default getLoginStatus