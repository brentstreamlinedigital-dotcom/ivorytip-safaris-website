export interface HuntingStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  tip: string;
  duration: string;
}

export const HUNTING_STEPS: HuntingStep[] = [
  {
    stepNumber: 1,
    title: "Bespoke Planning",
    shortDesc: "Custom consultation aligning caliber configurations, trophy goals, and permit frameworks.",
    longDesc: "Your hunt starts months before setting foot in Africa. We conduct one-on-one video calls to design your specific species wish list, coordinate custom rifle import permits, and advise on ballistic selections. Whether you are seeking a record-class Cape Buffalo or a family plains game package, every detail is custom tailored.",
    image: "/assets/what_to_expect/01.jpg",
    tip: "Caliber recommendation: .300 Win Mag for plains game; .375 H&H minimum for dangerous game.",
    duration: "Pre-departure (2-6 months prior)"
  },
  {
    stepNumber: 2,
    title: "Lodge Arrival",
    shortDesc: "Airport greeting and transfer via private shuttle directly to the lodge.",
    longDesc: "Upon landing in Gqeberha (Port Elizabeth), you are met by an Ivorytip representative who handles your rifle clearance. We transfer you in an air-conditioned vehicle directly to the lodge. Relax as Andre and Jenna welcome you at the main lodge deck.",
    image: "/assets/what_to_expect/02.jpg",
    tip: "Let us handle your firearm temporary import permits in advance for rapid customs clearance.",
    duration: "Day 1 (Morning)"
  },
  {
    stepNumber: 3,
    title: "Camp Setup & Range Sighting",
    shortDesc: "Unpacking into your private stone suite, safety briefing, and sighting-in rifles at the range.",
    longDesc: "After settling into your thatch suite, we head to our private shooting range. We check the zero of your rifles to ensure the trans-Atlantic flight hasn't shifted your scopes. Our Professional Hunters review field safety protocols and discuss local tracking signs.",
    image: "/assets/what_to_expect/03.jpg",
    tip: "Shoot three rounds from a cold barrel to verify zero at exactly 100 yards.",
    duration: "Day 1 (Afternoon)"
  },
  {
    stepNumber: 4,
    title: "The Daily Rhythm",
    shortDesc: "Acacia fire coffee at dawn, sunrise departures, midday savanna heat rests, and late stalks.",
    longDesc: "Life on safari has an ancient rhythm. We wake before dawn to fresh coffee brewed over wood embers. By sunrise, our 4x4 hunting cruisers are heading into remote valleys. We hunt hard until the midday heat, returning to the lodge for a farm-to-table lunch and a plunge pool rest. At 3 PM, we head back out for the late afternoon stalk.",
    image: "/assets/what_to_expect/04.jpg",
    tip: "Layer your clothing; the Eastern Cape desert is freezing at dawn but hot by midday.",
    duration: "Days 2 - 8 (All day)"
  },
  {
    stepNumber: 5,
    title: "Ancestral Tracking",
    shortDesc: "Walking with spoor trackers who decode sand tracks, dry twigs, and animal calls.",
    longDesc: "We leave the vehicles behind to track on foot. You walk alongside native spoor trackers who decode the savanna floor. They trace broken grass blades, fresh dung warmth, and distant alarm calls of bushbucks. This is a game of patience, reading the terrain, and constant wind direction monitoring.",
    image: "/assets/what_to_expect/05.jpg",
    tip: "Keep downwind. Our trackers carry dust bottles to constantly check thermals.",
    duration: "Ongoing (Daily)"
  },
  {
    stepNumber: 6,
    title: "The Stalk",
    shortDesc: "Adrenaline-fueled crawls through thick acacia and high grass to close the distance.",
    longDesc: "When a target animal is spotted, the real test begins. We use ridges and acacia thickets to stalk into range. This often requires crawling on hands and knees over rocks and grass to get within 150 yards. Your heart will beat in your chest as the gap narrows, testing your stealth and nerve.",
    image: "/assets/what_to_expect/06.jpg",
    tip: "Walk strictly in the footprint of the guide to minimize noise and snapping branches.",
    duration: "Variable (1-4 hours)"
  },
  {
    stepNumber: 7,
    title: "The Harvest",
    shortDesc: "Ethical shot selection, clean harvest, and traditional field respect rituals.",
    longDesc: "We only harvest mature, past-prime males. Under the guidance of Andre or your PH, we wait for a clean, broadside presentation. Once the shot is placed ethically, we conduct traditional respect rituals, honoring the animal's spirit, followed by precise field skinning to protect the cape for your trophy room.",
    image: "/assets/what_to_expect/07.jpg",
    tip: "Take your time. Wait for the PH to confirm the target and say 'take him when ready'.",
    duration: "Stalk climax"
  },
  {
    stepNumber: 8,
    title: "Campfire Celebration",
    shortDesc: "Evening fireside dinners, toasts, and retelling of the stalk's stories.",
    longDesc: "In the evening, the camp comes alive. Trackers, guides, and guests gather around the crackling campfire. We toast the day's stalks with drinks. Jenna's kitchen serves wild game dishes prepared over open coals, while we retell the stories of the hunt under the Southern Cross.",
    image: "/assets/what_to_expect/08.jpg",
    tip: "Try the chef's signature slow-roasted Wildebeest shank paired with a bold Pinotage.",
    duration: "Every evening"
  },
  {
    stepNumber: 9,
    title: "Luxury Accommodation Rest",
    shortDesc: "Relaxing in comfortable suites and sleeping under vaulted thatch as jackals call.",
    longDesc: "Retreat to your private suite for deep rest. Slide the glass doors wide and listen to the savanna night sounds. Sleep in absolute comfort, fully refreshed for the morning's new sunrise tracks.",
    image: "/assets/Sable room from bed.jpg",
    tip: "Leave your bedroom deck screen doors open to hear the valley night wind.",
    duration: "Nightly"
  },
  {
    stepNumber: 10,
    title: "Logistics & Departure",
    shortDesc: "Taxidermy tag management, safe packing, shuttle return, and global trophy exports.",
    longDesc: "On your final day, we finalize all trophy tag registers and oversee the safe transport of capes to our local taxidermy partner. We transfer you back to Gqeberha airport for your flight home, managing all export paperwork. The hunt ends, but your relationship with Ivorytip continues.",
    image: "/assets/what_to_expect/10.jpg",
    tip: "We provide complete photo documentation of your capes delivered to the taxidermy agent.",
    duration: "Day 9 (Morning)"
  }
];
