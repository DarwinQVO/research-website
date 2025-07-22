"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TestimonialAccordion } from "@/components/testimonial-accordion";
import { ContactModal } from "@/components/contact-modal";
import { Mail } from "lucide-react";
import { XLogo } from "@/components/icons/XLogo";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const testimonials = [
    {
      quote: "Eugenio's research skills are unparalleled. For over two years, he was my secret weapon for preparing for the podcast.",
      name: "Sam Parr",
      title: "My First Million",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129160/0_y6ZQkgFIAd2auGvP_vks35f.png",
      twitterUrl: "https://x.com/thesamparr",
      showUrl: "https://www.youtube.com/@MyFirstMillionPod"
    },
    {
      quote: "The difference between a good interview and a great one is preparation, and Eugenio helps me make sure I don't miss a thing",
      name: "Lenny Rachitsky",
      title: "Lenny's Podcast",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129160/Lenny_Image_v4lqvn.png",
      twitterUrl: "https://x.com/lennysan",
      showUrl: "https://www.youtube.com/@LennysPodcast"
    },
    {
      quote: "I've worked with several researchers, but Eugenio is on another level. He's saved us a ton of time and has helped us find insights we would not have found otherwise.",
      name: "Samir Chaudry",
      title: "Colin & Samir",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129180/e2ca14931f4b4a4786cd7151cf5d56ee_adq9hm.png",
      twitterUrl: "https://x.com/samirchaudry",
      showUrl: "https://www.youtube.com/ColinandSamir"
    },
    {
      quote: "Eugenio has the researcher/learning gift. He's detail-oriented and always delivers on time",
      name: "David Perell",
      title: "How I Write",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129180/David_Image_ilx5my.png",
      twitterUrl: "https://x.com/david_perell",
      showUrl: "https://www.youtube.com/playlist?list=PLFxhXLgGkVzKCn23_g8qM19DMDgco8eNJ"
    },
    {
      quote: "Working with Eugenio is great—awesome research, hustle and energy",
      name: "Shaan Puri",
      title: "My First Million",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129188/3a4b390a-084e-4c71-a81e-56bd64d4f32a_https___bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com_public_images_27cf0da8-77c8-4078-990d-493291f18d77_782x898_xh2900.avif",
      twitterUrl: "https://x.com/ShaanVP",
      showUrl: "https://www.youtube.com/@MyFirstMillionPod"
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-6xl">
        <div className="flex flex-col items-center space-y-12 sm:space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 sm:space-y-6 max-w-2xl px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900 tracking-tight">
              Hi. I&apos;m Eugenio
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
              I handle research for creators so you can spend less time digging and more time creating.
            </p>
          </div>

          {/* Trusted By Section */}
          <div className="w-full space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl text-gray-900 text-center tracking-tight px-4">
              Trusted by
            </h2>

            {/* Testimonial Accordion */}
            <TestimonialAccordion testimonials={testimonials} />
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 sm:space-y-8 max-w-xl px-4">
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              I partner with a limited number of creators. Share a few details below to see if we&apos;re a match.
            </p>

            <Button 
              className="bg-gray-900 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md rounded-xl w-full sm:w-auto"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Begin the Conversation
            </Button>
          </div>

          {/* Footer Section */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-6 sm:pt-8 border-t border-gray-200 px-4">
            <a 
              href="https://x.com/eugenio_com_mx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <XLogo className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-base sm:text-lg">@eugenio_com_mx</span>
            </a>
            
            <a 
              href="mailto:e@eugeniocastro.com?subject=Research%20Collaboration%20Inquiry&body=Hi%20Eugenio,%0D%0A%0D%0AI'm%20interested%20in%20working%20together%20on%20research%20for%20my%20content.%0D%0A%0D%0A[Please%20tell%20me%20about%20your%20project%20and%20research%20needs]%0D%0A%0D%0ABest%20regards,"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-base sm:text-lg break-all sm:break-normal">e@eugeniocastro.com</span>
            </a>
          </div>

        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}