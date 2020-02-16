const ethUtil = require('ethereumjs-util')

export function signMessage({ message, account, web3 }) {
  return new Promise((resolve, reject) => {
    const messagePayload = JSON.stringify(message)

    console.log('Message Payload', messagePayload)

    const messageBuffer = ethUtil.bufferToHex(
      new Buffer(messagePayload, 'utf8'),
    )
    const method = 'personal_sign'

    web3.currentProvider.sendAsync(
      {
        id: 1,
        method,
        params: [messageBuffer, account],
        account,
      },
      function(error, resp) {
        if (error) throw error
        resolve({
          account,
          message,
          signature: resp.result,
        })
      },
    )
  })
}
