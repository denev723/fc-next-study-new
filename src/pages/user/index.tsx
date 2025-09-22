import { auth_options } from "@/api/auth/signin";
import { UserMain } from "@/domains/user";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    auth_options
  );

  // if (!session) {
  //   return {
  //     notFound: true,
  //   };
  // }

  console.log(session);

  return {
    props: {},
  };
};

const UserPage: FC = () => {
  return <UserMain />;
};

export default UserPage;
