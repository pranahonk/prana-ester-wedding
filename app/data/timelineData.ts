export interface TimelineMilestone {
  id: number;
  year: number;
  date: string;
  emoji: string;
  title: { id: string; en: string };
  location: string;
  photo: string;
  description: { id: string; en: string };
  order: number;
}

export const timelineData: TimelineMilestone[] = [
  {
    id: 1,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: { en: "We Met", id: "Pertama Bertemu" },
    location: "Kelapa Gading, Jakarta",
    photo: "/photos/IMG-20200718-WA0000.jpg",
    description: {
      en: "In the bustling streets of Kelapa Gading, two worlds collided in the most beautiful way. Through mutual friends, you arrived—unexpected yet somehow inevitable. I was working at Indosports, and you worked for BCA, but that day, destiny brought us together. In that moment, we didn't know we were beginning a story that would define us both.",
      id: "Di jalanan Kelapa Gading yang ramai, dua dunia bertabrakan dengan cara yang paling indah. Melalui teman bersama, kamu datang—tak terduga namun terasa tak terelakkan. Aku bekerja di Indosports, dan kamu di BCA, namun hari itu, takdir mempertemukan kita. Saat itu, kita tidak tahu bahwa kita sedang memulai sebuah kisah yang akan mendefinisikan hidup kita berdua.",
    },
    order: 1,
  },
  {
    id: 2,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: { en: "Taking It Further", id: "Melangkah Bersama" },
    location: "Jakarta",
    photo: "/photos/IMG_20200729_212751.jpg",
    description: {
      en: "Days turned into weeks, and weeks into months of discovering each other. Every conversation deepened our connection. Your laughter became my favorite song, and your presence, my greatest comfort. We were building something precious, something that felt like it could last forever. In those early days, love felt simple, pure, and undeniably real.",
      id: "Hari demi hari berlalu, minggu demi minggu dalam proses saling mengenal. Setiap percakapan mempererat hubungan kita. Tawamu menjadi lagu favoritku, dan kehadiranmu, kenyamanan terbesarku. Kita sedang membangun sesuatu yang berharga, sesuatu yang terasa bisa bertahan selamanya. Di hari-hari awal itu, cinta terasa sederhana, murni, dan nyata.",
    },
    order: 2,
  },
  {
    id: 3,
    year: 2019,
    date: "2019-2020",
    emoji: "💔",
    title: { en: "Life Happens", id: "Takdir Memisahkan" },
    location: "Jakarta",
    photo: "/photos/DSC00220.jpg",
    description: {
      en: "After six beautiful months, life's circumstances pulled us apart. It wasn't anyone's fault—sometimes the timing and the world around us make it impossible to stay. The pain of separation was deep, but it also taught us something invaluable. We learned that what we had was real, and that some connections don't fade, no matter how far apart we drift.",
      id: "Setelah enam bulan yang indah, keadaan hidup memisahkan kita. Bukan salah siapapun—terkadang waktu dan dunia di sekitar kita membuat segalanya menjadi mustahil. Rasa sakit perpisahan itu sangat dalam, namun juga mengajarkan kita sesuatu yang tak ternilai. Kita belajar bahwa apa yang kita miliki itu nyata, dan ada hubungan yang tidak pernah pudar, tidak peduli seberapa jauh kita terpisah.",
    },
    order: 3,
  },
  {
    id: 4,
    year: 2024,
    date: "January 2024",
    emoji: "🔄",
    title: { en: "Found Again", id: "Bertemu Kembali" },
    location: "Jakarta",
    photo: "/photos/DSC00312.jpg",
    description: {
      en: "Years passed, and unexpectedly, you came back into my life. It was like the universe refused to let us go. We talked for hours, rediscovering each other, and discovering that our feelings had never truly disappeared. They had merely been waiting, growing stronger in silence. In January 2024, we realized that second chances do exist, and we were brave enough to take it.",
      id: "Tahun demi tahun berlalu, dan tiba-tiba, kamu kembali hadir dalam hidupku. Seolah semesta menolak untuk melepaskan kita. Kita berbicara berjam-jam, saling menemukan kembali, dan mendapati bahwa perasaan kita tidak pernah benar-benar pergi. Mereka hanya menunggu, tumbuh semakin kuat dalam diam. Pada Januari 2024, kita sadar bahwa kesempatan kedua memang ada, dan kita cukup berani untuk mengambilnya.",
    },
    order: 4,
  },
  {
    id: 5,
    year: 2024,
    date: "March 27, 2024",
    emoji: "💍",
    title: { en: "We Committed", id: "Berkomitmen" },
    location: "Jakarta",
    photo: "/photos/DSC00314.jpg",
    description: {
      en: "After four months of conversations that healed old wounds and built new dreams, we made a promise to each other. On March 27, 2024, we officially committed to our relationship. This wasn't just a decision—it was a declaration. A promise that we would choose each other, day after day, come what may. Our forever officially began.",
      id: "Setelah empat bulan percakapan yang menyembuhkan luka lama dan membangun mimpi baru, kita saling berjanji. Pada 27 Maret 2024, kita resmi menjalin hubungan. Ini bukan sekadar keputusan—ini adalah sebuah deklarasi. Janji bahwa kita akan memilih satu sama lain, hari demi hari, apapun yang terjadi. Selamanya kita resmi dimulai.",
    },
    order: 5,
  },
  {
    id: 6,
    year: 2025,
    date: "March 27, 2025",
    emoji: "✨",
    title: { en: "One Year of Forever", id: "Satu Tahun Selamanya" },
    location: "Jakarta",
    photo: "/photos/IMG-20250329-WA0025.jpg",
    description: {
      en: "One year together felt like a lifetime of love compressed into moments of pure joy. We celebrated how far we've come, how much we've grown, and how our love has only deepened with each passing day. On our first anniversary, we didn't just look back—we looked forward to all the years ahead, grateful for second chances and eternal love.",
      id: "Satu tahun bersama terasa seperti seumur hidup cinta yang terpadatkan dalam momen-momen kebahagiaan murni. Kita merayakan seberapa jauh kita telah melangkah, seberapa banyak kita telah bertumbuh, dan bagaimana cinta kita semakin mendalam setiap harinya. Di ulang tahun pertama kita, kita tidak hanya menoleh ke belakang—kita menatap ke depan pada semua tahun yang akan datang, bersyukur atas kesempatan kedua dan cinta yang kekal.",
    },
    order: 6,
  },
  {
    id: 7,
    year: 2025,
    date: "December 28, 2025",
    emoji: "💎",
    title: { en: "Our Engagement", id: "Pertunangan Kami" },
    location: "Jakarta",
    photo: "/photos/DSC00328.jpg",
    description: {
      en: "On this beautiful December evening, you got down on one knee, and I said yes without hesitation. In that moment, surrounded by the life we've built together, I knew this was forever. This wasn't just a proposal—it was a promise, a celebration of our journey, and the beginning of our next chapter together.",
      id: "Di malam Desember yang indah itu, kamu berlutut, dan aku langsung berkata ya tanpa ragu. Saat itu, dikelilingi oleh kehidupan yang telah kita bangun bersama, aku tahu ini adalah selamanya. Ini bukan sekadar lamaran—ini adalah sebuah janji, perayaan perjalanan kita, dan awal dari babak selanjutnya bersama.",
    },
    order: 7,
  },
  {
    id: 8,
    year: 2026,
    date: "May 30, 2026",
    emoji: "💒",
    title: { en: "Our Wedding Day", id: "Hari Pernikahan Kami" },
    location: "Wedding Venue, Jakarta",
    photo: "/photos/DSC00449.jpg",
    description: {
      en: "Today, surrounded by those we love, we celebrate not just our love, but the journey that brought us here. From that first meeting in Kelapa Gading to this moment, every chapter has led us to say 'yes' forever. This is the beginning of the rest of our lives—a promise kept, a story continued, and love that will endure for all our days.",
      id: "Hari ini, dikelilingi oleh orang-orang yang kita cintai, kita merayakan bukan hanya cinta kita, tetapi perjalanan yang membawa kita ke sini. Dari pertemuan pertama di Kelapa Gading hingga momen ini, setiap babak telah membawa kita untuk mengucapkan 'ya' selamanya. Ini adalah awal dari sisa kehidupan kita—janji yang ditepati, kisah yang dilanjutkan, dan cinta yang akan bertahan sepanjang hari-hari kita.",
    },
    order: 8,
  },
];
