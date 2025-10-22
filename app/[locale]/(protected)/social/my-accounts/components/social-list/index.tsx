import SocialItem from "./social-item";

const socialsData = [
  {
    id: 1,
    image: "/assets/all/fb-icon.png",
    name: "Facebook",
    descriptions: "Page or Group",
  },
  {
    id: 2,
    image: "/assets/all/instagram.png",
    name: "Instagram",
    descriptions: "Business or Creator Accounts",
  },
];
export type TSocialItem = (typeof socialsData)[number];
function SocialList() {
  return (
    <div className="space-y-6">
      {socialsData?.map((item) => <SocialItem key={item.id} {...item} />)}
    </div>
  );
}

export default SocialList;
