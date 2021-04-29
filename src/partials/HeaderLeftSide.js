import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";

const HeaderLeftSide = () => {
  const style1 = {
    fontSize: ".9rem",
    borderRadius: "0",
    padding: ".5rem 1rem",
  };

  const styleDis = {
    fontSize: ".8rem",
    padding: ".5rem 1rem .75rem",
    cursor: "initial",
  };

  const hover = { background: "#7041e6" };

  return (
    <div className="left-side">
      <img className="e-pal" src="/assets/imgs/epal.png" alt="Epal Tunisia" />

      <ul className="nav">
        <li className="selected">ePal</li>
        <li>Chill</li>
        <li>Posts</li>
        <li>How it Works</li>
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
              <MenuItem style={style1} _hover={hover}>
                Download App
              </MenuItem>
              <MenuDivider />
              <MenuItem style={styleDis} isDisabled={true}>
                Contact Us
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Twitter
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Facebook
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Instagram
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Discord
              </MenuItem>
              <MenuDivider />
              <MenuItem style={styleDis} isDisabled={true}>
                User Agreements
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Terms of Services
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Privacy Policy
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Community
              </MenuItem>
              <MenuItem style={style1} _hover={hover}>
                Multimedia Policy
              </MenuItem>
              <MenuDivider />
              <MenuItem style={style1} _hover={hover}>
                About Us
              </MenuItem>
            </MenuList>
          </Menu>
        </span>
      </div>
    </div>
  );
};

export default HeaderLeftSide;
