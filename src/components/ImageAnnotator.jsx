

// import React, { useState, useEffect } from 'react';

// const ImageAnnotator = ({ images, setImages }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//     const [imageSize, setImageSize] = useState(null);
//     const [annotationText, setAnnotationText] = useState('');
//     const [showAnnotationForm, setShowAnnotationForm] = useState(false);
//     const [imageSelected, setImageSelected] = useState(false);
//     const [autoSelectText, setAutoSelectText] = useState('AutoSelect');
//     const [annotations, setAnnotations] = useState([]);
//     const [coordinates, setCoordinates] = useState({ x: null, y: null });
//     const [shapeAttributes, setShapeAttributes] = useState({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
//     const [regionAttributes, setRegionAttributes] = useState({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });

//     // Load images from localStorage on component mount
//     useEffect(() => {
//         const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
//         setImages(storedImages);
//         console.log("Loaded images from localStorage:", storedImages);
//     }, [setImages]);

//     // Save images to localStorage whenever images state changes
//     useEffect(() => {
//         console.log("Saving images to localStorage:", images);
//         localStorage.setItem('annotator_images', JSON.stringify(images));
//     }, [images]);

//     useEffect(() => {
//         if (images && images.length > 0) {
//             const selectedImage = images[currentIndex].url;
//             const img = new Image();
//             img.onload = function() {
//                 const metadata = {
//                     index: currentIndex,
//                     url: selectedImage,
//                     width: this.width,
//                     height: this.height,
//                     name: images[currentIndex].name,
//                 };
//                 console.log('Selected image metadata:', metadata);
//                 setImageSize({ width: this.width, height: this.height });
//             };
//             img.src = selectedImage;

//             const existingAnnotation = annotations.find(annotation => annotation.index === currentIndex);
//             if (existingAnnotation) {
//                 setAnnotationText(existingAnnotation.annotation);
//                 setCoordinates(existingAnnotation.coordinates);
//                 setShapeAttributes(existingAnnotation.shapeAttributes);
//                 setRegionAttributes(existingAnnotation.regionAttributes);
//                 setImageSelected(true);
//                 setSelectedImageIndex(currentIndex);
//                 setAutoSelectText('Clear Selection');
//             } else {
//                 setAnnotationText('');
//                 setCoordinates({ x: null, y: null });
//                 setShapeAttributes({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
//                 setRegionAttributes({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });
//                 setImageSelected(false);
//                 setSelectedImageIndex(null);
//                 setAutoSelectText('AutoSelect');
//             }
//         }
//     }, [currentIndex, images, annotations]);

//     const handlePrev = () => {
//         setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//     };

//     const handleNext = () => {
//         setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//     };

//     const handleAutoSelect = () => {
//         if (imageSelected) {
//             setSelectedImageIndex(null);
//             setImageSelected(false);
//             setAutoSelectText('AutoSelect');
//             setAnnotationText('');
//             setCoordinates({ x: null, y: null });
//             setShapeAttributes({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
//             setRegionAttributes({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });

//             const updatedAnnotations = annotations.filter(annotation => annotation.index !== currentIndex);
//             setAnnotations(updatedAnnotations);
//         } else {
//             setSelectedImageIndex(currentIndex);
//             const selectedImage = images[currentIndex].url;

//             const img = new Image();
//             img.onload = function() {
//                 const metadata = {
//                     index: currentIndex,
//                     url: selectedImage,
//                     width: this.width,
//                     height: this.height,
//                     name: images[currentIndex].name,
//                 };
//                 console.log('Selected image metadata:', metadata);
//                 setImageSize({ width: this.width, height: this.height });
//             };
//             img.src = selectedImage;

//             const defaultShapeAttributes = {
//                 name: 'rect',
//                 x: 0,
//                 y: 0,
//                 width: imageSize ? imageSize.width : 0,
//                 height: imageSize ? imageSize.height : 0,
//             };
//             const defaultRegionAttributes = {
//                 name: 'Default Region',
//                 type: 'unknown',
//                 image_quality: { good: true, frontal: true, good_illumination: true },
//             };

//             setAnnotationText('');
//             setCoordinates({ x: null, y: null });
//             setShapeAttributes(defaultShapeAttributes);
//             setRegionAttributes(defaultRegionAttributes);

//             setImageSelected(true);
//             setAutoSelectText('Clear Selection');
//         }
//     };

//     const handleAnnotate = () => {
//         setShowAnnotationForm(true);
//     };

