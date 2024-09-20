import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="sticky top-0 overflow-x-auto whitespace-nowrap border-b transition duration-100  z-50 border-transparent bg-white shadow-sm w-full">
      <div className="mx-auto flex max-w-container justify-between space-x-8 py-4 text-sm font-semibold leading-6 text-slate-900">
        <div className="flex space-x-8 pl-4 sm:pl-6 lg:pl-8">
          <a href="#product-marketing">Marketing</a>
          <a href="#product-application-ui">Application UI</a>
          <a href="#product-ecommerce">Ecommerce</a>
        </div>
        <div className="flex space-x-8 pr-4 sm:pr-6 lg:pr-8">
          <a href="#pricing">Pricing</a>
          <a href="#faqs">
            <abbr className="no-underline" title="Frequently asked questions">
              FAQs
            </abbr>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
