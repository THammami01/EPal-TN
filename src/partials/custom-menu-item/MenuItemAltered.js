import { MenuItem } from "@chakra-ui/menu";

const MenuItemAltered = ({ title, handleNavChange }) => {
  const style = {
    fontSize: ".9rem",
    borderRadius: "0",
    padding: ".5rem 1rem",
  };

  const hoverStyle = { background: "#7041e6" };

  return (
    <MenuItem style={style} _hover={hoverStyle} onClick={handleNavChange}>
      { title }
    </MenuItem>
  );
};

export default MenuItemAltered;
