import React, { useEffect } from "react";
import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "My List",
      route: "/list",
    },
    {
      name: "About",
      route: "/about",
    },
  ];
  const location = useLocation();

  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    underline(index);
  }, [location.pathname, navigationRoutes]);
  function underline(index: number) {
    const underlines = document.querySelectorAll<HTMLElement>(".underline");
    let length = underlines.length;
    for (let i = 0; i < length; i++)
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
  }
  const navigate = useNavigate();
  return (
    <nav>
      <div className="block">
        <img
          src={pokeballIcon}
          alt="pokeball icon"
          onClick={() => navigate("/search")}
        />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          {navigationRoutes.map((item, index) => {
            return (
              <Link to={item.route} key={index}>
                <li> {item.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="block svg">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
