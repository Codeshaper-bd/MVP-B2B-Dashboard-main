import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/NumberInput";
import { Switch } from "@/components/ui/switch";

import type { ICreatePromoterFormValues } from "./types";

function GuestListPermission() {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ICreatePromoterFormValues>();

  const publicTicketRateType = useWatch({
    control,
    name: "publicTicketRateType",
  });
  const permissions = useWatch({
    control,
    name: "permissions",
  });

  // Ensure DEFAULT_GUESTLIST is always included in permissions
  useEffect(() => {
    const currentPermissions = permissions || [];
    if (!currentPermissions.includes("DEFAULT_GUESTLIST")) {
      setValue("permissions", [...currentPermissions, "DEFAULT_GUESTLIST"]);
    }
  }, [permissions, setValue]);

  const handlePermissionToggle = (
    permissionType:
      | "DEFAULT_GUESTLIST"
      | "PRIVATE_GUESTLIST"
      | "TABLE_MANAGEMENT",
    checked: boolean,
  ) => {
    const currentPermissions = permissions || [];

    if (checked) {
      // Add permission if not already present
      if (!currentPermissions.includes(permissionType)) {
        setValue("permissions", [...currentPermissions, permissionType]);
      }
    } else {
      // Remove permission (but never remove DEFAULT_GUESTLIST)
      if (permissionType !== "DEFAULT_GUESTLIST") {
        setValue(
          "permissions",
          currentPermissions.filter(
            (permission) => permission !== permissionType,
          ),
        );
      }
    }
  };

  return (
    <div className="px-4">
      <p className="mb-4 text-sm font-semibold text-[#CECFD2]">Permission:</p>
      <div className="space-y-4">
        {/* Public Guestlist */}
        <div className="flex w-full gap-2">
          <Switch
            id="publicGuestlist"
            color="success"
            checked={true}
            disabled={true}
          />
          <div className="flex-1">
            <Label htmlFor="publicGuestlist">Public Guestlist (Default)</Label>
            {watch("permissions")?.includes("DEFAULT_GUESTLIST") && (
              <Input
                label="Rates Per Ticket Sold"
                placeholder="Enter Rates"
                type="number"
                min={1}
                step={1}
                isPositiveOnly
                className="border-r-none"
                {...register("publicRatePerTicketSold", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const value = Number(e.target.value);
                    if (publicTicketRateType === "PERCENTAGE" && value > 100) {
                      e.target.value = 100;
                    }
                    return e;
                  },
                })}
                required
                error={errors?.publicRatePerTicketSold?.message}
                rightExtensionContent={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-11 w-[72px] rounded-l-none text-base hover:border-border [&[data-state=open]>svg]:rotate-180"
                      >
                        {publicTicketRateType === "PERCENTAGE" ? "%" : "$"}
                        <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className={cn(
                          publicTicketRateType === "PERCENTAGE"
                            ? "bg-primary text-primary-foreground"
                            : "",
                        )}
                        onClick={() => {
                          setValue("publicTicketRateType", "PERCENTAGE");
                          const currentValue = watch("publicRatePerTicketSold");
                          if (currentValue && currentValue > 100) {
                            setValue("publicRatePerTicketSold", 100);
                          }
                        }}
                      >
                        % Percent
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={cn(
                          publicTicketRateType === "FIXED_AMOUNT"
                            ? "bg-primary text-primary-foreground"
                            : "",
                        )}
                        onClick={() =>
                          setValue("publicTicketRateType", "FIXED_AMOUNT")
                        }
                      >
                        $ Dollar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            )}
          </div>
        </div>

        {/* Private Guestlist */}
        <div className="flex w-full gap-2">
          <Switch
            id="PrivateGuestlist"
            color="success"
            checked={watch("permissions")?.includes("PRIVATE_GUESTLIST")}
            onCheckedChange={(checked) =>
              handlePermissionToggle("PRIVATE_GUESTLIST", checked)
            }
          />
          <div className="flex-1">
            <Label htmlFor="PrivateGuestlist">Private Guestlist</Label>
            {watch("permissions")?.includes("PRIVATE_GUESTLIST") && (
              <NumberInput
                label="Rates Per Entry"
                className="border-r-none"
                value={watch("ratePerPrivateGuestListEntry")}
                onChange={(value) => {
                  setValue("ratePerPrivateGuestListEntry", Number(value));
                }}
                error={errors?.ratePerPrivateGuestListEntry?.message}
              />
            )}
          </div>
        </div>

        {/* Table Management */}
        <div className="flex w-full gap-2">
          <Switch
            id="TableManagement"
            color="success"
            checked={watch("permissions")?.includes("TABLE_MANAGEMENT")}
            onCheckedChange={(checked) =>
              handlePermissionToggle("TABLE_MANAGEMENT", checked)
            }
          />
          <div className="flex-1">
            <Label htmlFor="TableManagement">Table Management</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestListPermission;
