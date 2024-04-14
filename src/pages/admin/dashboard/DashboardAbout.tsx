import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { useAbout } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import DBannerAbout from "../../../components/dashboard/about/DBannerAbout";
import DCompaniesAbout from "../../../components/dashboard/about/DCompaniesAbout";
import DPreceptsAbout from "../../../components/dashboard/about/DPreceptsAbout";
import DFundamentalsAbout from "../../../components/dashboard/about/DFundamentalsAbout";
import { Loader } from "../../../components";
import { useEffect } from "react";

ring.register();

const DashboardAbout = () => {
  const { dataAboutPage, handleGetData } = useAbout();

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

  if (Object.keys(dataAboutPage).length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0 ">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <DBannerAbout dataPage={dataAboutPage} toast={toast} />
            <DFundamentalsAbout dataPage={dataAboutPage} toast={toast} />
            <DCompaniesAbout dataPage={dataAboutPage} toast={toast} />
            <DPreceptsAbout dataPage={dataAboutPage} toast={toast} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardAbout;
