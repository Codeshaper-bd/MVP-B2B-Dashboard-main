import CalendarIcon from "@/components/icons/CalendarIcon";
import GroupUsersIcon from "@/components/icons/GroupUsersIcon";
import PayCardIcon from "@/components/icons/PaycardIcon";
import PlaneIcon from "@/components/icons/PlaneIcon";
import SpamIcon from "@/components/icons/SpamIcon";

export const contact = {
  images: [
    {
      id: 1,
      src: "/assets/avatar/avatar-3.png",
    },
    {
      id: 2,
      src: "/assets/avatar/avatar-4.png",
    },
    {
      id: 3,
      src: "/assets/avatar/avatar-5.png",
    },
  ],
  title: "Still have questions?",
  desc: "Can’t find the answer you’re looking for? Please chat to our friendly team.",
  buttonLabel: "Contact Support",
  buttonLink: "./support/contact-support",
};
export const detailContact = {
  images: [
    {
      id: 1,
      src: "/assets/avatar/avatar-3.png",
    },
    {
      id: 2,
      src: "/assets/avatar/avatar-4.png",
    },
    {
      id: 3,
      src: "/assets/avatar/avatar-5.png",
    },
  ],
  title: "Still Need Help?",
  desc: "Contact Our Support Team for Further Assistance",
  buttonLabel: "Contact Support",
  buttonLink: "./contact-support",
};

export const categories = [
  {
    title: "Getting Started",
    icon: <PlaneIcon className="h-4 w-4 text-default-700" />,
    href: "#",
  },
  {
    title: "Billing and Payments",
    icon: <PayCardIcon className="h-4 w-4 text-default-700" />,
    href: "./support/detail-category",
  },
  {
    title: "Account Management",
    icon: <GroupUsersIcon className="h-4 w-4 text-default-700" />,
    href: "#",
  },
  {
    title: "Event Management",
    icon: <CalendarIcon className="h-4 w-4 text-default-700" />,
    href: "#",
  },
  {
    title: "Technical Issues",
    icon: <SpamIcon className="h-4 w-4 text-default-700" />,
    href: "#",
  },
];
export const WebsiteFaqs = [
  {
    title: "What exactly does Fennec do?",
    desc: "Fennec is an all-in-one platform for nightlife and hospitality venues. We combine your POS system, inventory management, guest list, bottle service tracking, customer database, and debit terminal — all under one roof.",
  },
  {
    title: "Do I need to get rid of my current POS or systems to use Fennec?",
    desc: "No. While Fennec works best when used as a full-suite replacement, we’re also able to integrate with certain existing systems during your transition phase.",
  },
  {
    title:
      "Can I use Fennec just for one feature, like guest list or bottle service?",
    desc: "Yes — but to get the most value, we recommend using the full platform. That’s where you’ll see how everything connects and unlocks data insights that wouldn’t be possible otherwise.",
  },
  {
    title: "Is Fennec hard to set up?",
    desc: "Not at all. Our onboarding team handles the heavy lifting and we offer hands-on training to your staff so you’re up and running fast — usually within a few days.",
  },
  {
    title: "How does Fennec’s loyalty program work?",
    desc: "Fennec includes a fully customizable loyalty system. Venues can decide how customers earn points (e.g., based on spend, visits, or specific items), and what those points are worth — whether it’s a dollar value, discounted items, or exclusive perks.",
  },
  {
    title: "Does Fennec include hardware, like debit terminals or iPads?",
    desc: "Yes! We offer fully integrated hardware solutions, including debit terminals — or we can work with your existing setup.",
  },
  {
    title: "How does Fennec help with marketing?",
    desc: "We capture and organize customer data from every interaction — bottle service, guest lists, bar tabs — so you can retarget high-value guests, automate follow-ups, and personalize offers.",
  },
  {
    title: "What’s the cost?",
    desc: "Pricing is flexible depending on your venue size and which features you want to use. We offer monthly plans with no long-term commitment, and everything is scalable as your business grows.",
  },
  {
    title: "Can customers use their loyalty points at other venues?",
    desc: "No. By default, loyalty points are venue-specific. If a customer earns points at your nightclub, they can only redeem them at your venue. This protects your margins and ensures loyalty stays local. However, if you’re part of a hospitality group and want points to be usable across multiple locations, we can set up a shared points system across all your properties.",
  },
  {
    title: "Is Fennec secure? What happens to customer and payment data?",
    desc: "Yes! Security is a top priority at Fennec. Our platform was built by experienced nightclub owners and professional software developers who understand both the industry and the tech behind it. All customer data, payment information, and business analytics are encrypted and stored securely. We also have a dedicated cybersecurity team actively monitoring the platform to ensure your data stays protected at all times.",
  },
  {
    title:
      "What happens if we lose Wi-Fi? Can Fennec still process payments and track data?",
    desc: "Yes! Fennec is built with offline mode in mind. If your Wi-Fi disconnects, payments will still be processed, guest check-ins will still be tracked, and all customer data will continue to be collected. Once the system reconnects to Wi-Fi, everything automatically syncs to your dashboard in real time. For even more reliability, we also offer LTE-enabled iPads and debit terminals that stay connected to mobile data, so you’re never dependent on Wi-Fi to keep operations running.",
  },
];

export const detailFaqs = [
  {
    title: "How do I update my payment method?",
    desc: "You can update your payment method by logging into your account, going to the 'Billing' section, and selecting 'Update Payment Method.' From there, you can add or remove credit cards, and select your primary payment method.",
  },
  {
    title: "How do I view my payment history?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    title: "What should I do if a payment fails?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    title: "How do I download my invoice?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    title: "How do I add or remove a credit card from my account?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
];
