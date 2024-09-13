/** @type { DevelopProgress } */
export default {
    features: [
        {done: true, content: 'Allow users to search for a city'},
        {done: true, content: 'Display current weather conditions for the searched city'},
        {done: true, content: 'Show a forecast'},
        {done: true, content: 'Use server-side rendering for initial page load'},
        {done: false, content: 'Implement client-side navigation for subsequent searche'},
        {done: true, content: 'Use Svelte runes for global state management'},
        {done: true, content: 'implement error handling for API requests and invalid user input'},
    ],
    optionals: [
        {done: true, content: "Use the browser's geolocation API to get the user's current location"},
        {done: true, content: "Display weather for the user's current location on initial load"},
        {done: true, content: 'Allow user to switch between Celsius and Fahrenheit'},
        {done: true, content: 'Ensure the app looks good on both desktop and mobile devices'},
    ],
    otherHtml: `
    <h6>API</h6>
    <ul>
        <li><a href="https://open-meteo.com/en/docs" target="_blank">Docs|Open-Meteo.com</a></li>
    </ul>
    `,
}