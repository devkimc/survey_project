module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|svg)$/,
            loader: 'file-loader',
        });

        return config;
    },
};
