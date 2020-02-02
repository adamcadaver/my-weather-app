
const get = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites === null || favorites === '') {
    return new Set();
  }
  return new Set(favorites.trim().split(","));
};

const set = (favorites) => {
  localStorage.setItem("favorites", Array.from(favorites));
}

const StoredFavorites = {
  get,
  set
};

export default StoredFavorites;