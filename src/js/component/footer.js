import React from "react";

export const Footer = () => (
  <footer
    className="footer mt-auto py-3 text-center"
    style={{ position: "fixed", bottom: 0, width: "100%" }}
  >
    <p style={{ textAlign: "end", marginRight: "50px", textDecoration: "none"}}>
      Made by {" "}
      <a href="https://github.com/FluxFeint"><i className="fa fa-github" style={{color: "black", marginRight: "4px"}} />Alexander Torreño Cerrillo</a>
    </p>
  </footer>
);