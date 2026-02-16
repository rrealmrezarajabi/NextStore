import FeatureShowcase from "@/components/HomePage/FeatureShowcase";
import Hero from "@/components/HomePage/Hero";
import LatestProducts from "@/components/HomePage/LatestProducts";
import { NewsletterCTA, TestimonialCard, TrustedBy } from "@/components/HomePage/SocialProof";

const HomePage = () => {
  return (
    <>
      <Hero />
      <LatestProducts />
      <FeatureShowcase />
      <TrustedBy />

      <TestimonialCard
        quote={`"NextStore completely transformed how we manage our online sales. The interface is clean, fast, and incredibly intuitive. Our conversion rate improved within the first two weeks of use."`}
        name="Tony Montana"
        role="Head of eCommerce"
        handle="@nexify"
        avatarSrc="/montana.jpg"
      />

      <NewsletterCTA />
    </>
  );
};

export default HomePage;
