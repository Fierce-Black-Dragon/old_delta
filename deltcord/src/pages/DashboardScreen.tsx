import React from "react";
import ChannelBar from "../components/Dashboard/ChannelBar";
import ChatScreen from "../components/Dashboard/ChatScreen";
import Navbar from "../components/navbar/Navbar";
import SideBar from "../components/navbar/Sidebar";

const DashboardScreen = () => {
  return (
    <div className="">
      <SideBar />
     <div className="ml-18">
     <ChatScreen/>
     </div>
    </div>
  );
};

export default DashboardScreen;