//     const handleSaveAnnotation = () => {
//         if (annotationText.trim() !== '') {
//             const newAnnotation = {
//                 index: currentIndex,
//                 annotation: annotationText.trim(),
//                 coordinates: coordinates,
//                 shapeAttributes: shapeAttributes,
//                 regionAttributes: regionAttributes,
//             };
//             const updatedAnnotations = [...annotations.filter(annotation => annotation.index !== currentIndex), newAnnotation];
//             setAnnotations(updatedAnnotations);
//             console.log('Annotation saved:', newAnnotation);
//             setShowAnnotationForm(false);
//         }
//     };

//     const jsonToCsv = (jsonArray) => {
//         const csvRows = [];
//         const headers = ['NAME', 'FILE SIZE', 'SHAPE ATTRIBUTES', 'REGION ATTRIBUTES', 'ANNOTATION'];
//         csvRows.push(headers.join(','));
    
//         jsonArray.forEach((item) => {
//             const values = [
//                 item.name,
//                 item.metadata.fileSize,
//                 JSON.stringify(item.metadata.shapeAttributes).replace(/,/g, ';'),
//                 JSON.stringify(item.metadata.regionAttributes).replace(/,/g, ';'),
//                 item.annotation,
//             ];
//             csvRows.push(values.join(','));
//         });
    
//         return csvRows.join('\n');
//     };
    
    
    

  

//     const downloadAnnotations = (type) => {
//         const dataToDownload = annotations.map(annotation => ({
//             name: images[annotation.index].name,
//             metadata: {
//                 fileSize: images[annotation.index].fileSize,
//                 shapeAttributes: annotation.shapeAttributes,
//                 regionAttributes: annotation.regionAttributes,
//             },
//             annotation: annotation.annotation,
//         }));
    
//         if (type === 'json') {
//             const jsonContent = JSON.stringify(dataToDownload, null, 2);
//             const blob = new Blob([jsonContent], { type: 'application/json' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'annotations.json';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//         } else if (type === 'csv') {
//             const csvContent = jsonToCsv(dataToDownload);
//             const blob = new Blob([csvContent], { type: 'text/csv' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'annotations.csv';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//         }
//     };
    
//     const handleImageClick = e => {
//         const rect = e.target.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         setCoordinates({ x, y });
//     };

//     if (!images || images.length === 0) {
//         return <div>No images to annotate</div>;
//     }

//     const showPrevButton = images.length > 1 && currentIndex !== 0;
//     const showNextButton = images.length > 1 && currentIndex !== images.length - 1;

//     return (
//         <div>
//             <div className='image-container' style={{ position: 'relative' }}>
//                 <img
//                     src={images[currentIndex].url}
//                     alt='To be annotated'
//                     style={{
//                         maxWidth: '100%',
//                         border: selectedImageIndex === currentIndex ? '5px solid red' : 'none',
//                     }}
//                     onClick={handleImageClick}
//                 />
//                 <div className='button-container'>
//                 <button className='select-btn' onClick={handleAutoSelect}>{autoSelectText}</button>
//                 <button className='annotate-btn' onClick={handleAnnotate} disabled={!imageSelected}>
//                     Annotate
//                 </button>
//                 </div>
             
//                 {showAnnotationForm && (
//                     <div>
//                         <input
//                             type='text'
//                             value={annotationText}
//                             onChange={e => setAnnotationText(e.target.value)}
//                             placeholder='Enter annotation text'
//                         />
//                         <div>
//                             <h4>Shape Attributes</h4>
//                             <label htmlFor="">X:</label>
//                             <input
//                                 type='number'
//                                 value={shapeAttributes.x}
//                                 onChange={e => setShapeAttributes({ ...shapeAttributes, x: e.target.value })}
//                                 placeholder='X coordinate'
//                             />

//                             <label htmlFor="">Y:</label>
//                             <input
//                                 type='number'
//                                 value={shapeAttributes.y}
//                                 onChange={e => setShapeAttributes({ ...shapeAttributes, y: e.target.value })}
//                                 placeholder='Y coordinate'
//                             />

//                             <label htmlFor="">Width:</label>
//                             <input
//                                 type='number'
//                                 value={shapeAttributes.width}
//                                 onChange={e => setShapeAttributes({ ...shapeAttributes, width: e.target.value })}
//                                 placeholder='Width'
//                             />

