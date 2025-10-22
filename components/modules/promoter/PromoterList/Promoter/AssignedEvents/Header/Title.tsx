export interface ITitleProps {
  title: string | number | null | undefined;
}

function Title({ title }: ITitleProps) {
  return (
    <h4 className="text-sm font-semibold leading-5 text-default-1000">
      {title}
    </h4>
  );
}

export default Title;
