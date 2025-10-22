import { selectAuthUserEmail } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { CategoryCard } from "@/components/category-card";
import CustomRadioGroup from "@/components/CustomRadioGroup";
import EmailIcon from "@/components/icons/EmailIcon";
import { Input } from "@/components/ui/input";

function ContactEmail() {
  const authUserEmail = useAppSelector(selectAuthUserEmail);
  return (
    <CategoryCard title="Contact email" desc="Where should invoices be sent?">
      <CustomRadioGroup
        direction="column"
        options={[
          {
            label: (
              <div>
                <p className="text-sm font-medium leading-5 text-default-700">
                  Send to my account email
                </p>

                <div
                  className="pointer-events-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <div className="pointer-events-auto">
                    <p className="text-sm font-normal not-italic leading-5 text-default-600">
                      {authUserEmail}
                    </p>
                  </div>
                </div>
              </div>
            ),
            value: "active",
            name: "radio",
            // ...register("status")
            radioProps: {
              centerColor: "transparent",
              verticalAlign: "top",
            },
          },
          {
            label: (
              <div>
                <p className="text-sm font-medium leading-5 text-default-700">
                  Send to an alternative email
                </p>

                <div
                  className="pointer-events-none mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="pointer-events-auto">
                    <Input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      leftContent={
                        <EmailIcon className="w-[17px] text-default-600" />
                      }
                    />
                  </div>
                </div>
              </div>
            ),
            value: "inactive",
            name: "radio",
            radioProps: {
              centerColor: "transparent",
              verticalAlign: "top",
            },
            // ...register("status")
          },
        ]}
      />
    </CategoryCard>
  );
}

export default ContactEmail;
