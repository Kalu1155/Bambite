import React, { useState, useEffect } from "react";
import { Layout, Menu} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuGlobe, LuSettings, LuUserPen } from "react-icons/lu";
import { LucideHome } from "lucide-react";
import { MdTaskAlt } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import whitelogo from "../../assets/images/bbwhitedit.png";
import DashDropBtn from "../DasDropBtn";
import Pagedropbtn from '../Pagedropbtn'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const { Sider, Content, Header } = Layout;

const SuperAdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

 useEffect(() => {
  try {
    const loggedAdmin = JSON.parse(localStorage.getItem("adminInfo"));
    if (loggedAdmin && loggedAdmin.name) {
      setUsername(loggedAdmin.name);
    } else {
      window.location.href = "/supa-admin/login";
    }
  } catch (error) {
    console.error("Failed to parse user data:", error);
    window.location.href = "/supa-admin/login";
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("adminInfo");
  localStorage.removeItem("adminToken");
  window.location.href = "/supa-admin/login";
};


  const items = [
    { label: "Overview", key: "/supa-admin", icon: <LucideHome /> },
    { label: "Restaurants", key: "/supa-admin/restaurants", icon: <MdTaskAlt size={20} color="#fff" /> },
    { label: "Users", key: "/supa-admin/users", icon: <LuUserPen size={20} color="#fff" /> },
    { label: "Settings", key: "/supa-admin/settings", icon: <LuSettings size={20} color="#fff" /> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="bg-[#262648f3] fixed left-0 top-0 bottom-0"
          width={250}
          style={{ zIndex: 1000 }}
        >
          <div className="p-4 flex items-center justify-center">
            <Link to="/supa-admin">
              <img src={whitelogo} style={{ width: collapsed ? 80 : 200 }} alt="logo" />
            </Link>
          </div>

          <Menu
            theme="dark"
            className="bg-[#262648f3] overflow-hidden hover:overflow-auto max-h-[calc(100vh-170px)]"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
          
        </Sider>
     

      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          className="bg-white fixed flex items-center justify-between px-4 md:px-6 shadow-sm"
          style={{
            zIndex: 1200,
            height: 64,
            width: collapsed ? 100 : 100 + "vw",
            // marginLeft: collapsed ? 80 : 250,
          }}
        >
          <div className="flex items-center gap-4 ml-[63vw]">
            {/* <LuGlobe size={20} className="text-gray-700" /> */}
            <IoNotificationsOutline size={22} className="text-gray-700" />
            <DashDropBtn />
          </div>
        </Header>

        <Content
          className="p-4 bg-gray-100 min-h-screen"
          style={{ marginTop: 64 }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuperAdminLayout;
