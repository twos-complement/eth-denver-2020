require('dotenv').config()

module.exports = {
  env: {
    FORTMATIC_API_KEY: process.env.FORTMATIC_API_KEY,
    INFURA_ETH_GATEWAY: process.env.INFURA_ETH_GATEWAY,
    MNEMONIC: process.env.MNEMONIC,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_API_URL: process.env.PINATA_API_URL,
  },
}
