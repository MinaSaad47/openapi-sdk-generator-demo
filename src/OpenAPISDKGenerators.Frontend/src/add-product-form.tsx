import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  createProductMutation,
  getProductsQueryKey,
} from "./client/@tanstack/react-query.gen";

const AdProductForm = () => {
  const queryClient = useQueryClient();

  const addProduct = useMutation({
    ...createProductMutation(),
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryKey(), // if you we've used tanstack/query for getting the products this will actually update the cache
      });
    },
  });

  const [fields, setFields] = React.useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct.mutate({
      body: {
        id: crypto.randomUUID(),
        title: fields.title,
        description: fields.description,
        price: Math.floor(fields.price * 100),
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Add New Product</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'>
            Product Name
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={fields.title}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter product name'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={fields.description}
            onChange={handleChange}
            required
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Enter product description'
          />
        </div>

        <div>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700 mb-1'>
            Price (LE)
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={fields.price}
            onChange={handleChange}
            required
            min='0'
            step='0.01'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='0.00'
          />
        </div>

        <button
          type='submit'
          disabled={addProduct.isPending}
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
          {addProduct.isPending ? "Adding Product..." : "Add Product"}
        </button>

        {addProduct.isError && (
          <div className='text-red-500 text-sm text-center'>
            Error adding product. Please try again.
          </div>
        )}

        {addProduct.isSuccess && (
          <div className='text-green-500 text-sm text-center'>
            Product added successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default AdProductForm;
