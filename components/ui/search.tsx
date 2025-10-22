import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, type FormHTMLAttributes } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { Input } from "@/components/ui/input";

export const SearchSchema = Yup.object({
  search: Yup.string().notRequired(),
});

export type TSearch = Yup.InferType<typeof SearchSchema>;

type SearchProps = {
  className?: string;
  inputClassName?: string;
  placeholderText?: string;
  setSearchTerm: (value: string) => void;
};

function Search({
  className,
  inputClassName,
  placeholderText = "Search",
  setSearchTerm,
  ...rest
}: SearchProps & FormHTMLAttributes<HTMLFormElement>) {
  const form = useForm<TSearch>({
    resolver: yupResolver(SearchSchema),
  });

  const { control, reset, handleSubmit } = form;

  const search = useWatch({ control, name: "search" });

  const onSearch = useCallback(
    (search: TSearch) => {
      if (search?.search) {
        return setSearchTerm(search?.search);
      }
    },
    [setSearchTerm],
  );

  const clear = useCallback(() => {
    reset({ search: "" });
    setSearchTerm("");
  }, [reset, setSearchTerm]);

  return (
    <div className={cn("relative w-full", className)}>
      <form action="" onSubmit={handleSubmit(onSearch)}>
        <Input
          placeholder={placeholderText}
          type="search"
          leftContent={<SearchIcon className="size-5 text-lg text-gray-500" />}
          rightContent={
            search ? (
              <CrossIcon
                className="size-5 cursor-pointer transition-colors duration-300 hover:text-red-500"
                onClick={clear}
              />
            ) : (
              ""
            )
          }
          {...form.register("search")}
        />
      </form>
      {/* <Form {...form}>
        <form
          noValidate
          onChange={handleSubmit(onSearch)}
          {...rest}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField
            control={control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={placeholderText}
                    type="search"
                    leftContent={
                      <SearchIcon className="size-5 text-lg text-gray-500" />
                    }
                    rightContent={
                      search ? (
                        <CrossIcon
                          className="size-5 cursor-pointer transition-colors duration-300 hover:text-red-500"
                          onClick={clear}
                        />
                      ) : (
                        ""
                      )
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form> */}
    </div>
  );
}

export default Search;
