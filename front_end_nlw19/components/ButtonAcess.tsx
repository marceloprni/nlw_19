import { ComponentProps, ReactNode } from "react"

interface ButtonProps extends ComponentProps<'button'> {}

export function ButtonAcess(props: ButtonProps) {
    return (
        <button
            className="bg-gray-500 px-5 h-12 text-blue
                font-semibold rounded-xl w-full cursor-pointer
                hover:bg-blue hover:text-gray-900 transition-colors duration-300
                flex justify-between items-center"
                {...props}
        />
    )
}