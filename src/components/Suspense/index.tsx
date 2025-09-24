import { NoSsr } from "@/components/NoSsr";
import { ComponentProps, FC, Suspense as ReactSuspense } from "react";

interface Props extends ComponentProps<typeof ReactSuspense> {}

const Suspense: FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <ReactSuspense {...rest}>
      <NoSsr>{children}</NoSsr>
    </ReactSuspense>
  );
};

export { Suspense };
