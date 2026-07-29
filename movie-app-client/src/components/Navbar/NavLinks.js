import {
  FaHouse,
  FaMagnifyingGlass,
  FaHeart,
  FaUserGroup,
  FaComments,
} from "react-icons/fa6";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: FaHouse,
  },
  {
    name: "Discover",
    path: "/search",
    icon: FaMagnifyingGlass,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: FaHeart,
  },
  {
    name: "Friends",
    path: "/friends",
    icon: FaUserGroup,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: FaComments,
  },
];

export default navLinks;