"use client";

import { useState } from "react";
import AddTrek from "./CreatePackage";
import ImageUploader from "./UploadImage";

export default function CreatePackageFlow() {
  const [packageId, setPackageId] = useState(null);

  return (
    <>
      {!packageId ? (
        <AddTrek onPackageCreated={setPackageId} />
      ) : (
        <ImageUploader packageId={packageId} />
      )}
      {/* <ImageUploader packageId={"67c3767af5905fc4dbff6a69"} /> */}
    </>
  );
}
