import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest, // Adiciona as globais do Jest
            },
        },
    },
    pluginJs.configs.recommended,
];
