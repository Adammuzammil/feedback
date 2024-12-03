import Table from "@/components/Table";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeft, Code, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  const projectId = Number(params.projectId);

  if (!projectId) return <div>Invalid Project ID</div>;

  const projectsList = await db.query.projects.findMany({
    where: eq(projects.id, projectId),
    with: {
      feedbacks: true,
    },
  });

  // Ensure there's at least one project
  if (!projectsList || projectsList.length === 0) {
    return <div>Project not found</div>;
  }

  // Extract the first project
  const project = projectsList[0];

  return (
    <div>
      <div>
        <Link
          href={"/dashboard"}
          className="flex items-center text-indigo-700 mb-5"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="text-lg">Back to projects</span>
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div className="proj-info">
          <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
          <h2 className="text-primary-background text-xl mb-2">
            {project.description}
          </h2>
        </div>
        <div className="flex flex-col">
          {project?.url ? (
            <Link
              href={project.url}
              className=" text-indigo-700 flex items-center"
            >
              <Globe className="h-4 w-4 mr-1" />{" "}
              <span className="text-base">Visit site</span>
            </Link>
          ) : null}
          <Link
            href={`/projects/${projectId}/instructions`}
            className=" text-indigo-700 flex items-center mt-2"
          >
            <Code className="size-4 mr-1" />
            <span className="text-base">Embed Code</span>
          </Link>
        </div>
      </div>

      <div>
        <Table data={project.feedbacks} />
      </div>
    </div>
  );
};

export default Page;
