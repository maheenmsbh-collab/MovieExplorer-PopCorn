
import { Logo } from "./Logo";
import Search from "./Search"
import { TotalSearch } from "./TotalSearch";

export function NavBar({ children }) {
  

  return (
    <nav className="nav-bar">
      <Logo />
      
      {children}
     
    </nav>
  );
}
