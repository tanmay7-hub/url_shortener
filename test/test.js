import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-arrival-rate",
      rate: 300,        // 100 requests per second
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 500,
    },
  },
};

export default function () {
  const res = http.get("http://localhost:3000/3");
  console.log(res.status);
  check(res, {
    "status ok": (r) => r.status === 200 || r.status === 302,
  });
}