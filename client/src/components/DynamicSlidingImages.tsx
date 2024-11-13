interface IProps {
    images: string[];
};


const DynamicSlidingImages: React.FC<IProps> = ({ images }) => {
    return (
        <div className="dynamic-sliding-images">
            {
                images.map((image) => (
                    <img src={image} alt="Image" width="200px" />
                ))
            }
        </div>
    );
}

export default DynamicSlidingImages;