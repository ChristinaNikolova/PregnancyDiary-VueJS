import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function allFavArticles() {
  return requester(`${api.users}/articles/`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  allFavArticles,
};
