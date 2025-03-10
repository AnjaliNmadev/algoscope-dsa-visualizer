import React from "react";
import Header from "./Header";
import Footer from "./footer";

  export default function Contact()
{

      return (

        <>
        <Header/>
        <div className="contact ">
        <div className="p-6 bg-gray-100  max-w-md mx-auto ">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-2">
            If you have any questions, complaints, or claims regarding our services,
            please send us a message at:
          </p>
          <ul className="list-disc list-inside text-blue-600">
            <li>
              <a href="mailto:support@Kidstoryhub.com" className="underline">
                support@AlgoScope.com
              </a>
            </li>
            <li>
              <a href="mailto:contact@Kidstoryhub.com" className="underline">
                contact@AlgoScope.com
              </a>
            </li>
          </ul>
        </div>
        </div>
        <Footer/>
        </>
        
      );
    };
    




