import { fetchUserList } from "@/api/user";
import { User } from "@/api/user/types";
import { Suspense } from "@/components/Suspense";
import {
  useQuery,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { FC } from "react";

const SuspenseTestMain: FC = () => {
  const { data } = useSuspenseQuery(getUserListQueryOptions());

  console.log(data);

  return (
    <main>
      Suspense Test
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

const SuspenseTestWithSuspense: FC = () => {
  return (
    <Suspense
      fallback={<>Loading..</>}
      suspense_query_key={[getUserListQueryOptions().queryKey]}
    >
      <SuspenseTestMain />
    </Suspense>
  );
};

export { SuspenseTestWithSuspense as SuspenseTestMain };

export function getUserListQueryOptions(): UseSuspenseQueryOptions<
  User[],
  Error
> {
  return {
    queryKey: ["user-list"],
    queryFn: async () => {
      const result = await fetchUserList();
      return result;
    },
  };
}
