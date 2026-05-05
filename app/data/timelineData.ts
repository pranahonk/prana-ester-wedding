export interface TimelineMilestone {
  id: number;
  year: number;
  date: string;
  emoji: string;
  title: string;
  location: string;
  photo: string;
  description: string;
  order: number;
}

export const timelineData: TimelineMilestone[] = [
  {
    id: 1,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: "We Met",
    location: "Kelapa Gading, Jakarta",
    photo: "/photos/IMG-20200718-WA0000.jpg",
    description: "In the bustling streets of Kelapa Gading, two worlds collided in the most beautiful way. Through mutual friends, you arrived—unexpected yet somehow inevitable. I was working at Indosports, and you worked for BCA, but that day, destiny brought us together. In that moment, we didn't know we were beginning a story that would define us both.",
    order: 1,
  },
  {
    id: 2,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: "Taking It Further",
    location: "Jakarta",
    photo: "/photos/IMG_20200729_212751.jpg",
    description: "Days turned into weeks, and weeks into months of discovering each other. Every conversation deepened our connection. Your laughter became my favorite song, and your presence, my greatest comfort. We were building something precious, something that felt like it could last forever. In those early days, love felt simple, pure, and undeniably real.",
    order: 2,
  },
  {
    id: 3,
    year: 2019,
    date: "2019-2020",
    emoji: "💔",
    title: "Life Happens",
    location: "Jakarta",
    photo: "/photos/DSC00220.jpg",
    description: "After six beautiful months, life's circumstances pulled us apart. It wasn't anyone's fault—sometimes the timing and the world around us make it impossible to stay. The pain of separation was deep, but it also taught us something invaluable. We learned that what we had was real, and that some connections don't fade, no matter how far apart we drift.",
    order: 3,
  },
  {
    id: 4,
    year: 2024,
    date: "January 2024",
    emoji: "🔄",
    title: "Found Again",
    location: "Jakarta",
    photo: "/photos/DSC00312.jpg",
    description: "Years passed, and unexpectedly, you came back into my life. It was like the universe refused to let us go. We talked for hours, rediscovering each other, and discovering that our feelings had never truly disappeared. They had merely been waiting, growing stronger in silence. In January 2024, we realized that second chances do exist, and we were brave enough to take it.",
    order: 4,
  },
  {
    id: 5,
    year: 2024,
    date: "March 27, 2024",
    emoji: "💍",
    title: "We Committed",
    location: "Jakarta",
    photo: "/photos/DSC00314.jpg",
    description: "After four months of conversations that healed old wounds and built new dreams, we made a promise to each other. On March 27, 2024, we officially committed to our relationship. This wasn't just a decision—it was a declaration. A promise that we would choose each other, day after day, come what may. Our forever officially began.",
    order: 5,
  },
  {
    id: 6,
    year: 2025,
    date: "March 27, 2025",
    emoji: "✨",
    title: "One Year of Forever",
    location: "Jakarta",
    photo: "/photos/IMG-20250329-WA0025.jpg",
    description: "One year together felt like a lifetime of love compressed into moments of pure joy. We celebrated how far we've come, how much we've grown, and how our love has only deepened with each passing day. On our first anniversary, we didn't just look back—we looked forward to all the years ahead, grateful for second chances and eternal love.",
    order: 6,
  },
  {
    id: 7,
    year: 2025,
    date: "December 21, 2025",
    emoji: "💎",
    title: "Our Engagement",
    location: "Jakarta",
    photo: "/photos/DSC00328.jpg",
    description: "On this beautiful December evening, you got down on one knee, and I said yes without hesitation. In that moment, surrounded by the life we've built together, I knew this was forever. This wasn't just a proposal—it was a promise, a celebration of our journey, and the beginning of our next chapter together.",
    order: 7,
  },
  {
    id: 8,
    year: 2026,
    date: "May 30, 2026",
    emoji: "💒",
    title: "Our Wedding Day",
    location: "Wedding Venue, Jakarta",
    photo: "/photos/DSC00449.jpg",
    description: "Today, surrounded by those we love, we celebrate not just our love, but the journey that brought us here. From that first meeting in Kelapa Gading to this moment, every chapter has led us to say 'yes' forever. This is the beginning of the rest of our lives—a promise kept, a story continued, and love that will endure for all our days.",
    order: 8,
  },
];
