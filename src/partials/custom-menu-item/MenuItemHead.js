import { MenuItem } from "@chakra-ui/menu";

const MenuItemHead = ({ title }) => {
  const styleDis = {
    fontSize: ".8rem",
    padding: ".5rem 1rem .75rem",
    cursor: "initial",
  };

  return (
    <MenuItem style={styleDis} isDisabled={true}>
      {title}
    </MenuItem>
  );
};

export default MenuItemHead;
