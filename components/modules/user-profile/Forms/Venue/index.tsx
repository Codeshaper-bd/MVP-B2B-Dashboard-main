import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import GroupUsersIcon from "@/components/icons/GroupUsersIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import PhoneCallIcon from "@/components/icons/PhoneCallIcon";
import AddOrEditVenueDialog from "@/components/modules/venue/modals/AddOrEditVenueDialog";
import { Button } from "@/components/ui/button";

import ImageGrid, { type IImageGridProps } from "./ImageGrid";

type TActionButtonsProps =
  | {
      withActionButtons: true;
      onEdit?: () => void;
      onDelete?: () => void;
      isEditLoading?: boolean;
      isDeleteLoading?: boolean;
      editDisabled?: boolean;
      deleteDisabled?: boolean;
    }
  | { withActionButtons?: false };

export type TVenueProps = (Omit<IImageGridProps, "className"> & {
  id?: string | number | null;
  className?: string;
  title?: string | number | null;
  location?: string | number | null;
  users?: string | number | null;
  phone?: string | number | null;
  email?: string | number | null;
}) &
  TActionButtonsProps;

function Venue({
  id,
  className,
  title = "Grand Hall Event Center",
  location = "123 Main St, City, State, 12345",
  users = "500 Guests",
  phone = "1234567890",
  email = "venue@grandhall.com",
  images,
  onClick,
  withActionButtons,
  ...restProps
}: TVenueProps) {
  return (
    <div
      className="flex w-full flex-col items-center gap-6 sm:flex-row"
      id={`venue-${id}`}
    >
      <div className="w-full max-w-2xl sm:max-w-[214px]">
        <ImageGrid images={images} onClick={onClick} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold not-italic leading-7 text-default-900 transition-all duration-500 [.selected-venue_&]:inline-block [.selected-venue_&]:rounded-md [.selected-venue_&]:bg-primary/10 [.selected-venue_&]:px-0.5 [.selected-venue_&]:text-primary">
          {title}
        </h3>

        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <LocationIcon className="size-4 shrink-0 text-default-700" />

            <span className="block text-sm font-medium not-italic leading-5 text-default-700">
              {location}
            </span>
          </li>

          <li className="flex items-center gap-2">
            <GroupUsersIcon className="size-4 shrink-0 text-default-700" />

            <span className="block text-sm font-medium not-italic leading-5 text-default-700">
              {users}
            </span>
          </li>

          <li className="flex items-center gap-2">
            <PhoneCallIcon className="size-4 shrink-0 text-default-700" />

            <span className="block text-sm font-medium not-italic leading-5 text-default-700">
              {phone}
            </span>
          </li>

          <li className="flex items-center gap-2">
            <EmailIcon className="size-4 shrink-0 text-default-700" />

            <span className="block text-sm font-medium not-italic leading-5 text-default-700">
              {email}
            </span>
          </li>

          {withActionButtons === true && (
            <li className="flex w-full flex-col items-center gap-x-4 gap-y-2 sm:flex-row">
              <AddOrEditVenueDialog
                isEditMode
                slug={String(id ?? "")}
                targetButton={
                  <Button
                    color="secondary"
                    type="button"
                    onClick={
                      "onEdit" in restProps && restProps?.isEditLoading
                        ? restProps?.onEdit
                        : undefined
                    }
                    disabled={
                      "editDisabled" in restProps
                        ? restProps.editDisabled
                        : false
                    }
                    className="gap-1.5"
                  >
                    <EditPenIcon className="size-5 text-default-700" />
                    Edit Venue
                  </Button>
                }
              />

              <Button
                color="secondary"
                type="button"
                onClick={
                  "onDelete" in restProps && !restProps?.isDeleteLoading
                    ? restProps?.onDelete
                    : undefined
                }
                disabled={
                  "deleteDisabled" in restProps
                    ? restProps.deleteDisabled
                    : false
                }
                className="gap-1.5"
              >
                <DeleteIcon className="size-5 text-default-700" />
                Delete Venue
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Venue;
