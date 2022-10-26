import { useSearchParams, useLocation, useParams } from "@solidjs/router";
export function Users() {
  const [searchParams] = useSearchParams()

  return <div>users:{searchParams.user}</div>;
}
