module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '${API_BASE_URL}/api/:path*',
            },
        ]
    },
}