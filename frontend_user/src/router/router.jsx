import { Login, Home } from "../pages";
// import { Navigate } from "react-router-dom";

export default [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />
  }
  // {
  //   path: "/menuPage",
  //   element: <Menu />,
  // },
  // {
  //   path: "/game/:category",
  //   element: <Game />,
  // },
  // {
  //   path: "/modeSelect",
  //   element: <ModeSelect />,
  // },
  // {
  //   path: "/gameSetting",
  //   element: <GameSetting />,
  // },
  // {
  //   path: "/rank",
  //   element: <Rank />,
  // },
  // {
  //   path: "*",
  //   element: <>not found</>,
  // },
];
