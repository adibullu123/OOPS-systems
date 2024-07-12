// ==UserScript==
// @name         DelugeRPG Auto-Mover
// @match        https://www.delugerpg.com/map/*
// @version      1.0
// @description  To use: inspect element, open console, and type: findPoke("CaseSensitivePokeName");
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
        script.textContent = (${fn.toString()})();;
        document.head.appendChild(script);
    }

    // The actual function to be injected
    function main() {
        window.findPoke = async (pokeName) => {
            // Directions and their corresponding element IDs
            const directions = ["#move_n", "#nmove_e", "#nmove_s", "#move_w"];

            // Simulate click function
            function simulateClick(selector) {
                const element = document.querySelector(selector);
                if (element) {
                    element.click();
                    console.log(Clicked on: ${selector});
                } else {
                    console.log(Element not found: ${selector});
                }
            }

            // Loop indefinitely
            for (let i = 0;; i++) {
                // Simulate click in the current direction
                simulateClick(directions[i % 4]);

                // Wait for 1.5 seconds
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Check if the Pokémon is found
                const dexyElement = document.querySelector("#dexy");
                if (dexyElement && dexyElement.innerText.includes(pokeName)) {
                    alert(${pokeName} found!);
                    break;
                }
            }
        };
    }

    // Inject the script into the page
    injectScript(main);
})();
