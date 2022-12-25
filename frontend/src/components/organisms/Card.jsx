import React from "react";

export default function CardComponent({img,title,content}) {
    return (
        <div className="w-full rounded-lg shadow-md lg:max-w-sm bg-white">
            <img
                className="object-scale-down w-full h-64"
                src={img}
                alt="image"
            />
            <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                    {title}
                </h4>
                <p className="mb-2 leading-normal">
                    {content}
                </p>
                <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    Read more
                </button>
            </div>
        </div>
    );
}