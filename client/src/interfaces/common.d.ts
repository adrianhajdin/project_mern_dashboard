export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    formValues: {
        title: string,
        description: string,
        propertyType: string,
        location: string,
        price: number,
        photo?: string
    },
    propertyImage: {
        name: string,
        url: string
    },
    loading: boolean,
    handleOnChange: (name, e) => void,
    handleImageChange: (file) => void,
    handleSubmit: (e) => void
}
