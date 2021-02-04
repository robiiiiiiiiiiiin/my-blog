import React from "react"
import Script from "react-inline-script"

const Graphcomment = () => {
    return ( <>
        <div id="graphcomment"></div>
        <Script> {`

            /* - - - CONFIGURATION VARIABLES - - - */

            window.gc_params = {
                graphcomment_id: 'golbgolbgolb',

                // if your website has a fixed header, indicate it's height in pixels
                fixed_header_height: 80,
            };

            /* - - - DON'T EDIT BELOW THIS LINE - - - */

            (function() {
                var gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
                gc.src = 'https://graphcomment.com/js/integration.js?' + Math.round(Math.random() * 1e8);
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
            })();

        `} </Script>
    </> )
}

export default Graphcomment