import React from "react";
import DocumentMeta from "react-document-meta";

export const Page: React.FC<{ title: string; description: string; children: any }> = ({
  title,
  description,
  children,
}) => {
  const meta = {
    title: title,
    description: description,
    meta: {
      charset: "utf-8",
      name: {
        keywords: "river routes, saint petersburg, russia, bridges, river",
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DocumentMeta {...meta} />
      {children}
    </div>
  );
};
