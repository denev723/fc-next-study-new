import { fetchUserList } from "@/api/user";
import { User } from "@/api/user/types";
import { Suspense } from "@/components/Suspense";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { FC } from "react";

const SuspenseTestMain: FC = () => {
  const { data } = useSuspenseQuery(getUserListQueryOptions());

  return (
    <main>
      Suspense Test
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
};

const SuspenseTestWithSuspense: FC = () => {
  return (
    <Suspense>
      <SuspenseTestMain />
    </Suspense>
  );
};

export { SuspenseTestWithSuspense as SuspenseTestMain };

function getUserListQueryOptions(): UseSuspenseQueryOptions<User[], Error> {
  return {
    queryKey: ["user-list"],
    queryFn: async () => {
      const result = await fetchUserList();
      return result;
    },
  };
}
