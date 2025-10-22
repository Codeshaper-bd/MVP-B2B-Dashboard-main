import type { SingleValue } from "react-select";

import type { TSelectOptionData } from "../../FilterOptions/EventSelect";

export interface IEventSelectState {
  event?: SingleValue<TSelectOptionData>;
}
