import CustomSelect from "@/components/app-ui/flow-editor/common/CustomSelect";
import CustomSelect2 from "@/components/app-ui/flow-editor/common/CustomSelect2";
import InfoToolTip from "@/components/app-ui/flow-editor/common/InfoToolTip";
import MultipleCheckboxes from "@/components/app-ui/flow-editor/common/InputComponents/MultipleCheckboxes";
import SearchDropDownInput from "@/components/app-ui/flow-editor/common/SearchDropDownInput";
import FooterNav from "@/components/app-ui/onboarding/FooterNav";
import FormContainer from "@/components/app-ui/onboarding/FormContainer";
import OnBoardLayout from "@/components/app-ui/onboarding/OnBoardLayout";
import RespondToCheckbox from "@/components/app-ui/onboarding/coaches/step1/RespondToCheckbox";
import { coachesdesignation, coachesdomains } from "@/lib/common";
import { COUNTRIES } from "@/lib/countries";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const domains = [
  { id: 0, label: 'Select Domain', value: '' },
  { id: 1, label: 'Health & Fitness', value: 'health_fitness' },
  { id: 2, label: 'Beauty', value: 'beauty' },
  { id: 3, label: 'Fashion', value: 'fashion' },
  { id: 4, label: 'Travel', value: 'travel' },
  { id: 5, label: 'Home & Living', value: 'home_living' },
  { id: 6, label: 'Business', value: 'business' },
  { id: 7, label: 'Finance', value: 'finance' },
  { id: 8, label: 'Technology', value: 'technology' },
  { id: 9, label: 'Gaming', value: 'gaming' },
  { id: 10, label: 'Entertainment', value: 'entertainment' },
  { id: 11, label: 'Current Affairs', value: 'current_affairs' },
  { id: 12, label: 'Arts', value: 'arts' },
  { id: 13, label: 'History', value: 'history' }
];

const step1 = (props) => {
  const [formData, setFormData] = useState({
    handle_name: '',
    country: '',
    creator_title: '',
    domain: '',
    target_audience: '',
    business_details: '',
    agent_title: '',
  });

  const [error, setError] = useState<any>({

  })

  const inputRef = useRef<any>([])

  const handleChange = (
    e
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return false
  }

  useEffect(()=>{
    if(inputRef.current){
      console.log(inputRef.current[0])
    }
  },[])

  return (
  
      <FormContainer>
        {/* Your creator / handle name */}
        <div className="text-left  space-y-3  ">
          <label htmlFor="name" className="block   font-medium text-gray-700">
            Your creator / handle name
          </label>
          <div className="mt-2 md:w-1/2">
            <input
              type="text"
              name="handle_name"
              onChange={handleChange}
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange-deski focus:ring-brand-orange-deski disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
              placeholder="Enter Handle Name"
            />
          </div>
        </div>
 
        {/* Country where your majority audience resides */}
        <div className="text-left  space-y-3  ">
          <label
          htmlFor="name"
          className="block   font-medium text-gray-700"
          >
            Country where your majority audience resides
          </label>
          <div className="mt-2 md:w-1/2 w-full">
            <SearchDropDownInput
              // state={formData}
              setState={setFormData}
              list={COUNTRIES}
              name={'country'}
              placeholder="Enter Country"
            />
          </div>
        </div>

        {/* What would describe you the best  */}
        <div className="text-left  space-y-3  ">
          <label
          htmlFor="creator_title"
          className="block font-medium text-gray-700"
          >
            What would describe you the best 
          </label>
          <div className="mt-2  w-full">
             
            <textarea 
              name="creator_title"
              onChange={handleChange}
              id="creator_title"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange-deski focus:ring-brand-orange-deski disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm resize-none	"
              placeholder="Describe Yourself"
              rows={4}
              ref={el => inputRef.current.push(el)} 
              ></textarea>
          </div>
        </div>

        {/* What is the domain you operate in */}
        <div className="text-left  space-y-3  ">
          <label
          htmlFor="domain"
          className="block font-medium text-gray-700"
          >
            What is the domain you operate in 
          </label>
          <div className="mt-2 md:w-1/2 w-full">
          <CustomSelect2
              state={formData}
              setState={setFormData}
              list={[
                { id: 'a', value: null, label: 'Select Domain' },
                { id: 0, value: 'health&fitness', label: 'Health & Fitness' },
                { id: 1, value: 'beauty', label: 'Beauty' },
                { id: 2, value: 'fashion', label: 'Fashion' },
                { id: 3, value: 'travel', label: 'Travel' },
                { id: 4, value: 'home&living', label: 'Home & Living' },
                { id: 5, value: 'business', label: 'Business' },
                { id: 6, value: 'finance', label: 'Finance' },
                { id: 7, value: 'technology', label: 'Technology' },
                { id: 8, value: 'gaming', label: 'Gaming' },
                { id: 9, value: 'entertainment', label: 'Entertainment' },
                { id: 10, value: 'current&affairs', label: 'Current Affairs' },
                { id: 11, value: 'arts', label: 'Arts' },
                { id: 12, value: 'history', label: 'History' }
              ]}
              name={"domain"}
            />
             
          </div>
        </div>

        {/*  Target Audience  */}
        <div className="text-left  space-y-3  ">
        <label
        htmlFor="name"
        className="block font-medium text-gray-700"
        >
          Target Audience 
        </label>
         <div className="mt-2">
            <input
              type="text"
              name="target_audience"
              onChange={handleChange}
              id="target_audience "
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange-deski focus:ring-brand-orange-deski disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
              placeholder="Enter Target Audience"
              ref={el => inputRef.current.push(el)} 
            />
          </div>
        </div>

        {/* About You / Your Business Details */}
        <div className="text-left  space-y-3  ">
            <label
            htmlFor="name"
            className="block   font-medium text-gray-700"
            >
              <InfoToolTip info=" This is needed so that Agent can answer questions about your business and keep conversations in context">
              About You / Your Business Details
                </InfoToolTip>
              
            </label>
            <div className="mt-2">
            <textarea
              rows={4}                        
              name="business_details"
              onChange={handleChange}
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange-deski focus:ring-brand-orange-deski disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm resize-none"
              placeholder="Enter Details..."
              ref={el => inputRef.current.push(el)} 
            />
            </div>
        </div>

        {/* Website (if any) */}
        <div className="text-left  space-y-3  ">
            <label
            htmlFor="name"
            className="block   font-medium text-gray-700"
            >
            Website (if any)
            </label>
            <div className="mt-2">
            <input
                type="text"
                name="agent_title"
                onChange={handleChange}
                id="name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange-deski focus:ring-brand-orange-deski disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                placeholder="Enter Website URL"
                ref={el => inputRef.current.push(el)} 
            />
            </div>
            
        </div> 

      </FormContainer>
  );
};

export default step1;


const FormContainer = ({ children }) => {
    return (
      <div className="w-full h-full flex flex-col overflow-y-scroll customscroll py-4      rounded-lg  ">
        <div className="w-full max-w-3xl 
        [&>div]:md:p-4 
        [&>div]:p-3 
        [&>div]:rounded-md 
        [&>div]:shadow-sm 
        [&>div]:bg-gray-50
        space-y-4">
          {children}
        </div>
      </div>
    );
  };
