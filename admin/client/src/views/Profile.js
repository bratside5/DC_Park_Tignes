import { useAuth0 } from "@auth0/auth0-react";
import GetDataDaily from "../components/GetDataDaily";
import GetDataAll from "../components/GetDataAll";
import Calender from "../components/calendar/Calendar";
import GetCalendarData from "../components/calendar/GetCalendarData";
import AdminPage from "../components/AdminPage";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <main className="text-center bg-gray-800 h-screen">
        <AdminPage user={user.name} />
      </main>
    </>
  );
};
export default Profile;
