import FileUploader from "@/components/form/file-uploader";

function UploadBackgroundImage() {
  return (
    <div className="md:w-96">
      <FileUploader files={null} setFiles={() => {}} />
    </div>
  );
}

export default UploadBackgroundImage;
