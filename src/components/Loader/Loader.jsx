import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '40%',
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="400"
        width="400"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#14ce21"
      />
    </div>
  );
};
