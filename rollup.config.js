import html from '@web/rollup-plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
    plugins: [
        html({
            input: 'index.html',
        }),
        resolve(),
        summary(),
    ],
    output: {
        dir: 'docs',
    },
    preserveEntrySignatures: 'strict',

};