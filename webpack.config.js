module.exports = {
        entry: './main.ts',
        devtool: 'inline-source-map',
        mode: 'production',
        module: {
                rules: [
                        {
                                test: /\.ts?$/,
                                use: 'ts-loader',
                                exclude: /node_modules/,
                        },
                ],
        },
        resolve: {
                extensions: ['.ts', '.js'],
        },
        output: {
                filename: 'dist.js',
                path: __dirname,
        },
};