//                             <label htmlFor="">Height:</label>
//                             <input
//                                 type='number'
//                                 value={shapeAttributes.height}
//                                 onChange={e => setShapeAttributes({ ...shapeAttributes, height: e.target.value })}
//                                 placeholder='Height'
//                             />
//                         </div>
//                         <div>
//                             <h4>Region Attributes</h4>
//                             <label htmlFor="">Name:</label>
//                             <input
//                                 type='text'
//                                 value={regionAttributes.name}
//                                 onChange={e => setRegionAttributes({ ...regionAttributes, name: e.target.value })}
//                                 placeholder='Region name'
//                             />

//                             <label htmlFor="">Type:</label>
//                             <input
//                                 type='text'
//                                 value={regionAttributes.type}
//                                 onChange={e => setRegionAttributes({ ...regionAttributes, type: e.target.value })}
//                                 placeholder='Region type'
//                             />
//                             <div>
//                                 <label>
//                                     <input
//                                         type='checkbox'
//                                         checked={regionAttributes.image_quality.good}
//                                         onChange={e =>
//                                             setRegionAttributes({
//                                                 ...regionAttributes,
//                                                 image_quality: { ...regionAttributes.image_quality, good: e.target.checked },
//                                             })
//                                         }
//                                     />
//                                     Good
//                                 </label>
//                                 <label>
//                                     <input
//                                         type='checkbox'
//                                         checked={regionAttributes.image_quality.frontal}
//                                         onChange={e =>
//                                             setRegionAttributes({
//                                                 ...regionAttributes,
//                                                 image_quality: { ...regionAttributes.image_quality, frontal: e.target.checked },
//                                             })
//                                         }
//                                     />
//                                     Frontal
//                                 </label>
//                                 <label>
//                                     <input
//                                         type='checkbox'
//                                         checked={regionAttributes.image_quality.good_illumination}
//                                         onChange={e =>
//                                             setRegionAttributes({
//                                                 ...regionAttributes,
//                                                 image_quality: {
//                                                     ...regionAttributes.image_quality,
//                                                     good_illumination: e.target.checked,
//                                                 },
//                                             })
//                                         }
//                                     />
//                                     Good Illumination
//                                 </label>
//                             </div>
//                         </div>
//                         <button onClick={handleSaveAnnotation}>Save</button>
//                     </div>
//                 )}
//             </div>
//             <div>
//                 {showPrevButton && <button onClick={handlePrev}>Prev</button>}
//                 {showNextButton && <button onClick={handleNext}>Next</button>}
//             </div>
//             {imageSize && (
//                 <div>
//                     Image Size: {imageSize.width} x {imageSize.height}
//                 </div>
//             )}
//             <div>
//                 <h3>Annotations:</h3>
//                 {annotations.length === 0 ? (
//                     <p>No annotations yet.</p>
//                 ) : (
//                     <ul>
//                         {annotations.map((annotation, index) => (
//                             <li key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
//                                 {annotation ? (
//                                     <div>
//                                         <p>
//                                             <strong>Image Text:</strong> {annotation.annotation}
//                                         </p>
//                                         <p>
//                                             <strong>Shape Attributes:</strong> X: {annotation.shapeAttributes.x}, Y: {annotation.shapeAttributes.y}, Width: {annotation.shapeAttributes.width}, Height: {annotation.shapeAttributes.height}
//                                         </p>
//                                         <p>
//                                             <strong>Region Attributes:</strong> Name: {annotation.regionAttributes.name}, Type: {annotation.regionAttributes.type}, Good: {annotation.regionAttributes.image_quality.good ? 'Yes' : 'No'}, Frontal: {annotation.regionAttributes.image_quality.frontal ? 'Yes' : 'No'}, Good Illumination: {annotation.regionAttributes.image_quality.good_illumination ? 'Yes' : 'No'}
//                                         </p>
//                                         <p>
//                                             <strong>File Size:</strong> {images[annotation.index]?.fileSize || 'Unknown'}
//                                         </p>
//                                     </div>
//                                 ) : (
//                                     <p>No annotation added for this image.</p>
//                                 )}
//                             </li>
//                         ))}

//                     </ul>
//                 )}
//                 {/* <button onClick={downloadAnnotations}>Download Annotations as JSON</button> */}
//                 <button onClick={() => downloadAnnotations('json')}>Download Annotations as JSON</button>
//                 <button onClick={() => downloadAnnotations('csv')}>Download Annotations as CSV</button>
//             </div>
//         </div>
//     );
// };

// export default ImageAnnotator;



import React, { useState, useEffect } from 'react';

