import { Login, Home } from "../pages";

export default [
  {
    path: "/",
    element: localStorage.getItem('uid') ? <Home /> : <Login />,
  },
  {
    path: "/login",
    element: <Login />
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
