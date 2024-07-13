import React, { useState } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';
import toast, { Toaster } from "react-hot-toast";
const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        brand: '',
        price: '',
        companymodel: '',
        photos: [],
        colorway: '',
        about: '',
        country: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const files = e.target.files;
        const photoPromises = [];
        for (let i = 0; i < files.length; i++) {
            photoPromises.push(compressAndConvertImage(files[i]));
        }
        Promise.all(photoPromises).then(base64Photos => {
            setFormData({ ...formData, photos: base64Photos });
        });
    };

    const compressAndConvertImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                success(result) {
                    convertToBase64(result).then((base64) => {
                        const sizeInKB = getBase64SizeInKB(base64);
                    
                        resolve(base64);
                    }).catch(reject);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const getBase64SizeInKB = (base64) => {
        const stringLength = base64.length - 'data:image/png;base64,'.length;
        const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        return (sizeInBytes / 1024).toFixed(2);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/createProduct`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.success("Product added successfully");
        window.location.reload();
        
      
        } catch (error) {
          console.log("Error in adding ")
        }
      
    };

    return (
        <>
            <div>Admin Dashboard</div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand Name</label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companymodel">Model name</label>
                    <input
                        type="text"
                        name="companymodel"
                        id="companymodel"
                        value={formData.companymodel}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Product Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorway">Color way</label>
                    <input
                        type="text"
                        name="colorway"
                        id="colorway"
                        value={formData.colorway}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">Product about</label>
                    <input
                        type="text"
                        name="about"
                        id="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">Product Photos</label>
                    <input
                        type="file"
                        name="photos"
                        id="photos"
                        multiple
                        onChange={handlePhotoChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
            <Toaster/>
        </>
    );
}

export default AdminDashboard;
