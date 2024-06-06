import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <h5 class="text-white h4">Collapsed content</h5>
          <span class="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
      <nav>
        <div class="container-fluid">
          <div style={{marginTop:20, marginLeft:1100}}>
          <Link to="/signup">
            <button type="button" class="btn btn-dark btn-sm">
             Create Account
            </button>
          </Link>
          <Link to="/login"style={{marginLeft:20}}>
            <button type="button" class="btn btn-dark btn-sm">
              Log In
            </button>
          </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
