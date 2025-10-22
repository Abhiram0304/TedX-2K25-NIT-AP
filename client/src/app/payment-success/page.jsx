// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { IoCheckmarkCircle } from "react-icons/io5";
// import { IoIosArrowRoundForward } from "react-icons/io";

// export default function PaymentSuccessPage() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto text-center">
//           <div className="mb-8">
//             <IoCheckmarkCircle 
//               size={120} 
//               className="text-green-500 mx-auto mb-4" 
//             />
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins text-green-500">
//             Payment Successful!
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8">
//             Thank you for registering for TEDx NIT Andhra Pradesh!
//           </p>
          
//           <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-8">
//             <p className="text-green-400 text-lg">
//               📧 A confirmation email with your booking details has been sent to your email address.
//             </p>
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
//             <h3 className="text-xl font-semibold mb-4">What&apos;s Next?</h3>
//             <div className="space-y-3 text-left">
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
//                 <p>You will receive a confirmation email with your ticket details</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
//                 <p>Please arrive at NIT Andhra Pradesh on October 5th, 2024 at 2:00 PM</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
//                 <p>Bring a valid ID for verification at the venue</p>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
//                 <p>Follow us on social media for event updates</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <button
//               onClick={() => router.push("/")}
//               className="w-full bg-tedred hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg flex items-center justify-center gap-2"
//             >
//               Back to Home
//               <IoIosArrowRoundForward size={24} />
//             </button>
            
//             <button
//               onClick={() => router.push("/speakers")}
//               className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
//             >
//               Meet Our Speakers
//             </button>
//           </div>

//           <div className="mt-12 text-sm text-gray-400">
//             <p>Need help? Contact us at:</p>
//             <p className="text-tedred">info@tedxnitandhrapradesh.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <IoCheckmarkCircle
              size={120}
              className="text-green-500 mx-auto mb-4"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins text-green-500">
            Payment Successful!
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Thank you for registering for TEDx NIT Andhra Pradesh!
          </p>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-8">
            <p className="text-green-400 text-lg">
              📧 A confirmation email with your booking details has been sent to
              your email address.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-semibold mb-4">What&apos;s Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
                <p>You will receive a confirmation email with your ticket details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
                <p>Please arrive at NIT Andhra Pradesh on October 28th, 2025 at 2:00 PM</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
                <p>Bring a valid ID for verification at the venue</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-tedred rounded-full mt-2 flex-shrink-0"></div>
                <p>Follow us on social media for event updates</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-tedred hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg flex items-center justify-center gap-2"
            >
              Back to Home
              <IoIosArrowRoundForward size={24} />
            </button>

            <button
              onClick={() => navigate("/speakers")}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
            >
              Meet Our Speakers
            </button>
          </div>

          <div className="mt-12 text-sm text-gray-400">
            <p>Need help? Contact us at:</p>
            <p className="text-tedred">info@tedxnitandhrapradesh.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
