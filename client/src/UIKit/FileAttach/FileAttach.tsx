

type Props = {
name: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    accept:string
};

export function FileAttach(props: Props) {
    return <div className="mb-4">
        <label htmlFor="fileInput" className="block text-text text-sm font-bold mb-2">
            Choose a File:
        </label>
        <div className="flex items-center">
            <label
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                htmlFor="fileInput"
            >
                Browse
            </label>
            <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={props.handleChange}
                accept={props.accept}
            />
            <p className="ml-3 text-text">{props.value}</p>
        </div>
    </div>
};