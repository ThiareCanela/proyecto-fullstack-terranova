import { useEffect, useState } from "react";
import { ProfileContainer } from "../organisms/ProfileContainer";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <main className="flex-grow flex justify-center items-center p-6">
      <ProfileContainer user={user} />
    </main>
  );
}
