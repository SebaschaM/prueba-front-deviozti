import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { useHome } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import Plains from "../../../components/dashboard/home/Plains";
import CharacteristicsC from "../../../components/dashboard/home/Characteristics";
import Technical from "../../../components/dashboard/home/Technical";
import Bannerr from "../../../components/dashboard/home/Bannerr";
import Projects from "../../../components/dashboard/home/Projects";
import BannerInfo from "../../../components/dashboard/home/BannerInfo";
import Mobile from "../../../components/dashboard/home/Mobile";
import { useEffect } from "react";
import { Loader } from "../../../components";

ring.register();

const DashboardHome = () => {
  const { dataHomePage, handleGetData } = useHome();

  const onGetData = async () => {
    try {
      await handleGetData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    onGetData();
  }, []);

  if (Object.keys(dataHomePage).length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0 ">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <Bannerr dataPage={dataHomePage} toast={toast} />
            <BannerInfo dataPage={dataHomePage} toast={toast} />
            <CharacteristicsC dataPage={dataHomePage} toast={toast} />
            <Technical dataPage={dataHomePage} toast={toast} />
            <Projects dataPage={dataHomePage} toast={toast} />
            <Mobile dataPage={dataHomePage} toast={toast} />
            <Plains dataPage={dataHomePage} toast={toast} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardHome;
