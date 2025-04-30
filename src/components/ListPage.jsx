import React from "react";
import { Checklist } from "./List";

const ListPage = () => {
  return (
    <div className="bg-white h-screen">
      <div className="mx-auto max-w-md">
        <Checklist />
      </div>
    </div>
  );
};

export default ListPage;
