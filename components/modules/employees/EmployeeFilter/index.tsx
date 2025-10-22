"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Select from "react-select";

import useBooleanState from "@/hooks/useBooleanState";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type {
  TEmployeeStatus,
  TGetAllEmployeesArgs,
} from "@/store/api/employees/employees.types";
import { useGetAllRolesQuery } from "@/store/api/roles/roles-api";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";
import FilterContent from "@/components/filter-content";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

type TStatus = Exclude<TGetAllEmployeesArgs, void>["status"] | undefined;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps?: ICustomRadioLabelProps;
}[];

const statusOptions: TOptions<TEmployeeStatus> = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Pending",
    value: "Pending",
  },
];

function EmployeeFilter() {
  const {
    state: isFilterOpen,
    setClose: closeFilter,
    toggle: toggleFilterOpen,
  } = useBooleanState();

  const { data: getAllRolesRes, ...getAllRolesApiState } =
    useGetAllRolesQuery();
  const getAllRolesData = getAllRolesRes?.data;

  const rolesOptions = useMemo(
    () =>
      getAllRolesData?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })) || [],
    [getAllRolesData],
  );

  const { getAParamValue, updateMultipleParam } =
    useManageSearchParams<Exclude<TGetAllEmployeesArgs, void>>();

  const currentStatus = getAParamValue("status");
  const currentRole = getAParamValue("role");

  const [rolesState, setRolesState] = useState<
    { label: string; value: number }[]
  >(() => {
    if (!currentRole) {
      return [];
    }
    const roleLabels = currentRole.split(",");
    return roleLabels.map((label) => ({ label, value: 0 }));
  });

  const [statusState, setStatusState] = useState<TEmployeeStatus | undefined>(
    () => (currentStatus as TEmployeeStatus) || undefined,
  );

  // Sync state with URL parameters when they change
  useEffect(() => {
    setStatusState((currentStatus as TEmployeeStatus) || undefined);
  }, [currentStatus]);

  useEffect(() => {
    if (!currentRole) {
      setRolesState([]);
    } else {
      const roleLabels = currentRole.split(",");
      setRolesState(roleLabels.map((label) => ({ label, value: 0 })));
    }
  }, [currentRole]);

  const isSomeFilterApplied = currentStatus || currentRole;

  const isStateAndUrlSame = () => {
    const currentRoles = currentRole ? currentRole.split(",") : [];
    const selectedRoleLabels = rolesState.map((role) => role.label);

    const statusMatch = statusState === currentStatus;
    const rolesMatch =
      currentRoles.length === selectedRoleLabels.length &&
      currentRoles.every((role) => selectedRoleLabels.includes(role));

    return statusMatch && rolesMatch;
  };

  const hasSelectedValues = () =>
    rolesState.length > 0 || statusState !== undefined;

  const onApply = () => {
    const commaSeparatedRoles = rolesState.length
      ? rolesState.map((role) => role.label).join(",")
      : undefined;

    updateMultipleParam({
      page: undefined,
      status: statusState,
      role: commaSeparatedRoles,
    });
    closeFilter()();
  };

  const onClear = () => {
    setRolesState([]);
    setStatusState(undefined);
    updateMultipleParam({
      page: undefined,
      status: undefined,
      role: undefined,
    });
  };
  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setStatusState(e.target.value as TStatus);
    }, []);

  return (
    <FilterContent
      open={isFilterOpen}
      onClick={toggleFilterOpen()}
      onClose={closeFilter()}
      triggerButtonClassName="h-11"
    >
      <div>
        <LabelErrorWrapper label="Role">
          <Select
            options={rolesOptions}
            isMulti
            onChange={(value) => setRolesState([...(value || [])])}
            className="react-select"
            classNamePrefix="select"
            isLoading={getAllRolesApiState?.isLoading}
            placeholder="Select roles"
            value={rolesState}
            isDisabled={getAllRolesApiState?.isLoading}
          />
        </LabelErrorWrapper>

        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2">
            <CustomRadioGroup
              direction="column"
              gap="gap-3"
              label={"Status"}
              className="pl-2.5"
              labelClassName="text-sm mb-[18px] font-medium sm:text-sm text-default-700"
              options={statusOptions}
              onChange={handleStatusChange}
              value={statusState}
              key={`active-${status}`}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button
            fullWidth
            type="button"
            onClick={() => closeFilter()()}
            size="lg"
          >
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            type="button"
            size="lg"
            disabled={!hasSelectedValues()}
            onClick={() => {
              if (isSomeFilterApplied && isStateAndUrlSame()) {
                onClear();
                closeFilter()();
                return;
              }
              onApply();
            }}
          >
            {isSomeFilterApplied && isStateAndUrlSame() ? "Clear" : "Apply"}
          </Button>
        </div>
      </div>
    </FilterContent>
  );
}

export default EmployeeFilter;
