// ==UserScript==
// @name         DelugeRPG Auto-Mover
// @match        https://www.delugerpg.com/map/*
// @version      1.3
// @description  Automatically moves and alerts if a legendary Pokémon appears.
// @author       redbrain
// @icon         https://www.google.com/s2/favicons?domain=delugerpg.com
// @grant        none
// @namespace    https://greasyfork.org/users/767360
// @downloadURL  https://update.greasyfork.org/scripts/425796/DelugeRPG%20Auto-Mover.user.js
// @updateURL    https://update.greasyfork.org/scripts/425796/DelugeRPG%20Auto-Mover.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to create and inject a script element
    function injectScript(fn) {
        const script = document.createElement('script');
        script.textContent = `(${fn.toString()})();`;
        document.head.appendChild(script);
    }

    // The actual function to be injected
    function main() {
        window.findLegendary = async () => {
            // Directions and their corresponding element IDs
            const directions = ["#move_n", "#nmove_e", "#nmove_s", "#move_w"];

            // Simulate click function
            function simulateClick(selector) {
                const element = document.querySelector(selector);
                if (element) {
                    element.click();
                    console.log(`Clicked on: ${selector}`);
                } else {
                    console.log(`Element not found: ${selector}`);
                }
            }

            // Function to get a random delay between 1 and 3 seconds
            function getRandomDelay() {
                return Math.floor(Math.random() * 2000) + 1000;
            }

            // Function to check if a legendary Pokémon is found
            function isLegendaryFound() {
                const mapcontextElement = document.querySelector("#mapcontext");
                if (mapcontextElement && (mapcontextElement.innerText.includes("Legendary Pokemon") || mapcontextElement.innerText.includes("Mystic Pokemon"))) {
                    return true;
                }
                return false;
            }

            // Loop indefinitely
            for (let i = 0;; i++) {
                // Simulate click in the current direction
                simulateClick(directions[i % 4]);

                // Wait for a random amount of time between 1 and 3 seconds
                await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

                // Check if a legendary Pokémon is found
                if (isLegendaryFound()) {
                    alert("Legendary Pokémon found!");
                    break;
                }
            }
        };
    }

    // Inject the script into the page
    injectScript(main);
})();
