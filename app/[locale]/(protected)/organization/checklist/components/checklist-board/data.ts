export type TCard = {
  id: string;
  title: string;
  variableName: string;
  responseType: string;
  JacketsLeft?: number;
  onLight?: "yes" | "no";
};

export type TSortableCardProps = {
  card: TCard;
};

export const initialCards: TCard[] = [
  {
    id: "1",
    title: "Count how many jackets are left.",
    variableName: "Jackets Left",
    responseType: "Dynamic Value",
    JacketsLeft: 5,
  },
  {
    id: "2",
    title: "On Light",
    variableName: "On Light",
    responseType: "Binary Value",
    onLight: "yes",
  },
];
