import './MemoriesImagesComponent.scss';

const MemoriesImagesComponent = ({ imgSrc, altText }) => {
  return (
    <div className="memories-image-wrapper">
      <img src={imgSrc} alt={altText} className="memories-image" />
    </div>
  );
};

export default MemoriesImagesComponent;
