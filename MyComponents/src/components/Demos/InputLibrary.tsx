import { useState } from 'react'
import CustomMultiSelect from '../Inputs/CustomMultiSelect'
import CustomTextSelectInput from '../Inputs/chips_input_with_virtulized_dropdown_list'
import ChipsWithInput from '../Inputs/chips_with_input'
import ChipsWithInputSearch from '../Inputs/chips_with_input_search'
import ChipsWithInputSearchColor from '../Inputs/chips_with_input_search_color'
import ChipsInputDropdown from '../Inputs/simple_chips_input_dropdown'
import PhoneNumberInput from '../Inputs/PhoneNumberInput'
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";

type Props = {
  children:any,
  description: string,
  title: string
}

const InputContainer = ({children, description, title}:Props) => {
  return (
    <div className='space-y-2'>
      <h4 className='pl-2 text-sm font-medium'>{title}</h4>
      <div className={'flex pt-10 border border-b-4 border-r-4 border-gray-400 justify-center rounded-lg h-52   relative  '}>
        {children} 
            <button className='flex absolute bottom-2 left-2 items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-md active:bg-gray-200 text-slate-600'>
              <FaCode />
            </button>
      </div>
    </div>
  )
}


function InputLibrary() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full max-w-xl mx-auto grid grid-cols-1   gap-6 p-2'>
  

          <InputContainer title='Chips Input Dropdown' description='"Chips With Dropdown" - a compact, scrollable single-selection interface with an integrated chip display for the current choice'>
            <ChipsInputDropdown />
          </InputContainer>

          <InputContainer title='multi-select dropdown with checkboxes' description='multi-select dropdown with checkboxes, allowing for multiple options to be selected at once.'>
            <CustomMultiSelect/>
          </InputContainer>
 
          <InputContainer title='Chips input Dropdown with search Bar' description='The component is a searchable dropdown menu with an autocomplete feature. the dropdown list, has a search bar.'>
            <ChipsWithInputSearch/>
          </InputContainer>

          <InputContainer title='Chips input Drop Down with search Bar' description='the component is same as before, but uses a library "country-state-city" to list deon all the city in India also uses another library "react-window" for efficient rendering of large datasets'>
            <CustomTextSelectInput/>
          </InputContainer>

          <InputContainer title='Phone Number Input' description={`Phone number input field where you can search through phone code from a list of countries , the list being populated by using the library "country-state-city" this also uses "react-window" library`}>
            <PhoneNumberInput />
          </InputContainer>
 
          <InputContainer title='Chips Input Dropdown 2' description=''>
            <ChipsWithInput/>
          </InputContainer>

          <InputContainer title='Chips Input Dropdown 3' description=''>
            <ChipsWithInputSearchColor/>
          </InputContainer>
           
          
      </div>
    </>
  )

}

export default InputLibrary;
