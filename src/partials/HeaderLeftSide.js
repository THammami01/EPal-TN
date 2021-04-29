import { Menu, MenuButton, MenuDivider, MenuList } from "@chakra-ui/menu";
import { useState } from "react";
import { useHistory } from "react-router";
import { navElements } from "../useful/navElements";
import MenuItemAltered from "./custom-menu-item/MenuItemAltered";
import MenuItemExternal from "./custom-menu-item/MenuItemExternal";
import MenuItemHead from "./custom-menu-item/MenuItemHead";

const HeaderLeftSide = () => {
  const [selectedNav, setSelectedNav] = useState("ePal");
  const history = useHistory();

  const handleNavChange = (e) => {
    const { title, url } = navElements.find(
      ({ title }) => title === e.target.innerText
    );
    history.push(url);

    switch (title) {
      case "ePal":
        document.title = `Egirl Finder, Online Game Player LFG, Girl Gamers - E-Pal`;
        break;
      case "Posts":
        document.title = `Best Community for Online Game Player LFG, Girl Gamers, E Girl Finder - E-Pal`;
        break;
      default:
        document.title = `${title} - E-Pal`;
    }

    setSelectedNav(e.target.innerText);
  };

  const goHome = () => {
    history.push("/");
    document.title = `Egirl Finder, Online Game Player LFG, Girl Gamers - E-Pal`;
    setSelectedNav("ePal");
  };

  return (
    <div className="left-side">
      <img
        className="e-pal"
        src="/assets/imgs/epal.png"
        alt="Epal Tunisia"
        onClick={goHome}
      />

      <ul className="nav">
        {navElements.slice(0, 4).map(({ title }) => (
          <li
            className={selectedNav === title ? "selected" : ""}
            onClick={handleNavChange}
          >
            {title}
          </li>
        ))}
      </ul>

      <div className="select-more">
        <span>
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
            >
              •••
            </MenuButton>

            <MenuList>
              <MenuItemAltered
                title="Download App"
                handleNavChange={handleNavChange}
              />
              <MenuDivider />

              <MenuItemHead title="Contact Us" />

              <MenuItemExternal title="Twitter" url="www.twitter.com" />
              <MenuItemExternal title="Facebook" url="www.facebook.com" />
              <MenuItemExternal title="Instagram" url="www.instagram.com" />
              <MenuItemExternal title="Discord" url="www.discord.com" />

              <MenuDivider />

              <MenuItemHead title="User Agreements" />
              <MenuItemAltered
                title="Terms of Services"
                handleNavChange={handleNavChange}
              />
              <MenuItemAltered
                title="Privacy Policy"
                handleNavChange={handleNavChange}
              />
              <MenuItemAltered
                title="Community"
                handleNavChange={handleNavChange}
              />
              <MenuItemAltered
                title="Multimedia Policy"
                handleNavChange={handleNavChange}
              />
              <MenuDivider />

              <MenuItemAltered
                title="About Us"
                handleNavChange={handleNavChange}
              />
            </MenuList>
          </Menu>
        </span>
      </div>
    </div>
  );
};

export default HeaderLeftSide;
