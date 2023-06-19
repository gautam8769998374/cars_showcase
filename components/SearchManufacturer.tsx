'use client'
import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState, Fragment} from 'react'
import { manufacturers } from '@/constants'

const SearchButton = ({otherClasses}:{otherClasses : string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
     <Image
        src = '/magnifying-glass.svg'
        alt = 'magnifying glass'
        width = {40}
        height = {40}
        className = "object-contain"
     />
  </button>
)

const SearchManufacturer = ({ selected, setSelected} : SearchManufacturerProps) => {
     const [query, setQuery] = useState('')

     const filteredManufacturers = 
     query === '' 
     ? manufacturers 
     : manufacturers.filter((item) => (
        item.toLowerCase()
        .replace(/\s+/g,'')
        .includes(query.toLowerCase().replace(/\s+/g,''))

     ))

  return (
    <div className='search-manufacturer'>
         <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full '>
                <Combobox.Button className='absolute top-[14px]'>
                    <Image
                      src = "/car-logo.svg"
                      width = {20}
                      height = {20}
                      className= "ml-4"
                      alt = "Car Logo"
                       />
                </Combobox.Button>

                <Combobox.Input
                 className= 'search-manufacturer__input'
                 placeholder='Volkswagen'
                 displayValue={(manufacturer : string) => manufacturer }
                 onChange={(e) => setQuery(e.target.value)}
                />

                <Transition 
                  as = {Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  afterLeave={() => setQuery('')}
                >
                    <Combobox.Options>
                        {
                            filteredManufacturers.map((item) => (
                            <Combobox.Option
                             key={item}
                             className={({active}) => `
                                relative search-manufacturer__option ${active? 'bg-primary-blue text-white' : 'text-gray-900'}
                             `}
                             value={item}
                            >
                               {({selected , active}) => (
                                <>
                                     <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}
                                      >
                                        {item}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-teal-600'
                                          }`}
                                        >
                                        </span>
                                      ) : null}
                                </>

                               )}
                            </Combobox.Option> 
                            ))
                        }
                    </Combobox.Options>
                </Transition>
            </div>
         </Combobox>
         <SearchButton otherClasses="sm:hidden"/>
    </div>
  )
}

export default SearchManufacturer