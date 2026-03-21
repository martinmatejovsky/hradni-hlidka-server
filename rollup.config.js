import typescript from '@rollup/plugin-typescript';

export default {
    input: 'app.ts',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    external: ['dotenv', 'express', 'cors', 'socket.io'],
    plugins: [typescript()],
};
