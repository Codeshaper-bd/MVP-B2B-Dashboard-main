"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { memo } from "react";
import {
  useForm,
  useWatch,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import * as Yup from "yup";

import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import CrossIcon from "@/components/icons/CrossIcon";
import RefreshIcon from "@/components/icons/RefreshIcon";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

import EventOptionCard from "./components/event-option-card";

type TPageParams = Params & { locale?: string; profileBar?: string };

const validationSchema = Yup.object().shape({
  barSlug: Yup.string().required("Please select a bar to compare"),
});

type IFormInput = {
  barSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

export type TCompareSlugProps = {
  compareBarSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

function CompareDialog() {
  const { profileBar } = useParams<TPageParams>();
  const { state: open, setClose, setOpen, setState } = useBooleanState();
  const { getAParamValue, updateAParam } =
    useManageSearchParams<TCompareSlugProps>();
  const compareBarSlug = getAParamValue("compareBarSlug");
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      barSlug: compareBarSlug,
    },
    resolver: yupResolver(validationSchema) as unknown as Resolver<IFormInput>,
  });

  const barSlug = useWatch({
    control,
    name: "barSlug",
  });

  const { data: getAllBarsRes, ...getAllBarsApiState } = useGetAllBarsQuery();
  const getAllBarsData = getAllBarsRes?.data;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateAParam({ key: "compareBarSlug", value: data?.barSlug });
    setClose()();
  };

  const handleOpenDialog = () => {
    if (compareBarSlug) {
      updateAParam({ key: "compareBarSlug", value: undefined });
      setClose()();
      setValue("barSlug", undefined);
    } else {
      setValue("barSlug", compareBarSlug);
      setOpen()();
    }
  };

  return (
    <>
      <Button type="button" color="secondary" onClick={handleOpenDialog}>
        {compareBarSlug ? (
          <span className="flex items-center gap-1">
            <CrossIcon className="me-1.5 h-3.5 w-3.5 text-foreground" /> Clear
            Compare Bars
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <RefreshIcon className="me-1.5 h-3.5 w-3.5 text-foreground" />
            Compare Bars
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setState}>
        <DialogContent className="md:max-w-[480px]">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="border-b border-border px-4 py-5">
              <DialogTitle>Compete with</DialogTitle>
            </DialogHeader>

            <RenderData
              {...getAllBarsApiState}
              expectedDataType="array"
              data={getAllBarsData}
            >
              <LabelErrorWrapper
                error={errors?.barSlug?.message || errors?.root?.message}
                errorClassName="px-5"
              >
                <ScrollArea className="h-[50dvh] p-5">
                  <div className="grid grid-cols-2 gap-6">
                    {getAllBarsData?.map((item) => {
                      if (
                        !!item?.slug &&
                        !!profileBar &&
                        item?.slug === profileBar
                      ) {
                        return null;
                      }

                      return (
                        <EventOptionCard
                          key={item?.slug}
                          id={item?.id}
                          slug={item?.slug}
                          name={item?.name}
                          image={item?.media?.url}
                          onSelect={(data) => {
                            setValue("barSlug", data?.slug);
                          }}
                          isSelected={
                            !!item?.slug && !!barSlug && item?.slug === barSlug
                          }
                        />
                      );
                    })}
                  </div>
                </ScrollArea>
              </LabelErrorWrapper>
            </RenderData>

            <DialogFooter className="flex justify-end gap-3 border-t border-border p-4">
              <Button type="button" color="secondary" onClick={setClose()}>
                Cancel
              </Button>

              <Button type="submit" color="primary" className="border-0">
                Compare
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(CompareDialog);
