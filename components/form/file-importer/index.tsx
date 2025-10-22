"use client";

import { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";

import FilePreview from "./file-preview";
import FileUploaderLabel from "./file-uploader-label";
import { handleDrop } from "./handle-drop";
import IncorrectFileDialog from "./incorrect-file-dialog";
import type { IFileImporterProps } from "./types";

function FileImporter({
  fileUploadLabel = <FileUploaderLabel />,
  setData,
  data,
}: IFileImporterProps) {
  const [incorrectFile, setIncorrectFile] = useState<boolean>(false);
  const handleDelete = () => {
    setData(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
      "text/csv": [".csv"],
    },
    onDrop: async (acceptedFiles, rejectedFiles) => {
      handleDrop(acceptedFiles, rejectedFiles, setIncorrectFile, setData);
    },
  });

  return (
    <Fragment>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {fileUploadLabel}
      </div>

      {data && data.fileMeta && (
        <FilePreview
          fileName={data.fileMeta.name}
          fileSize={data.fileMeta.size}
          handleDelete={handleDelete}
        />
      )}

      <IncorrectFileDialog open={incorrectFile} setOpen={setIncorrectFile} />
    </Fragment>
  );
}

export default FileImporter;
