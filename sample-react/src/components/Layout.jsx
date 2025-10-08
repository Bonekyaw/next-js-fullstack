import { Outlet } from "react-router";

import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2023 Sample Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
