import {useRef, useState} from "react";
import {useClickOutside} from "../../lib/hooks/hooks";

type OptionType = {
    id:number
    value:string

}
type Props = {
    options:Array<OptionType>

    width?:string
    height?:string
};

export function Dropdown(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{id:number, value:string} | undefined>(undefined);
    const dropDownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    useClickOutside(dropDownRef, () => setIsOpen(false));
    const handleOptionClick = (option:OptionType) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return <div className="relative inline-block text-left" ref={dropDownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption?.value || 'Select an option'}
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {props.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                role="menuitem"
                            >
                                {option.value}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
};