import React from "react";
import secureLocalStorage from "react-secure-storage";
import './Home.css';

function Home(){
    const logout=()=>{
        secureLocalStorage.removeItem("signUp")
        window.location.reload()
    }
    const deleteAccount=()=>{ 
        secureLocalStorage.clear()
        window.location.reload()
    }
    return(
        <div>
          <br></br>
          <center>
          <button onClick={logout} className="logout">LogOut</button>
            <button onClick={deleteAccount} className="delete">Clear Data</button>
          </center>           
        </div>
    );
}
export default Home;