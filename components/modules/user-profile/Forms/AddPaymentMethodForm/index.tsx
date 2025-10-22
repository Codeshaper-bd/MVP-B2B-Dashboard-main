"use client";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { CategoryCard } from "@/components/category-card";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import MailIcon from "@/components/icons/MailIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountrySelect from "@/components/ui/CountrySelect";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface IAddPaymentMethodFormProps {
  handleBackToPaymentMethod?: () => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_12345",
); // Replace with your actual key or env var

const inputClass =
  "w-full px-3 text-base font-normal transition-all duration-300 file:border-0 file:bg-transparent file:text-sm shadow h-11 read-only:leading-11 bg-transparent border-[1.5px] border-[#343842] rounded-[6px] focus-within:ring-4 focus-within:ring-primary focus-within:border-primary";

const elementOptions = {
  style: {
    base: {
      color: "#F4F4F5",
      fontSize: "15px",
      fontFamily: "inherit",
      backgroundColor: "transparent",
      lineHeight: "44px",
      height: "44px",
      "::placeholder": {
        color: "#85888E",
      },
    },
    focus: {
      borderColor: "#FBBF24",
    },
    invalid: {
      color: "#EF4444",
    },
  },
};

function AddPaymentMethodForm({
  handleBackToPaymentMethod,
}: IAddPaymentMethodFormProps) {
  const [cardNumberFocused, setCardNumberFocused] = React.useState(false);
  const [cardExpiryFocused, setCardExpiryFocused] = React.useState(false);
  const [cardCvcFocused, setCardCvcFocused] = React.useState(false);
  const [emails, setEmails] = React.useState([""]);

  return (
    <Elements stripe={stripePromise}>
      <form noValidate>
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex-1">
                <CardTitle className="mb-1 font-semibold">
                  Add Payment method
                </CardTitle>
                <p className="text-sm text-default-600">
                  Update your billing details and address.
                </p>
              </div>
              <Button
                color="secondary"
                className="gap-2"
                type="button"
                onClick={handleBackToPaymentMethod}
              >
                <LeftArrowIcon className="size-3" />
                Back
              </Button>
            </div>
          </CardHeader>
          <div className="ms-6 border border-default-100" />
          <CardContent>
            <div className="divide-y divide-default-100">
              <CategoryCard title="Card details">
                <div className="w-full space-y-4 md:max-w-lg">
                  <div className="grid w-full grid-cols-[7fr,3fr] gap-4">
                    <Input
                      label="Name on card"
                      placeholder="Input your name"
                      type="text"
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white">
                        Expiry
                      </label>
                      <div
                        className={cn(
                          inputClass,
                          cardExpiryFocused &&
                            "border-primary ring-4 ring-primary ring-opacity-20",
                        )}
                      >
                        <CardExpiryElement
                          options={elementOptions}
                          className="h-full w-full bg-transparent"
                          onFocus={() => setCardExpiryFocused(true)}
                          onBlur={() => setCardExpiryFocused(false)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-[7fr,3fr] gap-4 md:max-w-lg">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white">
                        Card number
                      </label>
                      <div
                        className={cn(
                          inputClass,
                          cardNumberFocused &&
                            "border-primary ring-4 ring-primary ring-opacity-20",
                        )}
                      >
                        <CardNumberElement
                          options={elementOptions}
                          className="h-full w-full bg-transparent"
                          onFocus={() => setCardNumberFocused(true)}
                          onBlur={() => setCardNumberFocused(false)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white">
                        CVV
                      </label>
                      <div
                        className={cn(
                          inputClass,
                          cardCvcFocused &&
                            "border-primary ring-4 ring-primary ring-opacity-20",
                        )}
                      >
                        <CardCvcElement
                          options={elementOptions}
                          className="h-full w-full bg-transparent"
                          onFocus={() => setCardCvcFocused(true)}
                          onBlur={() => setCardCvcFocused(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CategoryCard>

              <CategoryCard
                title="Email address"
                desc="Invoices will be sent to this email address."
              >
                <div className="w-full space-y-4 md:max-w-lg">
                  {emails.map((email, idx) => (
                    <div key={idx} className="relative mb-2">
                      <Input
                        label={idx === 0 ? "Email address" : undefined}
                        placeholder="Input your email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          const newEmails = [...emails];
                          newEmails[idx] = e.target.value;
                          setEmails(newEmails);
                        }}
                        leftContent={
                          <MailIcon className="h-3.5 w-[17px] text-default-600" />
                        }
                        className="pr-12" // add right padding for the icon
                      />
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setEmails(emails.filter((_, i) => i !== idx))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-default-500 hover:text-destructive focus:outline-none"
                          tabIndex={-1}
                          aria-label="Remove email"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant={"ghost"}
                    className="mt-4 flex items-center gap-x-2.5 px-1 text-sm font-semibold not-italic leading-5 text-default-600 md:px-1"
                    onClick={() => setEmails([...emails, ""])}
                  >
                    <PlusIcon className="size-3" />
                    Add another
                  </Button>
                </div>
              </CategoryCard>

              <CategoryCard title="Street address">
                <div className="w-full space-y-4 md:max-w-lg">
                  <Input placeholder="Input street address" type="text" />
                </div>
              </CategoryCard>

              <CategoryCard title="City">
                <div className="w-full space-y-4 md:max-w-lg">
                  <Input placeholder="City" type="text" />
                </div>
              </CategoryCard>

              <CategoryCard title="State / Province">
                <div className="grid w-full gap-x-6 gap-y-4 md:max-w-80 md:grid-cols-2">
                  <Input placeholder="State" type="text" />

                  <Input placeholder="Province" type="text" />
                </div>
              </CategoryCard>

              <CategoryCard title="Country">
                <div className="w-full md:max-w-lg">
                  <CountrySelect />
                </div>
              </CategoryCard>
            </div>

            <Separator />

            <div className="my-4 flex w-full items-center justify-end gap-3">
              <Button
                type="button"
                color="secondary"
                onClick={handleBackToPaymentMethod}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                color="primary"
                onClick={handleBackToPaymentMethod}
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Elements>
  );
}

export default AddPaymentMethodForm;