const ImageAnnotator = ({ images, setImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImageKey, setSelectedImageKey] = useState(null); // Use imageKey instead of index

    const [imageSize, setImageSize] = useState(null);
    const [annotationText, setAnnotationText] = useState('');
    const [showAnnotationForm, setShowAnnotationForm] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [autoSelectText, setAutoSelectText] = useState('AutoSelect');
    const [annotations, setAnnotations] = useState([]);
    const [coordinates, setCoordinates] = useState({ x: null, y: null });
    const [shapeAttributes, setShapeAttributes] = useState({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
    const [regionAttributes, setRegionAttributes] = useState({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });

    // Load images from localStorage on component mount
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('annotator_images')) || [];
        setImages(storedImages);
        console.log("Loaded images from localStorage:", storedImages);
    }, [setImages]);

    // Save images to localStorage whenever images state changes
    useEffect(() => {
        console.log("Saving images to localStorage:", images);
        localStorage.setItem('annotator_images', JSON.stringify(images));
    }, [images]);

    useEffect(() => {
        if (images && images.length > 0) {
            const selectedImage = images[currentIndex].url;
            const img = new Image();
            img.onload = function() {
                const metadata = {
                    index: currentIndex,
                    url: selectedImage,
                    width: this.width,
                    height: this.height,
                    name: images[currentIndex].name,
                    fileSize: images[currentIndex].fileSize,
                };
                console.log('Selected image metadata:', metadata);
                setImageSize({ width: this.width, height: this.height });
            };
            img.src = selectedImage;

            const existingAnnotation = annotations.find(annotation => annotation.imageKey === `${images[currentIndex].name}-${images[currentIndex].fileSize}`);
            if (existingAnnotation) {
                setAnnotationText(existingAnnotation.annotation);
                setCoordinates(existingAnnotation.coordinates);
                setShapeAttributes(existingAnnotation.shapeAttributes);
                setRegionAttributes(existingAnnotation.regionAttributes);
                setImageSelected(true);
                setSelectedImageKey(`${images[currentIndex].name}-${images[currentIndex].fileSize}`);
                setAutoSelectText('Clear Selection');
            } else {
                setAnnotationText('');
                setCoordinates({ x: null, y: null });
                setShapeAttributes({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
                setRegionAttributes({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });
                setImageSelected(false);
                setSelectedImageKey(null);
                setAutoSelectText('AutoSelect');
            }
        }
    }, [currentIndex, images, annotations]);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleAutoSelect = () => {
        if (imageSelected) {
            setImageSelected(false);
            setAutoSelectText('AutoSelect');
            setAnnotationText('');
            setCoordinates({ x: null, y: null });
            setShapeAttributes({ name: 'rect', x: 0, y: 0, width: 0, height: 0 });
            setRegionAttributes({ name: '', type: '', image_quality: { good: true, frontal: true, good_illumination: true } });

            const updatedAnnotations = annotations.filter(annotation => annotation.imageKey !== `${images[currentIndex].name}-${images[currentIndex].fileSize}`);
            setAnnotations(updatedAnnotations);
        } else {
            const selectedImage = images[currentIndex].url;
            const img = new Image();
            img.onload = function() {
                const metadata = {
                    index: currentIndex,
                    url: selectedImage,
                    width: this.width,
                    height: this.height,
                    name: images[currentIndex].name,
                    fileSize: images[currentIndex].fileSize,
                };
                console.log('Selected image metadata:', metadata);
                setImageSize({ width: this.width, height: this.height });
            };
            img.src = selectedImage;

            const defaultShapeAttributes = {
                name: 'rect',
                x: 0,
                y: 0,
                width: imageSize ? imageSize.width : 0,
                height: imageSize ? imageSize.height : 0,
            };
            const defaultRegionAttributes = {
                name: 'Default Region',
                type: 'unknown',
                image_quality: { good: true, frontal: true, good_illumination: true },
            };

            setAnnotationText('');
            setCoordinates({ x: null, y: null });
            setShapeAttributes(defaultShapeAttributes);
            setRegionAttributes(defaultRegionAttributes);

            setImageSelected(true);
            setSelectedImageKey(`${images[currentIndex].name}-${images[currentIndex].fileSize}`);
            setAutoSelectText('Clear Selection');
        }
    };

    const handleAnnotate = () => {
        setShowAnnotationForm(true);
    };

    const handleSaveAnnotation = () => {
        if (annotationText.trim() !== '') {
            const newAnnotation = {
                imageKey: `${images[currentIndex].name}-${images[currentIndex].fileSize}`,
                annotation: annotationText.trim(),
                coordinates: coordinates,
                shapeAttributes: shapeAttributes,
                regionAttributes: regionAttributes,
            };
            const updatedAnnotations = [...annotations.filter(annotation => annotation.imageKey !== `${images[currentIndex].name}-${images[currentIndex].fileSize}`), newAnnotation];
            setAnnotations(updatedAnnotations);
            console.log('Annotation saved:', newAnnotation);
            setShowAnnotationForm(false);
        }
    };

    const jsonToCsv = (jsonArray) => {
        const csvRows = [];
        const headers = ['NAME', 'FILE SIZE', 'SHAPE ATTRIBUTES', 'REGION ATTRIBUTES', 'ANNOTATION'];
        csvRows.push(headers.join(','));

        jsonArray.forEach((item) => {
            const values = [
                item.name,
                item.metadata.fileSize,
                JSON.stringify(item.metadata.shapeAttributes).replace(/,/g, ';'),
                JSON.stringify(item.metadata.regionAttributes).replace(/,/g, ';'),
                item.annotation,
            ];
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    };

    const downloadAnnotations = (type) => {
        console.log(annotations);
        // const dataToDownload = annotations.map(annotation => (
            
        //     {

        //     name: images[annotation.index].name,
        //     name: images.find((image)=>{`${image.name}-${image.fileSize}` === annotation.imageKey}).name,
        //     metadata: {
        //         fileSize: images[annotation.index].fileSize,
        //         shapeAttributes: annotation.shapeAttributes,
        //         regionAttributes: annotation.regionAttributes,
        //     },
        //     annotation: annotation.annotation,
        // }));

    
        const dataToDownload = annotations.map(annotation => {
            const matchedImage = images.find(image => {
                return `${image.name}-${image.fileSize}` === annotation.imageKey;
            });
        
            if (!matchedImage) {
                // Handle case where no matching image is found
                return {
                    name: 'Unknown',
                    metadata: {
                        fileSize: 'Unknown',
                        shapeAttributes: annotation.shapeAttributes,
                        regionAttributes: annotation.regionAttributes,
                    },
                    annotation: annotation.annotation,
                };
            }
        
            return {
                name: matchedImage.name,
                metadata: {
                    fileSize: matchedImage.fileSize,
                    shapeAttributes: annotation.shapeAttributes,
                    regionAttributes: annotation.regionAttributes,
                },
                annotation: annotation.annotation,
            };
        });

        if (type === 'json') {
            const jsonContent = JSON.stringify(dataToDownload, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'annotations.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else if (type === 'csv') {
            const csvContent = jsonToCsv(dataToDownload);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'annotations.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleImageClick = e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCoordinates({ x, y });
    };

    if (!images || images.length === 0) {
        return <div>No images to annotate</div>;
    }

    const showPrevButton = images.length > 1 && currentIndex !== 0;
    const showNextButton = images.length > 1 && currentIndex !== images.length - 1;

    return (
        <div>
            <div className='image-container' style={{ position: 'relative' }}>
                <img
                    src={images[currentIndex].url}
                    alt='To be annotated'
                    style={{
                        maxWidth: '100%',
                        border: selectedImageKey === `${images[currentIndex].name}-${images[currentIndex].fileSize}` ? '5px solid red' : 'none',
                    }}
                    onClick={handleImageClick}
                />
                <div className='button-container'>
                    <button className={autoSelectText==='AutoSelect'?'select-btn':'clear-btn'} onClick={handleAutoSelect}>{autoSelectText}</button>
                    <button className='annotate-btn' onClick={handleAnnotate} disabled={!imageSelected}>
                        Annotate
                    </button>
                </div>

                {(showAnnotationForm && autoSelectText==='Clear Selection') && (
                    <div className='annotation-form'> 
                    <label htmlFor="">
                        Text in image:
                    </label>
                        <input
                            type='text'
                            value={annotationText}
                            onChange={e => setAnnotationText(e.target.value)}
                            placeholder='Enter annotation text'
                        />
                        <div>
                            <h4>Shape Attributes</h4>
                            <label htmlFor="">X:</label>
                            <input
                                type='number'
                                value={shapeAttributes.x}
                                onChange={e => setShapeAttributes({ ...shapeAttributes, x: e.target.value })}
                                placeholder='X coordinate'
                            />

                            <label htmlFor="">Y:</label>
                            <input
                                type='number'
                                value={shapeAttributes.y}
                                onChange={e => setShapeAttributes({ ...shapeAttributes, y: e.target.value })}
                                placeholder='Y coordinate'
                            />

                            <label htmlFor="">Width:</label>
                            <input
                                type='number'
                                value={shapeAttributes.width}
                                onChange={e => setShapeAttributes({ ...shapeAttributes, width: e.target.value })}
                                placeholder='Width'
                            />

                            <label htmlFor="">Height:</label>
                            <input
                                type='number'
                                value={shapeAttributes.height}
                                onChange={e => setShapeAttributes({ ...shapeAttributes, height: e.target.value })}
                                placeholder='Height'
                            />
                        </div>
                        <div>
                            <h4>Region Attributes</h4>
                            <label htmlFor="">Name:</label>
                            <input
                                type='text'
                                value={regionAttributes.name}
                                onChange={e => setRegionAttributes({ ...regionAttributes, name: e.target.value })}
                                placeholder='Region name'
                            />

                            <label htmlFor="">Type:</label>
                            <input
                                type='text'
                                value={regionAttributes.type}
                                onChange={e => setRegionAttributes({ ...regionAttributes, type: e.target.value })}
                                placeholder='Region type'
                            />
                            <div className='checkbox-container'>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={regionAttributes.image_quality.good}
                                        onChange={e =>
                                            setRegionAttributes({
                                                ...regionAttributes,
                                                image_quality: { ...regionAttributes.image_quality, good: e.target.checked },
                                            })
                                        }
                                    />
                                    Good
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={regionAttributes.image_quality.frontal}
                                        onChange={e =>
                                            setRegionAttributes({
                                                ...regionAttributes,
                                                image_quality: { ...regionAttributes.image_quality, frontal: e.target.checked },
                                            })
                                        }
                                    />
                                    Frontal
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={regionAttributes.image_quality.good_illumination}
                                        onChange={e =>
                                            setRegionAttributes({
                                                ...regionAttributes,
                                                image_quality: {
                                                    ...regionAttributes.image_quality,
                                                    good_illumination: e.target.checked,
                                                },
                                            })
                                        }
                                    />
                                    Good Illumination
                                </label>
                            </div>
                        </div>
                        <button className='save-btn' onClick={handleSaveAnnotation}>Save</button>
                    </div>
                )}
            </div>
            <div className='prev-nxt-btns'>
                {showPrevButton && <button className='prev-btn' onClick={handlePrev}>Prev</button>}
                {showNextButton && <button className='next-btn' onClick={handleNext}>Next</button>}
            </div>
            {imageSize && (
                <div>
                    Image Size: {imageSize.width} x {imageSize.height}
                </div>
            )}
            <div>
                <h3>Annotations:</h3>
                {annotations.length === 0 ? (
                    <p>No annotations yet.</p>
                ) : (
                    <ul>
                        {annotations.map((annotation, index) => (
                            <li key={index} style={{ display: annotation.imageKey === selectedImageKey ? 'block' : 'none' }}>
                                {annotation ? (
                                    <div>
                                        <p>
                                            <strong>Image Text:</strong> {annotation.annotation}
                                        </p>
                                        <p>
                                            <strong>Shape Attributes:</strong> X: {annotation.shapeAttributes.x}, Y: {annotation.shapeAttributes.y}, Width: {annotation.shapeAttributes.width}, Height: {annotation.shapeAttributes.height}
                                        </p>
                                        <p>
                                            <strong>Region Attributes:</strong> Name: {annotation.regionAttributes.name}, Type: {annotation.regionAttributes.type}, Good: {annotation.regionAttributes.image_quality.good ? 'Yes' : 'No'}, Frontal: {annotation.regionAttributes.image_quality.frontal ? 'Yes' : 'No'}, Good Illumination: {annotation.regionAttributes.image_quality.good_illumination ? 'Yes' : 'No'}
                                        </p>
                                        <p>
                                   
                                <strong>File Size:</strong> {images.find(image => `${image.name}-${image.fileSize}` === annotation.imageKey)?.fileSize || 'Unknown'}

                                            
                                        </p>
                                    </div>
                                ) : (
                                    <p>No annotation added for this image.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                <div className='download-btns'>
                <button className='json' onClick={() => downloadAnnotations('json')}>Download Annotations as JSON</button>
                <button className='csv' onClick={() => downloadAnnotations('csv')}>Download Annotations as CSV</button>
                </div>
    
            </div>
        </div>
    );
};

export default ImageAnnotator;
