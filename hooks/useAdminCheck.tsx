import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { wait } from "../services/helper-service";

import { User } from "../types/api-types";

function useAdminCheck(user: User | null) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const checkPermissions = async () => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
    await wait(500);
    setChecking(false);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return checking;
}

export default useAdminCheck;
