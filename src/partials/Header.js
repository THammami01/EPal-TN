import { Box } from "@chakra-ui/layout";
import HeaderLeftSide from "./HeaderLeftSide";
import HeaderRightSide from "./HeaderRightSide";

const Header = () => {
  return (
    <Box boxShadow="lg" rounded="md" bg="dark">
      <header className="top-header">
        <HeaderLeftSide />
        <HeaderRightSide />
      </header>
    </Box>
  );
};

export default Header;
