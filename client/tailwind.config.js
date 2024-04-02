/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            // nav: '#F2F8FF',
            nav: '#E2EFFF',
            navcol: '#9DA3BC',
            primary: '#4062FF',
            secondary: '#4062FF',
            white: '#FFFFFF',
            black: '#000000',
            gray: '#B8BED9',
            bodybg: '#F7F7F7',
            dropbox: '#F4F6F8',
            another: '#fc5c65',
            bord: '#E3E3E3',
            test: '#F91919',
            green: '#20bf6b',
        },
        // scale: {
        //     '20': '1.25',
        // },
        // fontSize: {
        //     xs: '0.75rem',
        //     sm: '0.875rem',
        //     base: '0.9rem',
        //     xl: '1.25rem',
        // },
    },
    plugins: [],
};
