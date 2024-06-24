/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html','src/components/Statuspage/RealTime.jsx}'],
    content: [],
    theme: {
        extend: {},
    },
    /*
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-thin": {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(155, 155, 155, 0.5) rgba(0, 0, 0, 0.5)',
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: '6px',
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: 'rgba(155, 155, 155, 0.5)',

                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.5)',
                    }
                }
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        }
    ]*/

    plugins: [
        require('tailwind-scrollbar')
    ]   
}