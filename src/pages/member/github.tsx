import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Router from "next/router";
import { useEffect } from "react";

export default function Github() {
  const query = useSearchParams();
  const router = useRouter();
  const code = query.get("code");
  useEffect(() => {
    if (code) {
      axios
        .post(
          `/api/github/login`,
          {
            code,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((result) => {});
    }
  }, [code]);
}
