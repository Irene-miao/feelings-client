const PROXY_CONFIG = [
    {
        context: ['/**'],
        target: 'https://feelings-server-production.up.railway.app',
        secure: false,
        logLevel: 'debug'
    }
]
module.exports = PROXY_CONFIG;