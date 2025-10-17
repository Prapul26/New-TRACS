import axios from "axios";
import { useEffect, useState } from "react";

// ✅ Hook name must start with "use"
export const useMyMembershipData = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [msg, setMsg] = useState("");
  const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tracsdev.apttechsol.com/api/dashboard`, {
          headers: { Authorization: token },
        });
        setMembershipData(response.data.orders.data);
      } catch (error) {
        setMsg("Failed to fetch data.");
        console.error("Error fetching membership data:", error);
      }
    };

    fetchData();
  }, []);

  return { membershipData, msg };
};
