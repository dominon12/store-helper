import { useRouter } from "next/router";
import { useEffect } from "react";

import { User } from "../types/api-types";

function useAdminCheck(user: User | null) {
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login");
    }
  }, []);

  return null;
}

export default useAdminCheck;
