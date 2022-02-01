import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { wait } from "../services/helper-service";

import { User } from "../types/api-types";

function useAdminCheck(user: User | null) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const checkPermissions = async () => {
    await wait(1000);

    if (!user || !user.isAdmin) {
      router.push("/login");
    }
    setChecking(false);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return checking;
}

export default useAdminCheck;
