import './MemoriesImagesComponent.scss';

const MemoriesImagesComponent = ({ imgSrc, altText }) => {
  return (
    <div className="memories-image-wrapper">
      {imgSrc ? (
        <img src={imgSrc} alt={altText} className="memories-image" />
      ) : null}
    </div>
  );
};

export default MemoriesImagesComponent;
