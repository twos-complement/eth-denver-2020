require('dotenv').config()

module.exports = {
  env: {
    FORTMATIC_API_KEY: process.env.FORTMATIC_API_KEY,
    INFURA_ETH_GATEWAY: process.env.INFURA_ETH_GATEWAY,
    MNEMONIC: process.env.MNEMONIC,
  },
}
