import { NavLink } from "react-router";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

export default function Navber() {
  const menuItem = [
    { path: "/", label: "Home", key: "1" },
    { path: "/about", label: "About", key: "2" },
    { path: "/leaderboard", label: "Leader Board", key: "3" },
    { path: "/find_advocate", label: "Find Advocate", key: "4" },
    { path: "/contact", label: "Contact", key: "5" },
  ];

  const items: MenuProps["items"] = menuItem.map(
    (item: { path: string; label: string; key: string }) => ({
      label: <NavLink to={item.path}>{item.label}</NavLink>,
      key: item.key,
    })
  );

  return (
    <>
      <img src="images/H-1.jpg" className="mt-5" width="100%" />
      <div className="md:block hidden">
        <ul className="flex bg-red-950 py-4 text-white justify-center divide-x-3 divide-dashed text-xl ">
          {menuItem.map(
            (
              item: { path: string; label: string; key: string },
              idx: number
            ) => (
              <li key={idx}>
                <NavLink
                  to={`${item.path}`}
                  className={({ isActive }) =>
                    isActive ? "p-5 font-bold" : "p-5 "
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
          <li>
            <a
              href="https://ihostbd.info/mymendba/advocate/login.php"
              className="p-5"
            >
              Advocate Login
            </a>
          </li>
        </ul>
      </div>

      <div className="md:hidden block py-3">
        <div className="flex justify-between">
          <Dropdown menu={{ items }}>
            <Button>
              <Space>
                <MenuFoldOutlined />
              </Space>
            </Button>
          </Dropdown>
          <a
            href="https://ihostbd.info/mymendba/advocate/login.php"
            className=""
          >
            <Button>
              <Space>Advocate Login</Space>
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
