export let apiUrl
export let apiKey

try {
  let json = require('./config.json')
  apiUrl = json.API_URL
  apiKey = json.API_KEY
} catch {
  apiUrl = process.env.API_URL
  apiKey = process.env.API_KEY
}