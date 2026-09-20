import Navbar from "../pieces/navbar/navbar";
import "../pieces/form.css";

export default function SignUp() {
  return (
    <>
        <Navbar />
    
        <form className="gap-2">
            <label>Username</label>
            <input type="text"/>
            <label>Password</label>
            <input type="password"/>
            <label>Confirm Password</label>
            <input type="password"/>
            <input type="submit" value={"Sign Up"} />
        </form>
    </>
  );
}
