import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import InfoToolTip from "../ToolTips/InfoToolTip";

type Props = {};



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

const inputStyle = 'block w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  resize-none bg-white'

const containerStyle = `relative h-fit w-full max-w-3xl [&>div]:md:p-4 [&>div]:p-3 [&>div]:rounded-md [&>div]:shadow-sm [&>div]:bg-gray-50
[&_input]:p-2
[&_textarea]:p-2
space-y-4`

const SimpleForm = (props: Props) => {
  const [formData, setFormData] = useState({
    handle_name: '',
    country: '',
    creator_title: '',
    domain: '',
    target_audience: '',
    business_details: '',
    agent_title: '',
  });


  const [error, setError] = useState<boolean>(false)
  const inputRef = useRef<any>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError(false);
    const errors: boolean[] = [];

    console.log(inputRef.current, 'ref')

    for (const key in inputRef.current) {
        if (Object.prototype.hasOwnProperty.call(inputRef.current, key)) {
            const element = inputRef.current[key];
            if (element) {
                      // Check if element is required and value is empty
                if (element.required === true && (element.value === null || element.value.trim() === '')) {
                    element.classList.add('ring-2');
                    element.classList.add('ring-red-500');
                    element.classList.add('border-red-500');
                errors.push(false);
                } else {
                    element.classList.remove('ring-2');
                    element.classList.remove('ring-red-500');
                    element.classList.remove('border-red-500');
                }
            } else {
                console.error('Element is null');
            }
        }
    }

    if(errors.length > 0){
        setError(true)
    }else if(errors.length === 0){
        console.log('API logic')
    }
  
    // Check if inputRef is null
    // if (inputRef.current) {
    //   inputRef.current.forEach((element: any, i: number) => {
    //     // Check if element is null
    //     if (element) {
    //       // Check if element is required and value is empty
    //       if (element.required === true && (element.value === null || element.value.trim() === '')) {
    //         element.classList.add('ring-2');
    //         element.classList.add('ring-red-500');
    //         element.classList.add('border-red-500');
    //         errors.push(false);
    //       } else {
    //         element.classList.remove('ring-2');
    //         element.classList.remove('ring-red-500');
    //         element.classList.remove('border-red-500');
    //       }
    //     } else {
    //       console.error('Element is null');
    //     }
    //   });
    // } else {
    //   console.error('inputRef is null');
    // }
  
    // console.log(errors, 'errors');
    // console.log('API Logic');
  };
  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className={containerStyle}>
        <p className="text-red-500 font-medium text-left absolute -top-2 left-0 block"> 
            {error && 'Please fill all the details'}
        </p> 

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
              className={inputStyle}
              placeholder="Enter Handle Name"
              ref={el => inputRef.current['handle_name'] = el } 
                required
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
                className={inputStyle}
                placeholder="Describe Yourself"
                rows={4}
                ref={el => inputRef.current['creator_title'] = el }
                required
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
              id="target_audience"
              className={inputStyle}
              placeholder="Enter Target Audience"
              ref={el => inputRef.current['target_audience'] = el }
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
              className={inputStyle}
              placeholder="Enter Details..."
              ref={el => inputRef.current['business_details'] = el} 
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
                className={inputStyle}
                placeholder="Enter Website URL"
                ref={el => inputRef.current['agent_title'] = el} 
            />
            </div>
        </div> 

        <input type="button" onClick={handleSubmit} className="float-right bg-indigo-600 text-white font-medium py-1 px-6 cursor-pointer rounded-md focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 mr-0 ml-auto float: right" value="Submit" />
      </div >
    </div>
  );
};

export default SimpleForm;
