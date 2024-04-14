import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { useContact } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import DBannerContact from "../../../components/dashboard/contact/DBannerContact";
import DCardContact from "../../../components/dashboard/contact/DCardContact";
import DFormContact from "../../../components/dashboard/contact/DFormContact";
import { useEffect } from "react";
import { Loader } from "../../../components";

ring.register();

const DashboardContact = () => {
  const { dataContactPage, handleGetData } = useContact();

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

  if (Object.keys(dataContactPage).length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0 ">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <DBannerContact dataPage={dataContactPage} toast={toast} />
            <DCardContact dataPage={dataContactPage} toast={toast} />
            <DFormContact dataPage={dataContactPage} toast={toast} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardContact;
