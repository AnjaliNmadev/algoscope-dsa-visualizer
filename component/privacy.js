import React from "react";

import Header from "./Header";
import Footer from "./footer";

  export default function Privacy()
{ 
   
      return (
        <>
       <Header/>
        <div className="privacy">
        <div className="p-6 bg-gray-100  max-w-2xl mx-auto ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            Welcome to AlgoScope. Your privacy is important to us. This Privacy
            Policy outlines how we collect, use, and protect your personal
            information.
          </p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Information We Collect</h3>
          <p className="text-gray-600 mb-4">
            We may collect personal information such as name, email address, and any
            other data provided when using our services.
          </p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">How We Use Your Information</h3>
          <p className="text-gray-600 mb-4">
            We use your information to improve our services, personalize your
            experience, and communicate with you.
          </p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Data Protection</h3>
          <p className="text-gray-600 mb-4">
            We take appropriate security measures to protect your data from
            unauthorized access or disclosure.
          </p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Us</h3>
          <p className="text-gray-600">
            If you have any questions regarding our Privacy Policy, feel free to
            contact us at <a href="mailto: support@AlgoScope.com" className="text-blue-600 underline">support@kidsstoryhub.com</a>.
          </p>
        </div>
        </div>
<Footer/>
        </>
      );
    };
    
