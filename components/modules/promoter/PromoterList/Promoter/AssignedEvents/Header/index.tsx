import { memo } from "react";

import ActionButton, { type IActionButtonProps } from "./ActionButton";
import Title, { type ITitleProps } from "./Title";

export interface IHeaderProps {
  title?: ITitleProps["title"];
  actionButton: IActionButtonProps;
}

function Header({ title = "Assigned Events", actionButton }: IHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Title title={title} />

      <ActionButton {...actionButton} />
    </div>
  );
}

export default memo(Header);
