"use client";
import Image from "next/image";
import React from "react";

export default function Support() {
  const cards = [
    {
      id: 1,
      question: "How do I upload new content, such as articles or images, to our website through the dashboard?",
      answer: `To access the website editing functionality, start by navigating to the dashboard's homepage. From there, select the "Edit Website" option. You'll then see a list of websites currently under your management. Choose the specific website you wish to manage. Once selected, you'll be presented with a list of existing content on that site. From this list, you can easily edit or remove existing content and also add new content as needed.`,
    },
    {
      id: 2,
      question: "How secure is the content management dashboard in terms of protecting our website from unauthorized access or data breaches?",
      answer:
        "Using NextAuth.js for our dashboard authentication provides robust security measures. NextAuth.js employs industry-standard authentication mechanisms and session management, ensuring secure user access. Additionally, it offers various authentication strategies, including social authentication and email/password, enhancing user convenience without compromising security. By leveraging NextAuth.js, we bolster our dashboard's defenses against unauthorized access and data breaches, offering peace of mind to both users and administrators.",
    },
    {
      id: 3,
      question: "Are there any tutorials or documentation available to help me navigate the content management dashboard?",
      answer:
        "Navigating the content management dashboard is intuitive and straightforward, requiring minimal guidance. Comprehensive tutorials or documentation aren't necessary due to its user-friendly interface. However, should assistance be needed, our support team is readily available to provide prompt help and address any queries or concerns.",
    },
    {
      id: 4,
      question: "Can multiple team members collaborate on editing website content within the dashboard?",
      answer:
        "Yes, multiple team members can collaborate on editing website content within the dashboard. The dashboard allows for the addition of team members with varying roles and access levels. This ensures efficient collaboration while maintaining control over who can edit, publish, or manage content. With this capability, teams can work together seamlessly to update and improve website content as needed.",
    },
    {
      id: 5,
      question: "What support options are available if I encounter any issues or need assistance while using the dashboard?",
      answer:
        "We provide comprehensive support options to assist you whenever you encounter issues or need assistance while using the dashboard. Our support team is available 24/7 and can be reached via various channels provided in the contact information below. No matter the issue or query, our dedicated support team is here to help you every step of the way.",
    },
  ];

  const handleForm = e => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-5">Support</h1>
          </div>
        </header>
        <main className="mb-24 mt-1 support-main">
          <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
              <p className="text-neutral-500 text-xl mt-3">Frequenty asked questions</p>
            </div>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-5">
              {cards.map(card => {
                return (
                  <div
                    key={card.id}
                    className="py-5"
                  >
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{card.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">{card.answer}</p>
                    </details>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center support-div-msg">
              <p className="text-neutral-500 text-xl mt-10 text-center">You were unable to find answer to your question?</p>
              <p className="text-neutral-500 text-xl mt-4 text-center">
                Please refer to the contact information below to reach out to us directly by using one of the available methods.
              </p>
            </div>
            <div className="flex flex-col items-center mt-16">
              <h2 className="font-bold text-5xl  tracking-tight">Contact</h2>
            </div>
            <div className="flex flex-col">
              <div className="support-row">
                <div className="support-col mt-20">
                  <div className="support-row">
                    <Image
                    height={200}
                    width={200}
                      src="/call3.png"
                      alt="Call center"
                    />
                    <div>
                      <p className="support-desc">Phone number:</p>
                      <p>+387 65 123 456</p>
                    </div>
                  </div>
                  <div className="support-row mt-10">
                    <Image
                    height={200}
                    width={200}
                      src="/mail.png"
                      alt="Support email"
                      className="ml-50"
                    />
                    <div>
                      <p className="support-desc">Email address:</p>
                      <p className="support-mail">odd.genetics@hotmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="support-col mt-20">
                  
                  <div className="mx-auto w-full max-w-lg">
                    <form className="">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="name"
                            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            placeholder=" "
                          />
                          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                            Your name
                          </label>
                        </div>
                        <div className="relative z-0">
                          <input
                            type="text"
                            name="email"
                            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            placeholder=" "
                          />
                          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                            Your email
                          </label>
                        </div>
                        <div className="relative z-0 col-span-2">
                          <textarea
                            name="message"
                            rows="5"
                            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            placeholder=" "
                          ></textarea>
                          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                            Your message
                          </label>
                        </div>
                      </div>
                      <button
                        className="mt-5 rounded-md bg-gray-800 hover:bg-gray-700 px-10 py-2 text-white"
                        onClick={e => {
                          handleForm(e);
                        }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
