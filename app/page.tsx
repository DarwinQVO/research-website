"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ContactModal } from "@/components/contact-modal";
import { Twitter, Mail } from "lucide-react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const testimonials = [
    {
      quote: "WIP",
      name: "Sam Parr",
      title: "My First Million",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129160/0_y6ZQkgFIAd2auGvP_vks35f.png"
    },
    {
      quote: "The difference between a good interview and a great one is preparation, and Eugenio helps me make sure I don't miss a thing",
      name: "Lenny Rachitsky",
      title: "Lenny's Podcast",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129160/Lenny_Image_v4lqvn.png"
    },
    {
      quote: "WIP",
      name: "Samir Chaudry",
      title: "Colin & Samir",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129180/e2ca14931f4b4a4786cd7151cf5d56ee_adq9hm.png"
    },
    {
      quote: "Eugenio has the researcher/learning gift. He's detail-oriented and always delivers on time",
      name: "David Perell",
      title: "How I Write",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129180/David_Image_ilx5my.png"
    },
    {
      quote: "Working with Eugenio is great—awesome research, hustle and energy",
      name: "Shaan Puri",
      title: "My First Million",
      avatar: "https://res.cloudinary.com/dahyx29il/image/upload/v1753129188/3a4b390a-084e-4c71-a81e-56bd64d4f32a_https___bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com_public_images_27cf0da8-77c8-4078-990d-493291f18d77_782x898_xh2900.avif"
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="flex flex-col items-center space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="text-6xl md:text-7xl leading-tight text-gray-900 tracking-tight">
              Hi. I'm Eugenio
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
              I handle research for creators so you can spend less time digging and more time creating.
            </p>
          </div>

          {/* Trusted By Section */}
          <div className="w-full space-y-8">
            <h2 className="text-3xl text-gray-900 text-center tracking-tight">
              Trusted by
            </h2>

            {/* Infinite Moving Cards */}
            <div className="flex justify-center">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="max-w-6xl"
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-8 max-w-xl">
            <p className="text-xl text-gray-600 leading-relaxed">
              I partner with a limited number of creators. Share a few details below to see if we're a match.
            </p>

            <Button 
              className="bg-gray-900 text-white px-10 py-4 text-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md rounded-xl"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Begin the Conversation
            </Button>
          </div>

          {/* Footer Section */}
          <div className="w-full flex justify-between items-center pt-8 border-t border-gray-200">
            <a 
              href="https://x.com/eugenio_com_mx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-lg">X/Twitter</span>
            </a>
            
            <a 
              href="mailto:eugenio@castrogarza.com?subject=Research%20Collaboration%20Inquiry&body=Hi%20Eugenio,%0D%0A%0D%0AI'm%20interested%20in%20working%20together%20on%20research%20for%20my%20content.%0D%0A%0D%0A[Please%20tell%20me%20about%20your%20project%20and%20research%20needs]%0D%0A%0D%0ABest%20regards,"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="text-lg">eugenio@castrogarza.com</span>
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