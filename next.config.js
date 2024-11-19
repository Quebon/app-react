module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://push-api.quebon.tv/api/:path*',
            },
        ]
    },
}