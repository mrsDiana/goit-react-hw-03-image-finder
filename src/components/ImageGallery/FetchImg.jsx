import { toast } from 'react-toastify';
export const fetchImg = async (propsSearchImg, statePage) => {
  const res = await fetch(
    `https://pixabay.com/api/?q=${propsSearchImg}&page=${statePage}&key=31283318-f84bd36e26b769e2b71141abe&image_type=photo&orientation=horizontal&per_page=12`
  );
  const data = await res.json();
  const imagesResponse = data.hits;
  const images = imagesResponse.map(
    ({ id, largeImageURL, webformatURL, tags }) => {
      return { id, largeImageURL, webformatURL, tags };
    }
  );
  if (data.hits.length === 0) {
    return toast.info('Input the new name');
  }
  const search = {
    images,
  };
  return search;
};
