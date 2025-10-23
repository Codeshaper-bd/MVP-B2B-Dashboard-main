import FileInputButton from "@/components/form/file-input-button";
import { CrossIcon as CrossIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DJsContent() {
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <Tabs defaultValue="uploadLogo" className="text-sm">
          <div className="flex justify-start">
            <TabsList className="w-fit border border-secondary">
              <TabsTrigger value="uploadLogo">Upload Logo</TabsTrigger>
              <TabsTrigger value="typeName">Type Name</TabsTrigger>
            </TabsList>
          </div>

          <p className="my-2 flex items-center gap-1">
            <InfoIcon className="size-4 text-default-700" /> Upload logo or type
            name
          </p>
          <TabsContent value="uploadLogo" className="mt-4">
            <div className="flex items-center justify-start gap-4 md:w-[364px]">
              <FileInputButton
                label={"Logo 1"}
                //   value={mainImage}
                //   onChange={(value) => {
                //     if (
                //       value === null ||
                //       value === undefined ||
                //       (value instanceof File && !Array.isArray(value))
                //     ) {
                //       setValue("mainImage", value);
                //     }
                //   }}
                //   error={errors.mainImage?.message}
              />
              <CrossIcon className="h-6 w-6 cursor-pointer" />
            </div>
            <div className="mt-3 flex items-center gap-4 md:w-[364px]">
              <div className="flex-1 border-t"></div>
              <Button color="secondary" type="button">
                + Add
              </Button>
              <div className="flex-1 border-t"></div>
            </div>
          </TabsContent>
          <TabsContent value="typeName">
            <div className="flex items-center justify-between md:w-[364px]">
              <Input placeholder="Input DJs name" className="md:w-80" />
              <CrossIcon className="h-5 w-5 cursor-pointer" />
            </div>
            <div className="mt-3 flex items-center gap-4 md:w-[364px]">
              <div className="flex-1 border-t"></div>
              <Button color="secondary" type="button">
                + Add
              </Button>
              <div className="flex-1 border-t"></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DJsContent;
