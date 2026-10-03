export type Review = { name: string; role: string; quote: string; image?: string; video: string; playback?: "drive" };

export const reviews: Review[] = [
  { name: "Eric Jamal", role: "Musician & Founder, Godit", quote: "Working with Addy was nothing short of amazing. She met every deadline, helped us launch successfully, and made the process easy.", image: "/reviews/eric-jamal.png", video: "1cLaWG5lMmaXwe7TfF9QewGtIGnoNQX4I" },
  { name: "Ruma", role: "Founder & CEO, á La Couture", quote: "Addy has made my life easier by handling our email marketing and helping us improve performance.", image: "/reviews/ruma.png", video: "1XfUWRcoJqsyUkznFiszGyukQvj4EYweT" },
  { name: "Sarah Buxton", role: "Founder & Creative Director, Tutublue", quote: "Video testimonial from Sarah Buxton.", video: "1JdgrPjQEuilJElxCf4WEaP6JKhmNOlDa", playback: "drive" },
  { name: "Kirsten Schroeder", role: "Founder & Owner, The Christian Boho", quote: "Video testimonial from Kirsten Schroeder.", video: "1ytCyH_FaCPSwhD8_bn_Zg-8Bfa-fVe9z", playback: "drive" },
  { name: "Dr. Suneel Dhand", role: "Co-Founder, Ojais Wellness", quote: "Video testimonial from Dr. Suneel Dhand.", video: "1T-s3bVCcsAFKPZNz0teo2UTGaqK-2Cmj" },
];