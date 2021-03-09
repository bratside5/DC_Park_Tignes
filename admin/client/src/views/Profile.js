import { useAuth0 } from "@auth0/auth0-react";
import GetDataDaily from "../components/GetDataDaily";
import GetDataAll from "../components/GetDataAll";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="px-6 py-3 mx-auto">
      <h2 className="px-6 py-3 mx-auto">Hi {user.name}</h2>
      <GetDataDaily />
      <GetDataAll />
    </div>
  );
};
export default Profile;
