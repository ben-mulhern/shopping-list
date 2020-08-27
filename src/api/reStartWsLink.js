// This has to remain as plain JS because Typescript doesn't like me using subscriptionClient as it's private on wsLink

const reStartWsLink = (wsLink) => {
  wsLink.subscriptionClient.close()
  wsLink.subscriptionClient.connect()
}

export default reStartWsLink
