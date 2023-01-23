import './SpinnerComponent.scss';

const SpinnerComponent = () => {
  return (
    <>
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SpinnerComponent;
