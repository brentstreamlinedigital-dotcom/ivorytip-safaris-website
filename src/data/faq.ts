export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Travel & Entry" | "Firearms & Gear" | "Trophies & Taxidermy" | "Lodging & Safety";
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need a visa to enter South Africa for a hunting safari?",
    answer: "Visitors from the United States, Canada, the United Kingdom, and the European Union do not require a visa for tourist stays up to 90 days. You will need a valid passport with at least two blank pages and an expiration date at least 30 days after your scheduled departure date.",
    category: "Travel & Entry"
  },
  {
    id: "faq-2",
    question: "How do I bring my own hunting rifle into South Africa?",
    answer: "You can temporarily import your own hunting rifle into South Africa. You must complete a SAPS 520 application form. We coordinate this process with you in advance, issuing a formal Invitation Letter (required by police). At Gqeberha (Port Elizabeth) airport, you will check through customs where our representative will assist with rifle clearance. Note that automatic and semi-automatic firearms are strictly prohibited.",
    category: "Firearms & Gear"
  },
  {
    id: "faq-3",
    question: "What is the procedure for exporting trophies after the harvest?",
    answer: "Following a harvest, our field trackers manage immediate skinning, caping, and salt-curing of your specimens. We then deliver the salted capes and horns to our local taxidermy partner. They coordinate the final dip-and-pack sterilization and export permits. This process is fully regulated under state nature conservation frameworks and CITES guidelines for protected species. Trophies are typically crated and shipped globally within 6 to 9 months.",
    category: "Trophies & Taxidermy"
  },
  {
    id: "faq-4",
    question: "Is malaria a concern at the Ivorytip conservancy?",
    answer: "No. The Eastern Cape of South Africa—where Ivorytip Safaris is located—is entirely malaria-free. You do not need to take malaria prophylaxis or other specialized tropical medications. Standard travel vaccinations (Tetanus, Hepatitis A) are recommended, but no tropical health clearance is required.",
    category: "Lodging & Safety"
  },
  {
    id: "faq-5",
    question: "Are the lodges suitable for non-hunting companions?",
    answer: "Absolutely. We frequently host non-hunting spouses, partners, and family members. While hunters are in the field, companions can enjoy guided bush walks, game viewing drives, stargazing, or simply relaxing at the lodge. The home-cooked meals, quiet wilderness setting, and warm hospitality make it a peaceful and memorable stay for non-hunters.",
    category: "Lodging & Safety"
  },
  {
    id: "faq-6",
    question: "What is your policy on ethical hunting and 'fair chase'?",
    answer: "We are strictly committed to ethical hunting and fair chase. Our hunts are conducted on foot (walk-and-stalk) on our managed farm and private concessions, giving wildlife a natural, open range. We only harvest mature, past-prime males, helping manage wildlife populations and support local conservation efforts on the land.",
    category: "Travel & Entry"
  },
  {
    id: "faq-7",
    question: "Do you offer photographic safaris for non-hunting guests?",
    answer: "Yes. Alongside our hunting expeditions, we host dedicated photographic safaris for guests who wish to track and view game with a camera. These trips follow the same walk-and-stalk guiding principles and can be booked standalone or paired with a hunting party's itinerary.",
    category: "Lodging & Safety"
  }
];
