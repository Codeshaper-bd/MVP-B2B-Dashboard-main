import DetailsCard, { type DetailsCardProps } from "@/components/details-card";

type ProductGroup = {
  groupName: string;
  products: DetailsCardProps[];
};

const productsData: ProductGroup[] = [
  {
    groupName: "August",
    products: [
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
    ],
  },
  {
    groupName: "July",
    products: [
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
    ],
  },
  {
    groupName: "July",
    products: [
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
      {
        title: "Wine Orang Tua",
        date: "August 17, 2024",
        time: "08:10",
        price: "12",
        quantity: "1",
        image: "/images/all-img/product1.png",
        viewLink: "#",
      },
    ],
  },
];
function ProductsContent() {
  return (
    <div className="space-y-4">
      {productsData.map((item, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-[16px] font-medium">{item.groupName}</h3>
          {item.products.map((ticket, index) => (
            <DetailsCard key={index} item={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProductsContent;
