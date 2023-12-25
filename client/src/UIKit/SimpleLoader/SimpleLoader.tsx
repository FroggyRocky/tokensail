import { TbLoader } from "react-icons/tb";

type Props = {
    
};

export function SimpleLoader(props: Props) {
    return <div className={"flex justify-center items-center h-screen"}>
        <TbLoader className={"border-t-4 border-blue-500 border-solid rounded-full animate-spin h-16 w-16"} />
    </div>
};