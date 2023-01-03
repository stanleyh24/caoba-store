import React from "react";

export default function CardComponent({img,title,content,children}) {
    return (
        <div  className="w-full rounded-lg shadow-md lg:max-w-sm bg-white">
            <img
                className="object-scale-down w-full h-64"
                src={img}
                alt="image"
            />
            <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight primary-color">
                    {title}
                </h4>
                <p className="mb-2 leading-normal">
                    {content}
                </p>
                {/* <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    Read more
                </button> */}
                {/* <Link to={`/productos/${id}`}>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
                        {product_name}
                    </h3>
                </Link> */}
                {children}
            </div>
        </div>
    );
}