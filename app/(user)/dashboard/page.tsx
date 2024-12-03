import NewProject from "@/components/NewProject";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import ProjectList from "./project-list";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  console.log(userId);
  return (
    <div>
      <NewProject />
      <ProjectList projects={userProjects} />
    </div>
  );
};

export default Dashboard;

//roxie sinner
//Palacios
