import CopyButton from "@/components/CopyButton";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embed Feedback Widget",
};

const Page = ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  if (!params.projectId) return <div>Invalid Project ID</div>;
  if (!process.env.WIDGET_URL) return <div>Missing WIDGET_URL</div>;

  const widgetCode = `<my-widget project-id="${params.projectId}"></my-widget>
<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">
        Embed the code in our site
      </p>
      <div className="bg-blue-950 p-6 rounded-md mt-6 relative">
        <code className="text-white">{widgetCode}</code>
        <CopyButton text={widgetCode} />
      </div>
    </div>
  );
};

export default Page;
