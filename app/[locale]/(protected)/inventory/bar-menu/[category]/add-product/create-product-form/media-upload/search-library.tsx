import Image from "next/image";
import { memo, useState } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetAllMediaQuery } from "@/store/api/media/media-api";
import type { TMedia } from "@/store/api/media/media.types";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import RenderData from "@/components/render-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";

interface ISearchProps {
  handleSelect: (data: TMedia) => void;
  selectedMediaList?: Set<number> | TNullish;
}
function SearchLibrary({ handleSelect, selectedMediaList }: ISearchProps) {
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(
    undefined,
  );
  // const { debounce, nonDebouncedValue, debouncedValue } = useDebounce<
  //   string,
  //   undefined
  // >({
  //   value: search,
  //   delay: 700,
  //   debouncedFallbackValue: undefined,
  //   nonDebouncedValueFallback: "",
  //   debouncedFunction: setSearch,
  // });

  const { data: getAllMediaRes, ...getAllMediaApiState } = useGetAllMediaQuery({
    search: debouncedSearch || undefined,
    pageSize: contentPerPageOptions[12],
  });
  const getAllMediaData = getAllMediaRes?.data;

  return (
    <div>
      <LabelErrorWrapper label="Product Images">
        <div className="space-y-2">
          <Card>
            <CardHeader className="!p-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-1 items-center gap-2">
                  <LeftArrowIcon className="size-6" />
                  <p className="whitespace-nowrap font-semibold text-default-700">
                    Search Library
                  </p>
                </div>

                <SearchComponent<"external">
                  mode="external"
                  search={debouncedSearch}
                  setSearch={setDebouncedSearch}
                  className="max-w-[312px]"
                  placeholder="Search"
                  searchIcon={
                    <SearchIcon className="size-5 text-default-600" />
                  }
                />
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="custom-scrollbar max-h-[276px] !p-4">
              <RenderData
                expectedDataType="array"
                data={getAllMediaData}
                {...getAllMediaApiState}
              >
                <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4">
                  {getAllMediaData?.map((item, index) => (
                    <div
                      key={item?.id}
                      className={cn(
                        "relative mb-3 cursor-pointer overflow-hidden rounded-md border border-transparent transition-all duration-150 hover:border-primary",
                        selectedMediaList?.has(item?.id)
                          ? "border-primary"
                          : "",
                      )}
                      onClick={() => handleSelect(item)}
                    >
                      <Image
                        width={100}
                        height={100}
                        className="h-auto w-full"
                        src={item.url || ""}
                        alt={item?.name || `Gallery Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </RenderData>
            </CardContent>
          </Card>
        </div>
      </LabelErrorWrapper>
    </div>
  );
}

export default memo(SearchLibrary);
