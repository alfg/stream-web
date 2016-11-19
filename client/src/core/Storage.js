import localforage from 'localforage';

localforage.config({
  name: 'stream',
  driver: localforage.LOCALSTORAGE,
  size: 4980736  // Default.
});

export default Storage = {

  getItem(key, cb) {
    localforage.getItem(key).then((val) => {
      cb(null, val);
    })
    .catch((err) => {
      cb(err);
    });
  },

  setItem(key, value, cb) {
    localforage.setItem(key, value).then( () => {
      cb(null);
    })
    .catch( (err) => {
      cb(err);
    });
  }

}
