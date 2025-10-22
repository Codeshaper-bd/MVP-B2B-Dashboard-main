import { track } from "@vercel/analytics";
import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  name: Yup.string()
    .oneOf(
      [
        "copy_npm_command",
        "copy_usage_import_code",
        "copy_usage_code",
        "copy_primitive_code",
        "copy_theme_code",
        "copy_block_code",
        "copy_chunk_code",
        "enable_lift_mode",
        "copy_chart_code",
        "copy_chart_theme",
        "copy_chart_data",
        "copy_color",
      ],
      "Invalid event name",
    )
    .required("Name is required"),

  properties: Yup.object()
    .shape({
      key: Yup.mixed().oneOf([Yup.string(), Yup.number(), Yup.boolean()]),
    })
    .nullable(),
});

export type Event = {
  name:
    | "copy_npm_command"
    | "copy_usage_import_code"
    | "copy_usage_code"
    | "copy_primitive_code"
    | "copy_theme_code"
    | "copy_block_code"
    | "copy_chunk_code"
    | "enable_lift_mode"
    | "copy_chart_code"
    | "copy_chart_theme"
    | "copy_chart_data"
    | "copy_color";
  properties?: {
    key?: string | number | boolean;
  };
};

export function trackEvent(input: Event): void {
  eventSchema.validateSync(input);
  track(input.name, input.properties);
}
