import React from "react";
import { Navbar } from "react-bootstrap";

const FooterSection = () => {
     return (
          <Navbar fixed="bottom" className="footer mt-auto py-3 bg-body-tertiary">
               <div className="container">
                    <p className="float-end" > <a href="#" > Back to top </a></p >
                    <p>© 2017–2024 Company, Inc. · <a href="#" > Privacy </a> · <a href="#">Terms</a > </p>
                    <a href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Free SVG Backgrounds and Patterns by SVGBackgrounds.com</a>
               </div>
          </Navbar>
     );
};

export default FooterSection;