import React from "react";

export default function CardComponent({img,title,content,children}) {
    return (
        <div  className="w-full rounded-lg shadow-md lg:max-w-sm bg-white">
            <img
                className="object-scale-down w-full h-64"
                src={img}
                alt="image"
            />
            <div className="p-4 flex flex-col">
                
                <p className="mb-2 leading-normal">
                    {content}
                </p>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
}