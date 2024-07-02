// // // App.js
// // import React, { useState, useEffect } from 'react';
// // import ImageUpload from './components/ImageUpload';
// // import ImageAnnotator from './components/ImageAnnotator';
// // import './App.css';

// // const App = () => {
// //     const [images, setImages] = useState([]);

// //     // Load images from localStorage on component mount
// //     useEffect(() => {
// //         const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
// //         setImages(storedImages);
// //         console.log("Loaded images from localStorage:", storedImages);
// //     }, []);

// //     // Save images to localStorage whenever images state changes
// //     useEffect(() => {
// //         console.log("Saving images to localStorage:", images);
// //         localStorage.setItem('annotator_images', JSON.stringify(images));
// //     }, [images]);

// //     const handleUpload = (files) => {
// //         const fileReaders = [];
// //         const newImages = [...images];

// //         files.forEach(file => {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 newImages.push(reader.result);
// //                 if (newImages.length === images.length + files.length) {
// //                     setImages(newImages);
// //                 }
// //             };
// //             reader.readAsDataURL(file);
// //             fileReaders.push(reader);
// //         });
// //     };

// //     return (
// //         <div className="App">
// //             <h1>Image Annotation Tool</h1>
// //             <ImageUpload onUpload={handleUpload} />
// //             {images.length === 0 ? (
// //                 <div>No images to annotate</div>
// //             ) : (
// //                 <ImageAnnotator images={images} setImages={setImages} />
// //             )}
// //         </div>
// //     );
// // };

// // export default App;


// // import React, { useState, useEffect } from 'react';
// // import ImageUpload from './components/ImageUpload';
// // import ImageAnnotator from './components/ImageAnnotator';
// // import './App.css';

// // const App = () => {
// //     const [images, setImages] = useState([]);

// //     // Load images from localStorage on component mount
// //     useEffect(() => {
// //         const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
// //         setImages(storedImages);
// //         console.log("Loaded images from localStorage:", storedImages);
// //     }, []);

// //     // Save images to localStorage whenever images state changes
// //     useEffect(() => {
// //         console.log("Saving images to localStorage:", images);
// //         localStorage.setItem('annotator_images', JSON.stringify(images));
// //     }, [images]);

// //     const handleUpload = (files) => {
// //         const fileReaders = [];
// //         const newImages = [...images];

// //         files.forEach(file => {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 newImages.push({ url: reader.result, name: file.name });
// //                 if (newImages.length === images.length + files.length) {
// //                     setImages(newImages);
// //                 }
// //             };
// //             reader.readAsDataURL(file);
// //             fileReaders.push(reader);
// //         });
// //     };

// //     return (
// //         <div className="App">
// //             <h1>Image Annotation Tool</h1>
// //             <ImageUpload onUpload={handleUpload} />
// //             {images.length === 0 ? (
// //                 <div>No images to annotate</div>
// //             ) : (
// //                 <ImageAnnotator images={images} setImages={setImages} />
// //             )}
// //         </div>
// //     );
// // };

// // export default App;



// import React, { useState, useEffect } from 'react';
// import ImageUpload from './components/ImageUpload';
// import ImageAnnotator from './components/ImageAnnotator';
// import './App.css';

// const App = () => {
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
//         setImages(storedImages);
//         console.log("Loaded images from localStorage:", storedImages);
//     }, []);

//     useEffect(() => {
//         console.log("Saving images to localStorage:", images);
//         localStorage.setItem('annotator_images', JSON.stringify(images));
//     }, [images]);

//     const handleUpload = (files) => {
//         const fileReaders = [];
//         const newImages = [...images];

//         files.forEach(file => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 newImages.push({ url: reader.result, name: file.name });
//                 if (newImages.length === images.length + files.length) {
//                     setImages(newImages);
//                 }
//             };
//             reader.readAsDataURL(file);
//             fileReaders.push(reader);
//         });
//     };

//     return (
//         <div className="App">
//             <h1>Image Annotation Tool</h1>
//             <ImageUpload onUpload={handleUpload} />
//             {images.length === 0 ? (
//                 <div>No images to annotate</div>
//             ) : (
//                 <ImageAnnotator images={images} setImages={setImages} />
//             )}
//         </div>
//     );
// };

// export default App;









import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageAnnotator from './components/ImageAnnotator';
import './App.css';

const App = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
        setImages(storedImages);
        console.log("Loaded images from localStorage:", storedImages);
    }, []);

    useEffect(() => {
        console.log("Saving images to localStorage:", images);
        localStorage.setItem('annotator_images', JSON.stringify(images));
    }, [images]);

    const handleUpload = (files) => {
        const fileReaders = [];
        const newImages = [...images];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileSize = file.size; // Get file size in bytes
                console.log(fileSize);
                newImages.push({ url: reader.result, name: file.name, fileSize: fileSize });
                if (newImages.length === images.length + files.length) {
                    setImages(newImages);
                }
            };
            reader.readAsDataURL(file);
            fileReaders.push(reader);
        });
    };

    return (
        <div className="App">
            <h1>Image Annotation Tool</h1>
            <ImageUpload onUpload={handleUpload} />
            {images.length === 0 ? (
                <div>No images to annotate</div>
            ) : (
                <ImageAnnotator images={images} setImages={setImages} />
            )}
        </div>
    );
};

export default App;
