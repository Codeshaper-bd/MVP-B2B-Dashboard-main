import LoaderIcon from "@/components/icons/LoaderIcon";

function Loader({
  isLoading,
  isFetching,
}: {
  isLoading: boolean;
  isFetching: boolean;
}) {
  if (!isLoading && !isFetching) {
    return null;
  }
  return (
    <div className="absolute end-3 top-11">
      <LoaderIcon className="h-4 w-4 animate-spin" />
    </div>
  );
}

export default Loader;
