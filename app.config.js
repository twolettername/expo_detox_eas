export default ({ config }) => {
    if (process.env.EXPO_BUILD_CONFIG === 'e2e') {
        return {
            ...config,
            plugins: [
                "@config-plugins/detox"
            ]
        }
    }

    return config;
}