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
    answer: "Absolutely. Over 45% of our bookings include non-hunting spouses, partners, or family members. Our lodges (Kikuyo and Emanzini) offer five-star amenities including heated pools, massage therapists on call, private game drives, guided walking safaris, and stargazing. The culinary experiences, wine pairings, and wilderness proximity make it an unforgettable luxury vacation for non-hunters as well.",
    category: "Lodging & Safety"
  },
  {
    id: "faq-6",
    question: "What is your policy on ethical hunting and 'fair chase'?",
    answer: "We are strictly committed to ethical hunting and fair chase. Our hunts are conducted on our private 80,000-hectare conservancy with no internal fencing, giving animals a natural, open range to migrate. We track exclusively on foot (walk-and-stalk) to respect the animal's senses. We only harvest mature, past-breeding-age males, helping manage wildlife populations and preserve the genetic health of our herds.",
    category: "Travel & Entry"
  }
];
